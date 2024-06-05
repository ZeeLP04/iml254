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


// TYPING EFFECT //
var i = 0;
var txt = 'Hey, you. Yes, you. Good morning, good afternoon, good evening, good night wherever you are right now.';
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}


// BLINKING STARS //
function ratestar() {
  var a;
  a = document.getElementById("div1");
  a.innerHTML = "&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;&#xf006;"; // 38 empty stars
  setTimeout(function () {
      a.innerHTML = "&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;&#xf123;"; // 38 filled stars
    }, 1000);
  setTimeout(function () {
      a.innerHTML = "&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;"; // 38 half stars
    }, 2000);
}
ratestar();
setInterval(ratestar, 3000);


// SLIDESHOW //
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}