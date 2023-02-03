import { active } from "browser-sync";

// FLS (Full Logging System) =================================================================================================================
export function FLS(message) {
  setTimeout(() => {
    if (window.FLS) {
      console.log(message);
    }
  }, 0);
}

// Проверка браузера на поддержку .webp изображений =================================================================================================================
export function isWebp() {
  // Проверка поддержки webp
  function testWebp(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp(function (support) {
    let className = support === true ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  });
}

// Функция для фиксированной шапки при скролле =================================================================================================================
export function headerFixed() {
  const header = document.querySelector(".header");
  const firstScreen = document.querySelector("[data-observ]");

  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle("sticky", !entry.isIntersecting);
  });

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen);
  }
}

////////////////////////////////////

// top slider //

export function topSlider() {
  const tSlider = document.querySelector(".slider");
  if (tSlider) {
    const sliders = document.querySelectorAll(".slider");
    // interval between switching images
    // can't be less than your animation duration in css!
    const interval = 3800;
    // if you don't want to first animation last longer than other animations
    // set animDuration (in miliseconds) to your value of animation duration in css
    const animDuration = 600;

    for (let i = 0; i < sliders.length; ++i) {
      const slider = sliders[i];
      const dots = slider.querySelector(".dots");
      const sliderImgs = slider.querySelectorAll(".img");

      let currImg = 0;
      let prevImg = sliderImgs.length - 1;
      let intrvl;
      let timeout;

      // Creates dots and add listeners to them
      for (let i = 0; i < sliderImgs.length; ++i) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dots.appendChild(dot);
        dot.addEventListener("click", dotClick.bind(null, i), false);
      }

      const allDots = dots.querySelectorAll(".dot");
      allDots[0].classList.add("active-dot");

      sliderImgs[0].style.left = "0";
      timeout = setTimeout(() => {
        animateSlider();
        sliderImgs[0].style.left = "";
        intrvl = setInterval(animateSlider, interval);
      }, interval - animDuration);

      /**
       * Animates images
       * @param {number} [nextImg] - index of next image to show
       * @param {boolean} [right = false] - animate to right
       */

      let nextImg;

      function animateSlider(nextImg, right) {
        if (!nextImg)
          nextImg = currImg + 1 < sliderImgs.length ? currImg + 2 : 1;

        --nextImg;
        sliderImgs[prevImg].style.animationName = "";

        if (!right) {
          sliderImgs[nextImg].style.animationName = "leftNext";
          sliderImgs[currImg].style.animationName = "leftCurr";
        } else {
          sliderImgs[nextImg].style.animationName = "rightNext";
          sliderImgs[currImg].style.animationName = "rightCurr";
        }

        prevImg = currImg;
        currImg = nextImg;

        let currDot = allDots[currImg];
        currDot.classList.add("active-dot");
        let prevDot = allDots[prevImg];
        prevDot.classList.remove("active-dot");
      }

      function rightSlider(nextImg) {
        if (currImg <= 0) {
          nextImg = sliderImgs.length - 1;
        } else {
          nextImg = currImg - 1;
        }

        sliderImgs[prevImg].style.animationName = "";

        sliderImgs[nextImg].style.animationName = "rightNext";
        sliderImgs[currImg].style.animationName = "rightCurr";

        prevImg = currImg;
        currImg = nextImg;

        let currDot = allDots[currImg];
        currDot.classList.add("active-dot");
        let prevDot = allDots[prevImg];
        prevDot.classList.remove("active-dot");
      }

      function leftSlider(nextImg) {
        if (currImg <= sliderImgs.length) {
          nextImg = currImg + 1 < sliderImgs.length ? currImg + 1 : 0;
        } else {
          --nextImg;
        }

        // nextImg = currImg + 1;

        sliderImgs[prevImg].style.animationName = "";

        sliderImgs[nextImg].style.animationName = "leftNext";
        sliderImgs[currImg].style.animationName = "leftCurr";

        prevImg = currImg;
        currImg = nextImg;

        let currDot = allDots[currImg];
        currDot.classList.add("active-dot");
        let prevDot = allDots[prevImg];
        prevDot.classList.remove("active-dot");
      }

      /**
       * Decides if animate to left or right and highlights clicked dot
       * @param {number} num - index of clicked dot
       */
      function dotClick(num) {
        if (num == currImg) return false;

        clearTimeout(timeout);
        clearInterval(intrvl);

        if (num > currImg) animateSlider(num + 1);
        else animateSlider(num + 1, true);

        intrvl = setInterval(animateSlider, interval);
      }

      ////////////////////////////////////////////

      // swiper for top-slider

      let isEnabled = true;

      const swipedetect = (el) => {
        let surface = el;
        let startX = 0;
        let startY = 0;
        let distX = 0;
        let distY = 0;
        let startTime = 0;
        let elapsedTime = 0;

        let threshold = 150;
        let restraint = 100;
        let allowedTime = 300;

        surface.addEventListener(
          "mousedown",
          function (e) {
            startX = e.pageX;
            startY = e.pageY;
            startTime = new Date().getTime();
            e.preventDefault();
          },
          false
        );

        surface.addEventListener(
          "mouseup",
          function (e) {
            distX = e.pageX - startX;
            distY = e.pageY - startY;
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= allowedTime) {
              if (
                Math.abs(distX) >= threshold &&
                Math.abs(distY) <= restraint
              ) {
                if (distX > 0) {
                  if (isEnabled) {
                    rightSlider(nextImg);
                  }
                } else {
                  if (isEnabled) {
                    leftSlider(nextImg);
                  }
                }
              }
            }
            e.preventDefault();
          },
          false
        );

        surface.addEventListener(
          "touchstart",
          function (e) {
            if (
              e.target.classList.contains("arrow") ||
              e.target.classList.contains("control")
            ) {
              if (e.target.classList.contains("left")) {
                if (isEnabled) {
                  // previousItem(currentItem);
                  rightSlider(nextImg);
                }
              } else {
                if (isEnabled) {
                  // nextItem(currentItem);
                  leftSlider(nextImg);
                }
              }
            }
            var touchobj = e.changedTouches[0];
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime();
            e.preventDefault();
          },
          false
        );

        surface.addEventListener(
          "touchmove",
          function (e) {
            e.preventDefault();
          },
          false
        );

        surface.addEventListener(
          "touchend",
          function (e) {
            var touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX;
            distY = touchobj.pageY - startY;
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= allowedTime) {
              if (
                Math.abs(distX) >= threshold &&
                Math.abs(distY) <= restraint
              ) {
                if (distX > 0) {
                  if (isEnabled) {
                    // previousItem(currentItem);
                    rightSlider(nextImg);
                  }
                } else {
                  if (isEnabled) {
                    leftSlider(nextImg);
                  }
                }
              }
            }
            e.preventDefault();
          },
          false
        );
      };

      var el = document.querySelector(".top-slider");
      swipedetect(el);
    }
    var el = document.querySelector(".top-slider");
  }
}

