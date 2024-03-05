"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = injectCollectJS;
function injectCollectJS(collectJsUrl, tokenizationKey) {
  var script = document.createElement('script');
  script.setAttribute('src', collectJsUrl);
  script.setAttribute('data-tokenization-key', tokenizationKey);
  script.setAttribute('data-variant', 'inline');
  document.querySelector('body').appendChild(script);
  return new Promise(function (resolve, reject) {
    script.onload = function () {
      resolve(window.CollectJS);
    };
  });
}