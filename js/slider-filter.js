filterWoman("all");
  function filterWoman(c) {
    var x, i;
    x = document.getElementsByClassName("item");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      womanRemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) womanAddClass(x[i], "show");
    }
  }
  
  function womanAddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
  }
  
  function womanRemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);     
      }
    }
    element.className = arr1.join(" ");
  }
  
  
  // Add active class to the current button (highlight it)
  var womanBtnContainer = document.getElementById("womanFilterContainer");
  var womanBtns = womanBtnContainer.getElementsByClassName("btn");
  var current;
  for (var i = 0; i < womanBtns.length; i++) {
    womanBtns[i].addEventListener("click", function(e){
      console.log(e.target.classList);
      if (e.target.classList.contains('active')) {
        return;
      } else {
        for(let k = 0; k < womanBtns.length; k++) {
          womanBtns[k].classList.remove('active');
        }
        this.classList.add("active");
      }
      // current = document.getElementsByClassName("active");
      // current[0].classList.remove('active')
      
      // console.log(this.classList);
      
    });
  }


  filterMan("all");
  function filterMan(c) {
    var x, i;
    x = document.getElementsByClassName("item");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      manRemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) manAddClass(x[i], "show");
    }
  }
  
  function manAddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
  }
  
  function manRemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);     
      }
    }
    element.className = arr1.join(" ");
  }
  
  
  // Add active class to the current button (highlight it)
  var manBtnContainer = document.getElementById("manFilterContainer");
  var manBtns = manBtnContainer.getElementsByClassName("btn");
  var current;
  for (var i = 0; i < manBtns.length; i++) {
    manBtns[i].addEventListener("click", function(e){
      console.log(e.target.classList);
      if (e.target.classList.contains('active')) {
        return;
      } else {
        for(let k = 0; k < manBtns.length; k++) {
          manBtns[k].classList.remove('active');
        }
        this.classList.add("active");
      }
      // current = document.getElementsByClassName("active");
      // current[0].classList.remove('active')
      
      // console.log(this.classList);
      
    });
  }