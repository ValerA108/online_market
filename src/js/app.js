import "./libs/jQuery_3.6.3";
import { rSlider } from "ion-rangeslider";
import "./libs/jquery.formstyler.min";
import "./libs/slick";

import {
  isWebp,
  activeMenuItem,
  clockTimer,
  rSlideR,
  videoPopup,
  headerFixed,
  starRating,
  topSlider,
  formStyler,
  slickSlider,
  productTabsSwitcher,
  slickSliderBlogPage,
  burgBtn,
  switchBtnFilter,
} from "./modules";

/* Раскомментировать для использования */
// import { MousePRLX } from './libs/parallaxMouse'

/* Раскомментировать для использования */
// import Swiper, { Navigation, Pagination } from 'swiper'

// Проверка браузера на поддерку .webp изображений ====================================================================================================================================================
isWebp();
// ====================================================================================================================================================

// Паралакс мышей ====================================================================================================================================================
// const mousePrlx = new MousePRLX({})
// ====================================================================================================================================================

// Фиксированный header ====================================================================================================================================================
// headerFixed()
// ====================================================================================================================================================

activeMenuItem();
topSlider();
starRating();
videoPopup();
clockTimer();
rSlideR();
formStyler();
switchBtnFilter();
slickSlider();
productTabsSwitcher();
slickSliderBlogPage();
burgBtn();
