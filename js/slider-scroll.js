$(document).ready(function(){
    
    // manual carousel controls
    $('.MS-left').click(function(){ $('.carousel').carousel('next');return false; });
    $('.MS-right').click(function(){ $('.carousel').carousel('prev');return false; });

    // END OFF SCROLL EFFECTS
    $("#bs4-slide-carousel").swiperight(function(e) {
        e.preventDefault();
        $(this).carousel('prev');
        // console.log('right');
    });
    $("#bs4-slide-carousel").swipeleft(function(e) {
        e.preventDefault();
        $(this).carousel('next');
        // console.log('left');
    });
    $("#mixedSlider").swiperight(function(e) {
        e.preventDefault();
        $(this).multislider('prev');
        // console.log('right');
    });
    $("#mixedSlider").swipeleft(function(e) {
        e.preventDefault();
        $(this).multislider('next');
        // console.log('left');
    });
 
});