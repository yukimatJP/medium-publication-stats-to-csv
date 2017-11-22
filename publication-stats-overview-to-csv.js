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

  for(var i=0; i<yAxis.length; i++) {

    showInfo(separator + "loop: " + i);

    // get graph height
    var graphHeight = $(graphs[i]).get(0).getBBox().height;
    showInfo("graphHeight : " + graphHeight);

    // calculate convert rate
    var maxScale = $(yAxis[i]).find("g").last();
    var maxScaleVal = maxScale.find("text").text();
    var maxScalePos = maxScale.css("transform").replace(/[^0-9\-.,]/g, "").split(",")[5];
    convertRate[i] = maxScaleVal / (graphHeight - maxScalePos);

    showInfo("maxScaleVal : " + maxScaleVal);
    showInfo("maxScalePos : " + maxScalePos);
    showInfo("convertRate : " + convertRate[i]);

    // calculate each graphBar value
    var graphBarValues = Array();
    var graphBars = $(graphs[i]).find("rect");
    graphBars.each(function() {
      graphBarValues.push($(this).attr("height") * convertRate[i]);
    });
    statsData[i] = graphBarValues;

    showInfo(separator + "done");
  }

  showInfo(separator + "END : Get graph data");

  return statsData;
}

function downloadCSV(statsData) {

  statsDataStr = "date, minutes read, view, visitors\n";
  var today = new Date();
  for(var i=0; i<90; i++) {
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
    var statsData = getGraphData();
    downloadCSV(statsData);
  }, 2000);

}());


