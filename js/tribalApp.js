$(document).ready(function(){
  
  $('#mixedSlider').multislider({
    duration: 750,
    interval: 3000
  });
  var options = '';
  $.getJSON("allGoods.json", function(json) {
    $('.selectpicker').empty();
    $('.selectpicker').append($('<option class="form-select-default-option">').text("-"));
    // console.log(json);
    $.each(json, function(i, obj) {
        // options += '<option value=' + obj.code + '>' +  obj.code - obj.name + '</option>';
        $('.selectpicker').append($(`<option class='form-select--option'  data-content='<img class="select-img" src="assets/images/sell/${obj.code}/${obj.code}-1.jpeg"/> <p>${obj.name} <br/> Ціна: <span class="form-price">${obj.price}</span> UAH  </p>'></option>`).text(`${obj.name}`).attr('value', obj.code));
    });
    // $('.selectpicker').selectpicker();
    $('.selectpicker').selectpicker({
        style: 'btn-toggler',
        showIcon: true
    });
  });

  $('#form-selector').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue) {
    var selectedD = $(this).find('option').eq(clickedIndex).text();
    // console.log('selectedD: ' + selectedD + '  newValue: ' + newValue + ' oldValue: ' + oldValue);
    if (selectedD == "-") {
        $('.form-selectlabel').removeClass('activated').addClass('deactivated');
        $('.select-group').removeClass('select-group-true')
    } else {
        $('.form-selectlabel').removeClass('deactivated').addClass('activated');
        $('.select-group').addClass('select-group-true')
    }
  });

  $('#bs4-slide-carousel').carousel({
    interval: 3000
  });

  $(function() {
    $('form').submit(function(event) {
        // event.preventDefault();
    });
    return false;
  });

  $(function() {
    var $imgSrc,
        $imgElement,
        $description,
        $modalDescription;
    var folderNumber;
    var folder;
    let arr = [];
    let button;
    let $descriptionObject;


    $(".goods-item").click(function(e) {
        // $descriptionObject = null;
        $description = $(this).find('.filter-item--description');
        $modalDescription = $description.clone();
        $imgElement = $(this).find('img');
        folder = `./assets/images/sell/${$imgElement.prop('id')}`;
        button = `<div class="category-modal--btn__wrapper row d-flex justify-content-center"><button class="category-modal--btn" data-val="${$imgElement.prop('id')}" data-toggle="modal" data-target="#formModal">Замовити</button></div>`;
        $imgSrc = $imgElement.attr('src');
        // console.log($imgSrc);
        $("#categoryModal").modal({
            backdrop: true
        });
    });

    $(".filter-item").click(function(e) {
        // $descriptionObject = null;
        $description = $(this).find('.filter-item--description');
        $modalDescription = $description.clone();
        $imgElement = $(this).find('img');
        folder = `./assets/images/sell/${$imgElement.prop('id')}`;
        button = `<button class="category-modal--btn" data-val="${$imgElement.prop('id')}" data-toggle="modal" data-target="#formModal">Замовити</button>`;
        $imgSrc = $imgElement.attr('src');
        // console.log($imgSrc);
        $("#categoryModal").modal({
            backdrop: true
        });
    });

    $('#categoryModal').on('show.bs.modal', function(e) {
        var imgM = $("<img>").attr('src', $imgSrc).addClass('img-fluid');
        $('.category-modal-body').append(imgM);
        $('.category-modal-body').append($modalDescription);
        $('.category-modal-body').find('.filter-item--description').append(button);
        $('.category-modal-body').html('<div class="category-modal--wrapper"><div class="directorySlider"></div><div class="main-image-container"><img id="expandedImg" style="width:100%"> <div id="imgtext"></div> </div> </div>');
        $.ajax({
            url: folder,
            success: function(data) {
                $(data).find("a").attr("href", function(i, val) {
                    if (val.match(/\.(jpe?g|png|gif)$/)) {
                        // console.log(val);
                        arr.push(i);
                        // console.log(arr.length);
                        $(".directorySlider").append("<div class='rows'><img src='" + val + "' class='img-fluid' onclick='myFunction(this);'></div>");
                    }
                });
            }
        });
        $('.category-modal-body').append($modalDescription);
    });
    
    $('#categoryModal').on('shown.bs.modal', function(e) {
        // console.log('loaded');
        $(".directorySlider .rows img").first().trigger('click');
        // console.log('clicked');
        
    });

    $('#categoryModal').on('hidden.bs.modal', function(e) {
        $('.category-modal-body').empty();
        $(".directorySlider").empty();
        arr.length = 0;
    });
  });
  $('#formModal').on('show.bs.modal', function(e) {
    $("body").addClass("modal-open");
    $('#categoryModal').modal('hide');
    var myVal = $(e.relatedTarget).data('val');
    if (myVal) {
        $('select[name=order]').val(myVal);
        $('.form-selectlabel').removeClass('deactivated').addClass('activated');
        $('.select-group').addClass('select-group-true');
        $('.selectpicker').selectpicker('refresh');
    }
  });

  $('#formModal').on('hide.bs.modal', function() {
    $("body").removeClass("modal-open");
  })

  $(function() {
    $('.send-form').on('submit', function(event) {
        event.preventDefault();
        let name = $('input[name="name"]').val(),
            from = $('input[name="from"]').val(),
            city = $('input[name="city"]').val(),
            number = $('input[name="number"]').val(),
            phone = $('input[name="phone"]').val(),
            body = $('textarea[name="body"]').val(),
            order = $('select[name="order"]').val();
        $.ajax({
            url: 'http://localhost:3000/send-email',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name,
                from,
                phone,
                city,
                number,
                body,
                order
            }),
            beforeSend: function() {
                $("#loaderDiv").show();
                $('.loader-wrapper').show();
            },
            complete: function() {
                $("#loaderDiv").hide();
                $('.loader-wrapper').hide();
            },
            success: function(response) {
                window.location.href = "thanks.html";
                // console.log(response);
            },
            fail: function(error) {
                console.log(error);
            }
        });
        // console.log(this.data);
        // debugger;
        return false;
    });
  });
});