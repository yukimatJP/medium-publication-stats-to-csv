function showInfo(msg) {
  console.log("[Info] " + msg);
}

function async(f, delay) {
  setTimeout(f, delay);
}

(function() {
  // jQuery
  if (! window.jQuery ) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
  }

  var clickThreeMonthsButton = function() {
    showInfo("Start : Change to 90 days stats");

    var threeMonthsBtn = $(".js-time-threeMonths button");

    if(threeMonthsBtn.length == 3) {
      showInfo("Find buttons! Change to 90 days stats.");
      threeMonthsBtn.each(function() {
        $(this).click();
        console.log($(this));
      });
      showInfo("End : Change to 90 days stats");
      return true;
    } else {
      showInfo("Could not find buttons... Try again.");
      async(clickThreeMonthsButton, 1000);
    }

  }

  var getGraphData = function() {
    showInfo("Start : Get graph data");

    var convertRate = Array(3);
    var yAxis = $(".bargraph-yAxis");
    yAxis.each(function(i) {
      var maxScale = $(this).find("g").last();
      var maxScaleVal = maxScale.find("text").text();
      var maxScalePos = maxScale.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[5];
      convertRate[i] = maxScaleVal / (225 - maxScalePos);
      showInfo("maxScaleVal : " + maxScaleVal);
      showInfo("maxScalePos : " + maxScalePos);
      showInfo("convertRate : " + convertRate[i]);
    });

    var graphBars = $(".js-barGraphBars");
    graphBars.each(function(i) {
      var maxGraphBodyHeight = $(this).get(0).getBBox().height;
      showInfo("maxGraphBodyHeight : " + maxGraphBodyHeight);
      var graphBars = $(this).find("rect");
      graphBars.each(function() {
        var graphBarHeight = $(this).attr("height") * convertRate[i];
        console.log(graphBarHeight);
      });
    });

    return "hogehoge";
  }

  async(function() {
    var d = $.Deferred();
    d.promise()
      .then(clickThreeMonthsButton()) // change to 90 days stats
      .then(getGraphData())
      .fail(function() {
        console.log('common fail' + arguments);
      })
      .always(function() {
        console.log('always' + arguments);
      });
  }, 2000);

}());


