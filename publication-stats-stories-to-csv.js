var separator = "-----------------------> ";

var SCRAPING_PERIOD = 2; // months (30days x SCRAPING_PERIOD)


function showInfo(msg) {
  console.log("[Info] " + msg);
}


function getGraphData() {
  showInfo(separator + "START : Get graph data");

  var yAxis = $(".bargraph-yAxis");
  var graphBars = $(".bargraph-bar");

  var graphHeight = $(".bargraph-gridLines").get(0).getBBox().height;
  var maxScale = $(yAxis).find("g").last();
  var maxScaleVal = maxScale.find("text").text();
  convertRate = maxScaleVal / graphHeight;

  showInfo("graphHeight : " + graphHeight);
  showInfo("maxScaleVal : " + maxScaleVal);
  showInfo("convertRate : " + convertRate);

  var graphBarValues = Array();
  graphBars.each(function() {
    graphBarValues.push(Math.ceil($(this).attr("height") * convertRate));
  });
  statsData = graphBarValues;

  showInfo(separator + "done");

  return statsData;
}


function downloadCSV(statsData) {

  var numOfDay = SCRAPING_PERIOD * 30;

  var statsHeaderArray = ["title"];
  var today = new Date();
  for(var i=0; i<numOfDay; i++) {
    var date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - numOfDay + i + 1);
    statsHeaderArray.push([date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("/"))
  }

  statsDataStr = statsHeaderArray.join(",") + "\n";
  for(var i=0; i<statsData.length; i++) {
    statsDataStr += statsData[i].join(",") + "\n";
  }

  var pom = document.createElement("a");
  pom.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(statsDataStr));
  pom.setAttribute("download", "stats_" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + ".csv");

  if (document.createEvent) {
      var event = document.createEvent("MouseEvents");
      event.initEvent("click", true, true);
      pom.dispatchEvent(event);
  }
  else {
      pom.click();
  }

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

    var prev30daysButton = $(".js-showPreviousButton");
    var tableRows = $(".js-statsTable tr.js-statsTableRow");

    // var i = 0;
    var i = 18; // debug用

    var storiesStatsData = Array();

    var rowLoop = function() {
      var targetRow = $(tableRows[i]);
      targetRow.click();
      
      var title = targetRow.find("h2").text();
      showInfo(title);
      
      var p = 0;

      rowStatsData = Array();

      var periodLoop = function() {
        showInfo("periodLoop : " + p);

        rowStatsData = getGraphData().concat(rowStatsData);

        p++;
        if(p < SCRAPING_PERIOD) {
          prev30daysButton.click();
          setTimeout(periodLoop, 2000); // 一つ前の月へ
        } else {

          rowStatsData.unshift(title); // タイトルを先頭列にいれる
          storiesStatsData.push(rowStatsData);

          i++;
          if(i<tableRows.length) {
            setTimeout(rowLoop, 2000); // 次の行へ
          } else {
            downloadCSV(storiesStatsData);
          }
        }
      }
      setTimeout(periodLoop, 2000);
    }
    setTimeout(rowLoop, 2000);


  }, 3000);

}());


