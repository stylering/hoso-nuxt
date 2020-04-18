const adapterScreen = `
  var baseWidth = 1080;
  var baseFontSize = 100;
  var baseRem = baseWidth / baseFontSize;

  var adapterScreen = function() {
    var doc = window.document, 
      root = doc.documentElement,
      currentW = 320, maxWidth = 640, minWidth = 320, timer,
      flexible = function() {
        currentW = root.getBoundingClientRect().width;
        currentW = currentW > maxWidth ? maxWidth : (currentW < minWidth ? minWidth : currentW);
        root.style.fontSize = currentW / baseRem + 'px';
      };
    window.addEventListener('resize', function(){
      if (timer) clearTimeout(timer);
      timer = setTimeout(function() { flexible() }, 0);
    }, false)
    flexible();
  }

  adapterScreen();
`;

module.exports = adapterScreen;