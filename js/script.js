// function getRatio(el, parent) {
//   return parseFloat(getComputedStyle(parent).width) / parseFloat(getComputedStyle(el).width)
// };

// window.addEventListener('load', e => {
//   document.querySelectorAll('.katex-html').forEach(el => {
//     const ratio = getRatio(el, document.body);
//     if (ratio < 1) {
//       console.log(el);
//       el.parentNode.style.maxWidth = '100%';
//       el.style.transform = `scale(${getRatio(el, el.parentNode) * 0.8})`;
//     }
//   });
// })
