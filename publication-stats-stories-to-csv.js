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

    var scrapePeriod = 4; // months (30days x scrapePeriod)

    var prev30daysButton = $(".js-showPreviousButton");
    var tableRows = $(".js-statsTable tr.js-statsTableRow");

    tableRows.each(function(){
      targetRow = $(this);
      showInfo(targetRow.find("h2").text());
      targetRow.click();

      for(var i=0; i<scrapePeriod; i++) {

        var statsData = getGraphData();

        prev30daysButton.click();
      }

    });

  }, 3000);

}());


