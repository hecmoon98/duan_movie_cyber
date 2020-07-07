window.addEventListener("scroll", function(){
    let header = document.getElementById("header");
    if(window.pageYOffset > 0){
        header.classList.add("header_sroll");
    }else{
        header.classList.remove("header_sroll");
    }

})


function openCity(cityName) {
    // Declare all variables
    var i, tabcontent;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    console.log(tabcontent)
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
   
    
  }
  document.getElementById("defaultOpen").click();



  function openCi(cityName) {
    // Declare all variables
    var i, tabcontent;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabconte");
    console.log(tabcontent)
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
   
    
  }
  document.getElementById("defaultO").click();


