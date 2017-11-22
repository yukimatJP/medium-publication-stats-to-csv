var separator = "-----------------------> ";

function showInfo(msg) {
  console.log("[Info] " + msg);
}

function async(f, delay) {
  setTimeout(f, delay);
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
    showInfo("Start scraping")
    var tableRows = $(".js-statsTable tr.js-statsTableRow");
    var i = 0;
    var max = tableRows.length;
    var scrapingRow = setInterval(function() {
      target = $(tableRows[i]);
      showInfo(target.find("h2").text());
      target.click();
      i++;
      if(i == max) {
        clearInterval(scrapingRow);
      }
    }, 2000);
  }, 3000);

}());


