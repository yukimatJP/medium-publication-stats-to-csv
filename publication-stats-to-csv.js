(function() {
  if (! window.jQuery ) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js';
    (document.getElementsByTagName('head')[0] ||
      document.getElementsByTagName('body')[0]).appendChild(s);
  }

  // change to 90 days stats
  clickThreeMonthsButton();

}());

function clickThreeMonthsButton() {
  var threeMonthsBtn = $(".js-time-threeMonths button");

  if(threeMonthsBtn.length == 3) {
    threeMonthsBtn.each(function() {
      $(this).click();
      console.log(this);
    });
  } else {
    setTimeout(function() {
      clickThreeMonthsButton();
    }, 1000);    
  }
}
