$(window).scroll(function() {
  if ($(this).scrollTop()) {
      $('#toTop').fadeIn();
  } else {
      $('#toTop').fadeOut();
  }
});
$('.header-content__btn').on('click', function(event) {
  event.preventDefault();
  $('html, body').animate({ scrollTop: $("#advantages").offset().top }, 'slow');
});

$('.home-nav').click(function (event) {
  event.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, 'slow');
  window.location.hash = 'home';
});

// Scroll effect for navigation Links
$("a#nav-scroller").on('click', function (event) {
      // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
          scrollTop: $(hash).offset().top
      }, 800, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
      });
  } // End if
});
$("#toTop").click(function () {
 //1 second of animation time
 //html works for FFX but not Chrome
 //body works for Chrome but not FFX
 //This strange selector seems to work universally
 $("html, body").animate({scrollTop: 0}, 1000);
});
