// https://github.com/Khan/KaTeX/blob/master/contrib/auto-render/auto-render.js
const splitAtDelimiters = require("./splitAtDelimiters");
const katex = require('katex');

const splitWithDelimiters = function(text, delimiters) {
    let data = [{type: "text", data: text}];
    for (let i = 0; i < delimiters.length; i++) {
        const delimiter = delimiters[i];
        data = splitAtDelimiters(
            data, delimiter.left, delimiter.right,
            delimiter.display || false);
    }
    return data;
};

const defaultAutoRenderOptions = {
  delimiters: [
      {left: "$$", right: "$$", display: true},
      {left: "\\[", right: "\\]", display: true},
      {left: "\\(", right: "\\)", display: false},
      // LaTeX uses this, but it ruins the display of normal `$` in text:
      {left: "$", right: "$", display: false},
  ],

  ignoredTags: [
      "script", "noscript", "style", "textarea", "pre", "code",
  ],

  errorCallback: function(msg, err) {
      console.error(msg, err);
  },
  displayMode: true
};

/* Note: optionsCopy is mutated by this method. If it is ever exposed in the
 * API, we should copy it before mutating.
 */
const renderMathInText = function(text, options) {
  const optionsCopy = Object.assign({}, defaultAutoRenderOptions, options);
    const data = splitWithDelimiters(text, optionsCopy.delimiters);
    // const fragment = document.createDocumentFragment();
    let result = ''

    for (let i = 0; i < data.length; i++) {
        if (data[i].type === "text") {
            // fragment.appendChild(document.createTextNode(data[i].data));
            result += data[i].data;
        } else {
            // const span = document.createElement("span");
            const math = data[i].data;
            // Override any display mode defined in the settings with that
            // defined by the text itself
            optionsCopy.displayMode = data[i].display;
            try {
                // katex.render(math, span, optionsCopy);
                result += katex.renderToString(math, optionsCopy);
            } catch (e) {
                if (!(e instanceof katex.ParseError)) {
                    throw e;
                }
                optionsCopy.errorCallback(
                    "KaTeX auto-render: Failed to parse `" + data[i].data +
                    "` with ",
                    e
                );
                // fragment.appendChild(document.createTextNode(data[i].rawData));
                result += data[i].rawData;
                continue;
            }
        }
    }

    return result;
};

// module.exports = renderMathInElement;
module.exports = renderMathInText;
