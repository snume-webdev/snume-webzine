const katexRender = require('./auto-render');
var marked = require('marked');
var assign = require('object-assign');
var stripIndent = require('strip-indent');
var util = require('hexo-util');

var highlight = util.highlight;
var stripHTML = util.stripHTML;
var MarkedRenderer = marked.Renderer;

function Renderer() {
  MarkedRenderer.apply(this);

  this._headingId = {};
}

require('util').inherits(Renderer, MarkedRenderer);

// Support To-Do List
Renderer.prototype.listitem = function(text) {
  var result;

  if (/^\s*\[[x ]\]\s*/.test(text)) {
    text = text.replace(/^\s*\[ \]\s*/, '<input type="checkbox"></input> ').replace(/^\s*\[x\]\s*/, '<input type="checkbox" checked></input> ');
    result = '<li style="list-style: none">' + text + '</li>\n';
  } else {
    result = '<li>' + text + '</li>\n';
  }

  return result;
};

// Add id attribute to headings
Renderer.prototype.heading = function(text, level) {
  var transformOption = this.options.modifyAnchors;
  var id = anchorId(stripHTML(text), transformOption);
  var headingId = this._headingId;

  // Add a number after id if repeated
  if (headingId[id]) {
    id += '-' + headingId[id]++;
  } else {
    headingId[id] = 1;
  }
  // add headerlink
  return '<h' + level + ' id="' + id + '"><a href="#' + id + '" class="headerlink" title="' + stripHTML(text) + '"></a>' + text + '</h' + level + '>';
};

function anchorId(str, transformOption) {
  return util.slugize(str.trim(), {transform: transformOption});
}

// Support AutoLink option
Renderer.prototype.link = function(href, title, text) {
  var prot;

  if (this.options.sanitize) {
    try {
      prot = decodeURIComponent(unescape(href))
          .replace(/[^\w:]/g, '')
          .toLowerCase();
    } catch (e) {
      return '';
    }

    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return '';
    }
  }

  if (!this.options.autolink && href === text && title == null) {
    return href;
  }

  var out = '<a href="' + href + '"';

  if (title) {
    out += ' title="' + title + '"';
  }

  out += '>' + text + '</a>';
  return out;
};

// Renderer.prototype.em = function(text){
//   return `_${text}_`;
// }


// Renderer.prototype.strong = function(text){
//   return `_${text}_`;
// }

marked.setOptions({
  langPrefix: '',
  highlight: function(code, lang) {
    return highlight(stripIndent(code), {
      lang: lang,
      gutter: false,
      wrap: false
    });
  }
});

var renderer = function(data, options) {
  // katex
  return marked(katexRender(data.text), assign({
    renderer: new Renderer()
  }, this.config.marked, options));
};

hexo.config.marked = Object.assign({
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  modifyAnchors: '',
  autolink: true
}, hexo.config.marked);

hexo.extend.renderer.register('md', 'html', renderer, true);
// hexo.extend.renderer.register('markdown', 'html', renderer, true);
// hexo.extend.renderer.register('mkd', 'html', renderer, true);
// hexo.extend.renderer.register('mkdn', 'html', renderer, true);
// hexo.extend.renderer.register('mdwn', 'html', renderer, true);
// hexo.extend.renderer.register('mdtxt', 'html', renderer, true);
// hexo.extend.renderer.register('mdtext', 'html', renderer, true);

// https://github.com/LouisBarranqueiro/hexo-footnotes/blob/master/src/footnotes.js

function renderFootnotes(text) {
  var footnotes = [];
  var reFootnoteContent = /\[\^(\d+)\]: ?([\S\s]+?)(?=\[\^(?:\d+)\]|\n\n|$)/g;
  var reInlineFootnote = /\[\^(\d+)\]\((.+?)\)/g;
  var reFootnoteIndex = /\[\^(\d+)\]/g;
  var html = '';

  // threat all inline footnotes
  text = text.replace(reInlineFootnote, function(match, index, content) {
    footnotes.push({
      index: index,
      content: content
    });
    // remove content of inline footnote
    return '[^' + index + ']';
  });
  // threat all footnote contents
  text = text.replace(reFootnoteContent, function(match, index, content) {
    footnotes.push({
      index: index,
      content: content
    });
    // remove footnote content
    return '';
  });
  // render (HTML) footnotes reference
  text = text.replace(reFootnoteIndex,
    '<sup id="fnref:$1"><a href="#fn:$1" rel="footnote">$1</a></sup>');
  // sort footnotes by their index
  footnotes.sort(function(a, b) {
    return a.index - b.index;
  });
  // render footnotes (HTML)
  footnotes.forEach(function(footNote) {
    html += '<li class="footnote__item" id="fn:' + footNote.index + '">';
    html += '<span class="footnote__index" style="padding-right: 3px;">';
    html += footNote.index;
    html += '.</span>';
    html += '<span class="footnote__ style="">';
    html += footNote.content.trim();
    html += '</span>';
    // html += ' <a href="#fnref:' + footNote.index + '" rev="footnote">↩</a>';
    html += '</li>';
  });
  // add footnotes at the end of the content
  if (footnotes.length) {
    text += '<hr>';
    text += '<ol class="footnote__list">' + html + '</ol>';
  }
  return text;
}

// Register footnotes filter
hexo.extend.filter.register('after_post_render', function(data) {
  data.content = renderFootnotes(data.content);
  return data;
});
