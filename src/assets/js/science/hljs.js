
if (window.hljs) {
    hljs.configure({languages: []});
    hljs.initHighlightingOnLoad();
    if (document.readyState && document.readyState === "complete") {
      window.setTimeout(function() { hljs.initHighlighting(); }, 0);
    }
  }