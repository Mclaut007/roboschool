// Шаблон, если будут нужны нужны разные стили для ПК и мобильных устройств (с тачпадом)

"use strict";

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

const youGetImpInfoIcon = document.querySelector(".you-get__imp-info-icon");

const youGetImpInfoPopup = document.querySelector(".you-get__imp-info-popup");

if (isMobile.any()) {
  // document.body.classList.add("_touch");

  // Popup-окно c дополнительной информацией, появляющееся при клике на иконке с буквой 'i' (информация) на тачпадах. Лучше реализовать без JS.

  youGetImpInfoIcon.addEventListener("click", showPopupInfo);

  function showPopupInfo() {
    youGetImpInfoPopup.classList.toggle("_show");
  }
} else {
  // document.body.classList.add("_pc");

  // Popup-окно c дополнительной информацией, появляющееся при наведении на иконку с буквой 'i' (информация). Лучше реализовать без JS.

  youGetImpInfoIcon.addEventListener("mouseover", showPopupInfo);
  youGetImpInfoIcon.addEventListener("mouseout", hidePopupInfo);

  function showPopupInfo() {
    youGetImpInfoPopup.classList.add("_show");
  }

  function hidePopupInfo() {
    youGetImpInfoPopup.classList.remove("_show");
  }
}

// Появление и исчезновение меню при клике по бургеру

const headerMenuButton = document.querySelector(".header__menu-button");
const headerMenu = document.querySelector(".header__menu");
const headerLink = document.querySelectorAll(".header__link");

headerMenuButton.addEventListener("click", openMenu);

for (let i = 0; i < headerLink.length; i++) {
  headerLink[i].addEventListener("click", closeMenu);
}

function openMenu() {
  this.classList.toggle("_open");
  headerMenu.classList.toggle("header__menu_open");
  document.body.classList.toggle("_lock");
}

function closeMenu() {
  headerMenuButton.classList.remove("_open");
  headerMenu.classList.remove("header__menu_open");
  document.body.classList.remove("_lock");
}

// ============== coaches-swiper ============== //

const swiper = new Swiper(".coaches__swiper", {
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".coaches__swiper-button-next",
    prevEl: ".coaches__swiper-button-prev",
  },

  loop: false,
  slidesPerGroup: 1,

  breakpoints: {
    320: {
      spaceBetween: 20,
      slidesPerView: "auto",
      freeMode: true,
    },
    767.98: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    991.98: {
      spaceBetween: 40,
      slidesPerView: 3,
    },
  },
});

const coachPopupSwiper = new Swiper(".coach-card-popup__swiper", {
  direction: "vertical",
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },

  loop: false,
  slidesPerGroup: 1,
  slidesPerView: "auto",
  freeMode: true,
  mousewheel: {
    sensitivity: 0.5,
  },
});

// =================== //

// const coachCardPopup = document.querySelector(".coach-card-popup");
// const buttonMore = document.querySelector(".coach-card__more");
// const coachCardPopupCloseButton = document.querySelector(
//   ".coach-card-popup__close-button"
// );
// const body = document.body;

// ============ Если попапов много ============= //

const coachCardPopupAll = document.querySelectorAll(".coach-card-popup");
const buttonMoreAll = document.querySelectorAll(".coach-card__more");
const coachCardPopupCloseButtonAll = document.querySelectorAll(
  ".coach-card-popup__close-button"
);
const body = document.body;

for (let i = 0; i < buttonMoreAll.length; i++) {
  buttonMoreAll[i].addEventListener("click", showPopup);
}

// ================== //

function showPopup() {
  for (let item of coachCardPopupAll) {
    if (item.dataset.coach === this.id.replace("#", "")) {
      item.classList.add("_open");
      body.classList.add("_lock");
    }
  }
}

for (let item of coachCardPopupCloseButtonAll) {
  item.addEventListener("click", closePopup);
}

function closePopup() {
  this.closest(".coach-card-popup").classList.remove("_open");
  body.classList.remove("_lock");
}