// //////////////////////////////////////////////

// video-popup

export function videoPopup() {
  const videoPop = document.querySelector(".video-fashion__popup");
  if (videoPop) {
    const videoBtn = document.querySelector(".video-fashion__play");
    const playVideo = document.querySelector(".video-fashion__play");
    const closeVideo = document.querySelector(".close");
    const clip = document.querySelector(".clip");
    const clipStop = document.querySelector("iframe");
    const body = document.querySelector("body");

    playVideo.onclick = function () {
      videoBtn.classList.add("active");
      clip.classList.add("active");
      body.classList.add("lock");

      clipStop.setAttribute("src", "https://www.youtube.com/embed/79KAKX1nnwU");

      clip.addEventListener("click", (event) => {
        clip.classList.remove("active");
        body.classList.remove("lock");

        const clipStop = document.querySelector("iframe");
        clipStop.setAttribute("src", " ");
      });
    };
  }
}

// ////////////////////////////////////////

// star-rating

export function starRating() {
  const star = document.querySelector(".star__rating");
  if (star) {
    const ratingItems = document.querySelectorAll(".star__rating-item");
    const ratingItemsArr = Array.prototype.slice.call(ratingItems);

    ratingItemsArr.forEach((item) =>
      item.addEventListener("click", () => {
        const { itemValue } = item.dataset;
        item.parentNode.dataset.totalValue = itemValue;

        // request itemValue - это значение отправляем на backend;
      })
    );
  }
}

// ///////////////////////////////////////

// clock-timer

export function clockTimer() {
  const promoClock = document.querySelector(".promo__clock");
  if (promoClock) {
    function getTimeRemaining(endtime) {
      const total = Date.parse(endtime) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));

      return {
        total,
        days,
        hours,
        minutes,
        seconds,
      };
    }

    function initializeClock(promo__clock, endtime) {
      const clock = document.querySelector(".promo__clock");
      const daysSpan = document.querySelector(".promo__days");
      const hoursSpan = document.querySelector(".promo__hours");
      const minutesSpan = document.querySelector(".promo__minutes");
      const secondsSpan = document.querySelector(".promo__seconds");

      function updateClock() {
        const t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
        minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }

      updateClock();
      const timeinterval = setInterval(updateClock, 1000);
    }

    const deadline = document
      .querySelector(".promo__clock")
      .getAttribute("data-time");

    initializeClock("promo__clock", deadline);
  }
}

//////////////////////////////////////////////

// range slider

export function rSlideR() {
  const wrapSliderR = $(".filter-price__input");
  if (wrapSliderR) {
    wrapSliderR.ionRangeSlider({
      type: "double",
      onStart: function (data) {
        $(".filter-price__from").text("$" + data.from);
        $(".filter-price__to").text("$" + data.to);
      },
      onChange: function (data) {
        $(".filter-price__from").text("$" + data.from);
        $(".filter-price__to").text("$" + data.to);
      },
    });
  }
}

////////////////////////////////////////////////

// form styler

// export function formStyler() {
//   const wrapFormStyler = $(".select-style");
//   if (wrapFormStyler) {
//     wrapFormStyler.styler();
//   }
// }

////////////////////////////////////////////////

// shop-btn-filter

// export function switchBtnFilter() {
//   const wrapBtnSwitcher = document.querySelector(".shop-content__filter-btn");
//   if (wrapBtnSwitcher) {
//     wrapBtnSwitcher.addEventListener("click", function () {
//       alert("Working");
//     });
//   }
// }

////////////////////////////////////////////////

// $(".shop-content__filter-btn").on("click", function () {
//   $(".shop-content__filter-btn").toggleClass("active");
// });
