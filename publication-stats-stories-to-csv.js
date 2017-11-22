var separator = "-----------------------> ";

function showInfo(msg) {
  console.log("[Info] " + msg);
}


function getGraphData() {
  showInfo(separator + "START : Get graph data");

  var yAxis = $(".bargraph-yAxis");
  var graphBars = $(".bargraph-bar");

  var graphHeight = $(graphBars[0]).parent("g").get(0).getBBox().height;
  showInfo("graphHeight : " + graphHeight);

  var maxScale = $(yAxis).find("g").last();
  var maxScaleVal = maxScale.find("text").text();
  var maxScalePos = maxScale.css("transform").replace(/[^0-9\-.,]/g, "").split(",")[5];
  convertRate = maxScaleVal / (graphHeight - maxScalePos);

  showInfo("maxScaleVal : " + maxScaleVal);
  showInfo("maxScalePos : " + maxScalePos);
  showInfo("convertRate : " + convertRate);

  // var graphBarValues = Array();
  // graphBars.each(function() {
  //   graphBarValues.push($(this).attr("height") * convertRate);
  // });
  // statsData = graphBarValues;

  // console.log(statsData);

  // showInfo(separator + "done");
}


(function() {
  // jQuery
  if (! window.jQuery ) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js";
    (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(s);
  }

  setTimeout(function() {
    showInfo("Start scraping")

    var scrapePeriod = 2; // months (30days x scrapePeriod)

    var prev30daysButton = $(".js-showPreviousButton");
    var tableRows = $(".js-statsTable tr.js-statsTableRow");

    var i = 0;

    var rowLoop = function() {
      targetRow = $(tableRows[i]);
      showInfo(targetRow.find("h2").text());
      targetRow.click();

      var p = 0;

      var periodLoop = function() {
        showInfo("periodLoop : " + p);

        // var statsData = getGraphData();

        p++;
        if(p < scrapePeriod) {
          prev30daysButton.click();
          setTimeout(periodLoop, 2000); // 一つ前の月へ
        } else {
          i++;
          if(i<tableRows.length) {
            setTimeout(rowLoop, 2000); // 次の行へ
          }
        }
      }
      setTimeout(periodLoop, 2000);
    }
    setTimeout(rowLoop, 2000);


  }, 3000);

}());


