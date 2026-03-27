$(document).ready(function () {
  // Кнопка презентаций
  let buttonScrolled = document.querySelector(".scrolled-wrap");

  const scrollHandler = () => {
    document.documentElement.scrollTop > 500
      ? buttonScrolled.classList.add("scrolled")
      : buttonScrolled.classList.remove("scrolled");
  };

  if (window.innerWidth < 650) {
    window.addEventListener("scroll", scrollHandler, { passive: true });
  }

  window.onresize = () => {
    if (window.innerWidth >= 650) {
      buttonScrolled.classList.remove("scrolled");
      window.removeEventListener("scroll", scrollHandler);
    } else {
      window.addEventListener("scroll", scrollHandler, { passive: true });
    }
  };

  // Кнопка презентаций

  // Кнопка возврата наверх
  let mybutton = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", scrollFunction, { passive: true });

  function scrollFunction() {
    if (
      document.body.scrollTop > 600 ||
      document.documentElement.scrollTop > 600
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  mybutton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Кнопка возврата наверх

  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        scrollTimeout = null;

        // Анимация шапки
        const header = document.querySelector(".header");
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        header.classList.toggle("scrolled", scrollTop > 500);

        // Анимация элементов
        animOnScroll();
      }, 16);
    }
  });

  //////////////////////////////////////////////////////////////////////////////////////////////
  ///

  function calcScroll() {
    let div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";
    div.style.position = "absolute";
    div.style.top = "-9999px";

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  function burger() {
    let burger = document.querySelector(".burger");
    let mobMenu = document.querySelector(".menu");
    let close = document.querySelector(".close");
    let body = document.body; // Используем body напрямую
    let headerWrap = document.querySelector("header");

    // Более надежный селектор для ссылок меню
    let menuLinks = document.querySelectorAll(".link");

    let scroll = calcScroll();
    let isMenuOpen = false;

    // Функция для скрытия меню
    function closeMenu() {
      mobMenu.classList.remove("active");
      headerWrap.classList.remove("active");
      body.style.overflow = "";
      body.style.marginRight = "";
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.height = "";
      isMenuOpen = false;
    }

    // Функция для открытия меню
    function openMenu() {
      mobMenu.classList.add("active");
      headerWrap.classList.add("active");

      // Фиксируем body для мобильных устройств
      const scrollY = window.scrollY;
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
      body.style.height = "100%";
      body.style.marginRight = `${scroll}px`;

      isMenuOpen = true;

      // Сохраняем позицию скролла для восстановления
      body.dataset.scrollY = scrollY;
    }

    // Функция для восстановления скролла после закрытия меню
    function restoreScroll() {
      const scrollY = body.dataset.scrollY || 0;
      window.scrollTo(0, parseInt(scrollY));
    }

    // Обработчик клика по бургеру
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      if (isMenuOpen) {
        closeMenu();
        restoreScroll();
      } else {
        openMenu();
      }
    });

    // Обработчик клика по крестику
    close.addEventListener("click", function (e) {
      e.stopPropagation();
      closeMenu();
      restoreScroll();
    });

    // Обработчик клика по ссылкам в меню
    menuLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        if (targetId === "#" || targetId === "##") return;

        // Сохраняем позицию ДО закрытия меню
        const scrollBeforeClose = window.pageYOffset;

        const LinkHref = document.querySelectorAll(`.link[href="${targetId}"]`);

        menuLinks.forEach((el) => {
          el.classList.remove("active");
        });

        LinkHref.forEach((sameLink) => {
          sameLink.classList.add("active");
        });

        // Закрываем меню
        closeMenu();

        // Всегда скроллим от сохраненной позиции
        setTimeout(() => {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const headerHeight = headerWrap.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        }, 50);
      });
    });

    // Закрытие меню при клике вне области меню
    document.addEventListener("click", function (e) {
      if (
        isMenuOpen &&
        !e.target.closest(".menu") &&
        !e.target.closest(".burger") &&
        e.target !== burger
      ) {
        closeMenu();
        restoreScroll();
      }
    });

    // Обработчик изменения ориентации и resize
    window.addEventListener("resize", function () {
      if (isMenuOpen && window.innerWidth > 768) {
        // 768px - пример breakpoint для desktop
        closeMenu();
        restoreScroll();
      }
    });

    // Предотвращаем закрытие при клике внутри меню
    mobMenu.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  //burger();

  //////////////////////////////////////////////////////////////////////////////////////////////
  ///

  $("#progress1").on("submit", function (e) {
    e.preventDefault();
    if ($(this).valid() === false) return false;
    // second param is speed in seconds
    progressBar(e.target, 4);
    return false;
  });

  function progressBar(form, speed) {
    var progressbar = $("#" + form.id + " .section5__bar");
    progressbar.addClass("active");
    var max = 100;
    var time = (1000 / max) * speed;
    var value = parseInt(progressbar.attr("data-val"));
    var animate = setInterval(function () {
      value += 1;
      progressbar.attr("data-val", value);
      progressbar.width(value + "%");
      progressbar.find("span").text(value + "%");
      if (value == max) {
        clearInterval(animate);
        var inputSign = $("#" + form.id + " > div.flex.align-item");
        setTimeout(function () {
          // set pause before the form
          triggerOnStop(progressbar, inputSign.val());
        }, 700);
      }
    }, time);
  }

  function triggerOnStop(el, inputValue) {
    //$('.location-form').trigger('click');
    document.querySelector(".location-form").click();
    el.removeClass("active");
    el.find("span").text("0%");
    el.width("0px");
    el.attr("data-val", "0");
    $("#progress-modal input[name=item_sign]").val(inputValue);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  ///

  let coockeBtn = document.querySelector(".coocke-btn");
  let modalCoocke = document.querySelector("#modalcoocke");

  if (coockeBtn) {
    coockeBtn.addEventListener("click", function () {
      modalCoocke.style.display = "none";
      buttonScrolled.style.bottom = "20px";
      mybutton.style.bottom = "20px";
    });
  }

  let formAll = document.querySelectorAll(".sectionForm");

  formAll.forEach((el) => {
    let formBtn = el.querySelector(".btn");
    let formCheckbox = el.querySelector("input[type=checkbox]");
    ///let formBottom =  el.querySelector(".form-info__bottom");
    let formAllert = el.querySelector(".form-allert");
    let formLabel = el.querySelector(".form-bottom");

    formBtn.addEventListener("click", function () {
      if (formCheckbox.checked) {
      } else {
        //formBottom.classList.add('error');
        formAllert.classList.add("error");
        formLabel.classList.add("error");
      }
    });

    if (formCheckbox) {
      formCheckbox.addEventListener("click", function () {
        if (formCheckbox.checked) {
          //formBottom.classList.remove('error');
          formAllert.classList.remove("error");
          formLabel.classList.remove("error");
        }
      });
    }
  });

  let AllInputs = document.querySelectorAll("input");
  let AllFormBottom = document.querySelectorAll(".form-bottom");
  let AllFormAllert = document.querySelectorAll(".form-allert");
  let AllFormChek = document.querySelectorAll("input[type=checkbox]");

  $('[data-fancybox=""]').fancybox({
    beforeClose: function () {
      AllInputs.forEach((el) => {
        el.classList.remove("error");
      });

      AllFormBottom.forEach((el) => {
        el.classList.remove("error");
      });

      AllFormAllert.forEach((el) => {
        el.classList.remove("error");
      });

      AllFormChek.forEach((el) => {
        el.checked = false;
      });

      AllFormChek.forEach((el) => {
        el.checked = false;
      });

      AllInputs.forEach((el) => {
        if (
          el.type !== "checkbox" &&
          el.type !== "radio" &&
          el.type !== "submit" &&
          el.type !== "button"
        ) {
          el.value = "";
        }
      });
    },
  });

  $(window)
    .on("resize", function (e) {
      // Переменная, по которой узнаем запущен слайдер или нет.
      // Храним её в data
      var init = $(".second-list").data("init-slider");
      // Если мобильный

      let sliderImages = document.querySelectorAll(".images");

      if (document.documentElement.clientWidth < 650) {
        if (sliderImages) {
          sliderImages.forEach((el) => {
            el.remove();
          });
        }

        if (init != 1) {
          $(".second-list")
            .slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
              //fade: true,
              autoplay: true,
              speed: 1000,
              autoplaySpeed: 2000,
            })
            .data({ "init-slider": 1 });
        }
      } else {
        // Если слайдер запущен
        if (init == 1) {
          // Разрушаем слайдер и записываем в data init-slider = 0
          $(".second-list").slick("unslick").data({ "init-slider": 0 });
        }
      }
    })
    .trigger("resize");

  $(".seven-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    //centerMode: true,
    //slickCurrentSlide: 7,
    //initialSlide: 6,
    //slide: "7",
    //centerPadding: '40px',
    arrows: true,
    dots: false,
    //autoplay: true,
    //autoplaySpeed: 2000,
    prevArrow:
      '<button type="button" class="slick-prev"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26 7.5L15.3297 18.6151C14.5867 19.389 14.5867 20.6113 15.3297 21.3852L26 32.5" stroke="#1538BA" stroke-width="3" stroke-linecap="round"/></svg></button>',
    nextArrow:
      '<button type="button" class="slick-next"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 32.5L24.6703 21.3849C25.4133 20.611 25.4133 19.3887 24.6703 18.6148L14 7.5" stroke="#1538BA" stroke-width="3" stroke-linecap="round"/></svg></button>',
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          autoplay: true,
          autoplaySpeed: 2000,
          speed: 1500,
        },
      },
    ],
  });

  // // валидация ============================

  $("input[name=phone]").inputmask({
    mask: "+ 7 (999) 999-99-99",
    showMaskOnHover: false,
    oncomplete: function () {
      var value = $(this).val();
      //   $(this).val(value.replace(/(\+)(\s|)(8)/g, "$1$1" + 7))
    },
  });

  $.validator.addMethod("phone", function (value) {
    return (
      /\+\d{1} \([9]\d{2}\) \d{3} \d{4}/.test(value) &&
      !/(\d)\1{4,}/.test(value.replace(/[^\d]/g, ""))
    );
  });

  $.validator.addMethod("email", function (value) {
    return /^[a-zA-Z0-9_.%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(value);
  });

  jQuery.validator.addMethod("NumberMap", function (value, element) {
    let x = 0;
    let duplicatedArray = [...value];
    let results = [];
    let newArr = [];

    duplicatedArray.forEach((el) => {
      if (el !== "-" && el !== "(" && el !== ")" && el !== "+" && el !== " ") {
        newArr.push(el);
      }
    });

    for (let i = 0; i < newArr.length - 1; i++) {
      if (x < 7) {
        if (newArr[i + 1] == newArr[i]) {
          results.push(newArr[i]);
          x++;
        } else {
          x = 0;
        }
      } else {
        return false;
      }
    }

    return true;
  });

  const inputField = document.querySelectorAll("input[name=name]");

  inputField.forEach((el) => {
    el.addEventListener("keypress", function (event) {
      let forbiddenCharacters = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "?",
        "&",
        "`",
        "^",
        "'",
        '"',
        ":",
        ";",
        "-",
        "=",
        "+",
        "-",
        "*",
        "0",
      ];

      let inputValue = event.target.value;
      let inputChar = String.fromCharCode(event.keyCode);

      if (forbiddenCharacters.includes(inputChar)) {
        event.preventDefault();
      }
    });

    inputField.forEach((el) => {
      el.addEventListener("keypress", function (event) {
        let prevVal = "";

        el.addEventListener("beforeinput", (e) => {
          prevVal = el.value;
        });

        // el.addEventListener('input', (e) => {
        //   if (!/^(|[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я\s]*)$/.test(el.value)) {
        //     el.value = prevVal;
        //   }

        // });
      });
    });
  });

  $(".sectionForm").each(function () {
    $(this).validate({
      rules: {
        name: {
          required: true,
          //customName: true,
        },
        phone: {
          required: true,
          phone: true,
          NumberMap: true,
        },
        email: {
          required: true,
          email: true,
        },
        town: {
          required: true,
        },
      },
    });
  });

  // // //---------------ANIMATION============================
  const animItems = document.querySelectorAll("._anim-items");

  if (animItems.length > 0) {
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll(params) {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if (
          pageYOffset > animItemOffset - animItemPoint &&
          pageYOffset < animItemOffset + animItemHeight
        ) {
          animItem.classList.add("_active");
        } else {
          if (!animItem.classList.contains("_no-anim")) {
            animItem.classList.remove("_active");
          }
        }
      }
    }
    animOnScroll();
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  // //---------------STOP ANIMATION============================

  // let yearLend = document.querySelector('.year');
  // var date = new Date();

  //  yearLend.innerHTML = date.getFullYear() + ' ';

  let overflowHidden = document.querySelectorAll(".wrap-slider");
  setTimeout(function () {
    overflowHidden.forEach((el) => {
      el.classList.add("overflow");
    });
    // overflowHidden.classList.add('overflow');
  }, 500);

  //Modal buttons
  $("a[data-fancybox]").click(function () {
    var title = $(this).attr("title");
    $("#modalTitle2").val(title);

    var btntext = $(this).data("bttitle");
    $("#send-check").text(btntext);

    $("#modalsubmit2").val(title);
    $("#modalTitle").text(title);

    if (title != undefined) {
      $("#modaltitle").text(title);
      $("#modaltitle2").val(title);
      $("#modalsubmit2").val(btntext);
    }

    if (btntext != undefined) {
      $("#modalsubmit").text(btntext);
      $("#modaltitle2").val(title);
      $("#modalsubmit2").val(btntext);
    }
  });

  //videos on mobile

  //////////////////////////////////////////////////////////////////////////////////////////////
  ///

  $("[data-fancybox]").fancybox({
    // Простые настройки для мобильных
    mobile: {
      clickContent: "close",
    },

    onInit: function (instance) {
      // При инициализации определяем мобильное устройство
      instance.isMobile = window.innerWidth < 768;
    },

    beforeShow: function (instance, current) {
      if (instance.isMobile) {
        // На мобильных - растягиваем на весь экран
        instance.current.opts.width = "100%";
        instance.current.opts.height = "100%";
        instance.current.opts.autoSize = false;
        instance.current.opts.fitToView = false;
      }
    },

    afterShow: function (instance, current) {
      // Принудительно обновляем размеры после показа
      if (instance.isMobile) {
        setTimeout(function () {
          instance.update();

          // Растягиваем все видео и iframe
          var $content = current.$content;
          $content.find("video, iframe").css({
            width: "100%",
            height: "100%",
            "max-width": "100vw",
            "max-height": "100vh",
          });
        }, 100);
      }
    },
  });
  //////////////////////////////////////////////////////////////////////////////////////////////
  ///
  const swiper = new Swiper(".simple-slider .swiper", {
    // Основные параметры
    direction: "horizontal",
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,

    // Скорость анимации
    speed: 500,

    // Автопрокрутка
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    // Пагинация
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    // Навигация
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  //////////////////////////////////////////////////////////////////////////////////////////////
  ///
});
