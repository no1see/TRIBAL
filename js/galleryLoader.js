$(document).ready(function(){
  var folder = "/assets/images/sell";
  let arr = [];
  $.ajax({
    url : folder,
    success: function (data) {
      $(data).find("a").attr("href", function (i, val) {
        if( val.match(/\.(jpe?g|png|gif)$/) ) {
          arr.push(i);
          console.log(arr.length);
          $(".directorySlider").append( "<img src='" + val +"' class='image-loader'>" );
        } 
      });
    }
  });
});