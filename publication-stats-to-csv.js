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
    var threeMonthsBtn = $(".js-time-threeMonths button");

    if(threeMonthsBtn.length == 3) {
      showInfo("Find buttons! Change to 90 days stats.");
      threeMonthsBtn.each(function() {
        $(this).click();
        console.log($(this));
      });
      showInfo("done.");
      return true;
    } else {
      showInfo("Could not find buttons... Try again.");
      async(clickThreeMonthsButton, 1000);
    }

  }

  var getGraphMaxValue = function() {
  }
  
  async(function() {
    var d = $.Deferred();
    d.promise()
      .then(clickThreeMonthsButton()) // change to 90 days stats
      .then(getGraphMaxValue())
      .fail(function() {
        console.log('common fail' + arguments);
      })
      .always(function() {
        console.log('always' + arguments);
      });
  }, 2000);

}());


