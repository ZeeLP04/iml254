// TRACKS (VUE)
new Vue({
  el: "#app",
  data() {
      return {
          audio: null,
          circleLeft: null,
          barWidth: null,
          duration: null,
          currentTime: null,
          isTimerPlaying: false,
          tracks: [
              {
                  name: "Guilty as Sin",
                  artist: "Taylor Swift",
                  cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
                  source: "audios/guilty as sin.mp3",
                  favorited: false
              },
              {
                  name: "Cool",
                  artist: "Dua Lipa",
                  cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
                  source: "audios/cool.mp3",
                  favorited: true
              },
              {
                  name: "Oh, What a World",
                  artist: "Kacey Musgrave",
                  cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
                  source: "audios/oh, what a world.mp3",
                  favorited: false
              },
              {
                  name: "Claudia",
                  artist: "Finneas",
                  cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
                  source: "audios/claudia.mp3",
                  favorited: false
              },
              {
                  name: "Apricots",
                  artist: "MAY-A",
                  cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
                  source: "audios/apricots.mp3",
                  favorited: true
              },
              {
                  name: "Honeymoon Avenue",
                  artist: "Ariana Grande",
                  cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
                  source: "audios/honeymoon avenue.mp3",
                  favorited: false
              },
              {
                  name: "Pretty isn't Pretty",
                  artist: "Olivia Rodrigo",
                  cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
                  source: "audios/pretty isnt pretty.mp3",
                  favorited: true
              },
              {
                  name: "Come with Me",
                  artist: "Echosmith",
                  cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
                  source: "audios/come with me.mp3",
                  favorited: false
              },
              {
                  name: "These are the Days",
                  artist: "The Inhaler",
                  cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
                  source: "audios/these are the days.mp3",
                  favorited: false
              }
          ],
          currentTrack: null,
          currentTrackIndex: 0,
          transitionName: null
      };
  },
  // METHOD
  methods: {
      play() {
          if (this.audio.paused) {
              this.audio.play();
              this.isTimerPlaying = true;
          } else {
              this.audio.pause();
              this.isTimerPlaying = false;
          }
      },
      // GENERATE TIME
      generateTime() {
          let width = (100 / this.audio.duration) * this.audio.currentTime;
          this.barWidth = width + "%";
          this.circleLeft = width + "%";
          let durmin = Math.floor(this.audio.duration / 60);
          let dursec = Math.floor(this.audio.duration - durmin * 60);
          let curmin = Math.floor(this.audio.currentTime / 60);
          let cursec = Math.floor(this.audio.currentTime - curmin * 60);
          if (durmin < 10) {
              durmin = "0" + durmin;
          }
          if (dursec < 10) {
              dursec = "0" + dursec;
          }
          if (curmin < 10) {
              curmin = "0" + curmin;
          }
          if (cursec < 10) {
              cursec = "0" + cursec;
          }
          this.duration = durmin + ":" + dursec;
          this.currentTime = curmin + ":" + cursec;
      },
      // UPDATE BAR
      updateBar(x) {
          let progress = this.$refs.progress;
          let maxduration = this.audio.duration;
          let position = x - progress.offsetLeft;
          let percentage = (100 * position) / progress.offsetWidth;
          if (percentage > 100) {
              percentage = 100;
          }
          if (percentage < 0) {
              percentage = 0;
          }
          this.barWidth = percentage + "%";
          this.circleLeft = percentage + "%";
          this.audio.currentTime = (maxduration * percentage) / 100;
          this.audio.play();
      },
      // CLICK PROGRESS
      clickProgress(e) {
          this.isTimerPlaying = true;
          this.audio.pause();
          this.updateBar(e.pageX);
      },
      // PREVIOUS TRACK
      prevTrack() {
          this.transitionName = "scale-in";
          this.isShowCover = false;
          if (this.currentTrackIndex > 0) {
              this.currentTrackIndex--;
          } else {
              this.currentTrackIndex = this.tracks.length - 1;
          }
          this.currentTrack = this.tracks[this.currentTrackIndex];
          this.resetPlayer();
      },
      // NEXT TRACK
      nextTrack() {
          this.transitionName = "scale-out";
          this.isShowCover = false;
          if (this.currentTrackIndex < this.tracks.length - 1) {
              this.currentTrackIndex++;
          } else {
              this.currentTrackIndex = 0;
          }
          this.currentTrack = this.tracks[this.currentTrackIndex];
          this.resetPlayer();
      },
      // RESET PLAYER
      resetPlayer() {
          this.barWidth = 0;
          this.circleLeft = 0;
          this.audio.currentTime = 0;
          this.audio.src = this.currentTrack.source;
          setTimeout(() => {
              if (this.isTimerPlaying) {
                  this.audio.play();
              } else {
                  this.audio.pause();
              }
          }, 300);
      },
      // FAVOURITE
      favorite() {
          this.tracks[this.currentTrackIndex].favorited = !this.tracks[
              this.currentTrackIndex
          ].favorited;
      }
  },
  // CREATED
  created() {
      let vm = this;
      this.currentTrack = this.tracks[0];
      this.audio = new Audio();
      this.audio.src = this.currentTrack.source;
      this.audio.ontimeupdate = function () {
          vm.generateTime();
      };
      this.audio.onloadedmetadata = function () {
          vm.generateTime();
      };
      this.audio.onended = function () {
          vm.nextTrack();
          this.isTimerPlaying = true;
      };


      for (let index = 0; index < this.tracks.length; index++) {
          const element = this.tracks[index];
          let link = document.createElement('link');
          link.rel = "prefetch";
          link.href = element.cover;
          link.as = "image"
          document.head.appendChild(link)
      }
  }
});











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
var txt = 'Whenever you feel lost in the darkness, remember the lightness that was previously there because it can guide you back home.';
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