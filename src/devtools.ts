chrome.devtools.panels.create(
    "GamePerf Scanner",
    "/assets/logo/logo16.png",
    "panel.html",
    function(panel) {
      console.log("GamePerf DevTools panel created", panel);
    }
);