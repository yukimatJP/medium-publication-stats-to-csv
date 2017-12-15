var separator = "-----------------------> ";

function showInfo(msg) {
  console.log("[Info] " + msg);
}

function async(f, delay) {
  setTimeout(f, delay);
}

function clickThreeMonthsButton() {
  showInfo(separator + "START : Change to 90 days stats");

  var threeMonthsBtn = $(".js-time-threeMonths button");
  threeMonthsBtn.each(function() {
    $(this).click();
    console.log($(this));
  });

  showInfo(separator + "END : Change to 90 days stats");
}


function getGraphData() {
  showInfo(separator + "START : Get graph data");

  var convertRate = Array(3);
  var statsData = Array(3);

  var yAxis = $(".bargraph-yAxis");
  var graphs = $(".js-barGraphBars");
  var gridLines = $(".bargraph-gridLines");
  var hoveredValues = $(".js-readingTimeStatsText");

  for(var i=0; i<yAxis.length; i++) {

    showInfo(separator + "loop: " + i);

    // get graph height
    var graphHeight = $(graphs[i]).get(0).getBBox().height;
    showInfo("graphHeight : " + graphHeight);

    // calculate convert rate
    var maxScale = $(yAxis[i]).find("g").last();
    var maxScaleVal = maxScale.find("text").text();
    var maxScaleHeight = $(gridLines[i]).get(0).getBBox().height;
    var maxVal = maxScaleVal; // 未実装
    var maxHeight = maxScaleHeight;

    showInfo("maxScaleHeight : " + maxScaleHeight);
    showInfo("maxScaleVal : " + maxScaleVal);

    // calculate each graphBar value
    var graphBarValues = Array();
    var graphBars = $(graphs[i]).find("rect");
    graphBars.each(function() {
      var barHeight = $(this).attr("height");
      graphBarValues.push(barHeight);
      if(barHeight - maxHeight > 0) {
        maxHeight = barHeight;
        showInfo("maxHeight : " + maxHeight);
        // TODO: マウスオーバーで最大値を取ってくる必要がある
        // $(this).trigger('mouseenter');
        // maxVal = $(hoveredValues[i]).find("h2").text();
      }
    });

    // convertRate[i] = maxVal / maxHeight; // TODO: maxVal を取得する
    convertRate[i] = maxHeight;
    showInfo("convertRate : " + convertRate[i]);

    // for(var j=0; j<graphBarValues.length; j++) {
    //   graphBarValues[j] *= convertRate[i]
    // }

    statsData[i] = graphBarValues;
    statsData[i].unshift(convertRate[i]);

    showInfo(separator + "done");
  }

  showInfo(separator + "END : Get graph data");

  return statsData;
}

function downloadCSV(statsData) {

  statsDataStr = "date, minutes read, view, visitors\n"
                +"convertRate, " + statsData[0][0] + "," + statsData[1][0] + "," + statsData[2][0] + "\n";
  var today = new Date();
  for(var i=1; i<90; i++) {
    var date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 90 + i+1);
    statsDataStr += [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("/") + ","
                 +  statsData[0][i] + ","
                 +  statsData[1][i] + ","
                 +  statsData[2][i] + "\n";
  }
  console.log(statsDataStr);

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

  async(function() {
    clickThreeMonthsButton();
    async(function() {
      var statsData = getGraphData();
      downloadCSV(statsData);
    }, 2000);
  }, 5000);

}());


