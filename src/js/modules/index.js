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

// top slider //
let dots = 4;
let sliderElem = document.querySelector(".slider");
let dotElems = sliderElem.querySelectorAll(".slider__dot");
let indicatorElem = sliderElem.querySelector(".slider__indicator");

Array.prototype.forEach.call(dotElems, (dotElem) => {
  dotElem.addEventListener("click", (e) => {
    let currentPos = parseInt(sliderElem.getAttribute("data-pos"));
    let newPos = parseInt(dotElem.getAttribute("data-pos"));

    let newDirection = newPos > currentPos ? "right" : "left";
    let currentDirection = newPos < currentPos ? "right" : "left";

    indicatorElem.classList.remove(`slider__indicator--${currentDirection}`);
    indicatorElem.classList.add(`slider__indicator--${newDirection}`);
    sliderElem.setAttribute("data-pos", newPos);
  });
});
