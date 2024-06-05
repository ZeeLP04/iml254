// MENU MAIN //
function openNav() {
    document.getElementById("myNav").style.height = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.height = "0%";
  }
  
  // Two menu from W3s //
  function openPedro() {
    document.getElementById("myPedro").style.height = "100%";
  }
  
  function closePedro() {
    document.getElementById("myPedro").style.height = "0%";
  }
  
  
  // TOGGLE DARK MODE //
  function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }
  
  
  // SCROLL TO TOP BUTTON //
  let mybutton = document.getElementById("myBtn");
  
  window.onscroll = function() { scrollFunction() };
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  
  