for (let i = 0; i < coachCardPopupAll.length; i++) {
  coachCardPopupAll[i].addEventListener("click", closePopup2);
}

function closePopup2(e) {
  if (!e.target.closest(".coach-card-popup__content")) {
    this.closest(".coach-card-popup").classList.remove("_open");
    body.classList.remove("_lock");
  }
}

document.addEventListener("keydown", closePopup3);

function closePopup3(e) {
  if (e.code == "Escape") {
    for (let i = 0; i < coachCardPopupAll.length; i++) {
      coachCardPopupAll[i].classList.remove("_open");
    }
    body.classList.remove("_lock");
  }
}

// ======= Табы ======= //

const coachCardPopupTabAll = document.querySelectorAll(
  ".coach-card-popup__tab"
);

// const coachCardPopupSwipersAll = document.querySelectorAll(
//   ".coach-card-popup__swiper"
// );

for (let i = 0; i < coachCardPopupTabAll.length; i++) {
  coachCardPopupTabAll[i].addEventListener("click", showTab);
  const coachCardPopupMain = coachCardPopupTabAll[i].closest(
    ".coach-card-popup__main"
  );

  if (
    coachCardPopupMain.querySelector(
      `.coach-card-popup__swiper[data-info='${coachCardPopupTabAll[
        i
      ].id.replace("#", "")}']`
    ) &&
    coachCardPopupMain.querySelector(
      `.coach-card-popup__swiper[data-info='${coachCardPopupTabAll[
        i
      ].id.replace("#", "")}'] .coach-card-popup__swiper-slide`
    ).innerHTML
  ) {
    coachCardPopupTabAll[i].classList.remove("coach-card-popup__tab_disabled");
  } else {
    coachCardPopupTabAll[i].classList.add("coach-card-popup__tab_disabled");
  }
}

function showTab(e) {
  const coachCardPopupMain = this.closest(".coach-card-popup__main");
  const oneCoachAllTabs = coachCardPopupMain.querySelectorAll(
    ".coach-card-popup__tab"
  );
  const oneCoachPopupSwipersAll = coachCardPopupMain.querySelectorAll(
    ".coach-card-popup__swiper"
  );

  for (let i = 0; i < oneCoachAllTabs.length; i++) {
    oneCoachAllTabs[i].classList.remove("coach-card-popup__tab_active");
  }
  this.classList.add("coach-card-popup__tab_active");

  for (let i = 0; i < oneCoachPopupSwipersAll.length; i++) {
    if (oneCoachPopupSwipersAll[i].dataset.info === this.id.replace("#", "")) {
      oneCoachPopupSwipersAll[i].classList.add(
        "coach-card-popup__swiper_active"
      );

      // Следующий код уменьшает и увеличиваем высоту свайпера-вкладки на 1 миллисекунду(можно то же самое делать с шириной). Иначе при переключении между вкладками почему-то пропадает ползунок скроллинга (у него height становится равным 0). Код ниже - для решения этой проблемы. При изменении высоты свайпера пересчитывается высота ползунка. Без setTimeout первая строчка ниже - не работает. Ведь следующей строчкой атрибут style убирается. Программа как будто строчку со style не добавляет. Ведет себя так, как будто двух строчек просто нет (потому что, видимо, они с точки зрения программы ничего не делают). margin-bottom добавляем, потому что без него дергание, так как меняется высота попапа (она зависит от высоты свайпера) - так ширина попапа не меняется.

      oneCoachPopupSwipersAll[i].style.height =
        oneCoachPopupSwipersAll[i].offsetHeight - 1 + "px";
      oneCoachPopupSwipersAll[i].style.marginBottom = "1px";
      setTimeout(() => oneCoachPopupSwipersAll[i].removeAttribute("style"), 1);

      // =========== //
    } else {
      oneCoachPopupSwipersAll[i].classList.remove(
        "coach-card-popup__swiper_active"
      );
    }
  }
}
