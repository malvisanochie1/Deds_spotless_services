/* -------------------------------------------

Name:         Cleandy
Version:      1.0
Developer:    Nazar Miller (millerDigitalDesign)
Portfolio:    https://themeforest.net/user/millerdigitaldesign/portfolio?ref=MillerDigitalDesign

p.s. I am available for Freelance hire (UI design, web development). email: miller.themes@gmail.com

------------------------------------------- */




document.addEventListener("DOMContentLoaded", function () {

  "use strict";


  const WHATSAPP_NUMBER = "+2348131652852";

  // Custom Select Functionality
  const selectButton = document.querySelector('.mil-select-button');
  const dropdown = document.querySelector('.mil-select-dropdown');

  if (selectButton && dropdown) {
    const selectedValueSpan = selectButton.querySelector('.mil-selected-value');
    const radioButtons = dropdown.querySelectorAll('input[type="radio"]');

    if (selectedValueSpan && radioButtons.length > 0) {
      // Toggle dropdown
      selectButton.addEventListener('click', function() {
        dropdown.classList.toggle('show');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!selectButton.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.remove('show');
        }
      });

      // Handle option selection
      radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
          if (this.checked) {
            selectedValueSpan.textContent = this.value;
            dropdown.classList.remove('show');
          }
        });
      });
    }
  }


  // Phone number formatting
  document.getElementById('user-phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.startsWith('234')) {
      value = value.substring(3);
    }

    if (value.length >= 10) {
      const formatted = `+234 (${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 8)}-${value.substring(8, 10)}`;
      e.target.value = formatted;
    }
  });

  // Form submission handler
  document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const phone = document.getElementById('user-phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Get selected service
    const selectedService = document.querySelector('input[name="select"]:checked');
    const service = selectedService ? selectedService.value : '';

    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => {
      error.style.display = 'none';
    });

    // Validate form
    let isValid = true;

    if (!name) {
      document.getElementById('name-error').style.display = 'block';
      isValid = false;
    }

    if (!email || !isValidEmail(email)) {
      document.getElementById('email-error').style.display = 'block';
      isValid = false;
    }

    if (!phone) {
      document.getElementById('phone-error').style.display = 'block';
      isValid = false;
    }

    if (!service) {
      document.getElementById('service-error').style.display = 'block';
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Create WhatsApp message
    const whatsappMessage = `🏠 *New Service Request*

👤 *Customer Details:*
• Name: ${name}
• Email: ${email}
• Phone: ${phone}

🛠️ *Service Requested:*
• ${service}

💬 *Message:*
${message || 'No additional message provided'}

---
Please contact me to discuss the service details and scheduling. Thank you!`;

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Show success message
    showSuccessMessage();

    // Optional: Reset form after successful submission
    // this.reset();
    // selectedValueSpan.textContent = 'Services';
  });

  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Success message function
  function showSuccessMessage() {
    const button = document.querySelector('.mil-btn');
    const originalText = button.innerHTML;

    button.innerHTML = '<i class="fas fa-check"></i> Sent to WhatsApp!';
    button.style.background = '#28a745';

    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = 'linear-gradient(135deg, #25d366, #128c7e)';
    }, 3000);
  }




  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  /* -------------------------------------------

    preloader

    ------------------------------------------- */

  const initPreloader = () => {
    let preloaderPercent = document.querySelector(".mil-percent");
    let preloaderLine = document.querySelector(".mil-preload-line");
    let preloader = document.querySelector(".mil-preloader-frame");
    let progress = 0;

    function updatePreloader() {
      if (progress <= 100) {
        preloaderPercent.textContent = progress;
        preloaderLine.style.width = progress + "%";
        progress += 10;
      } else {
        clearInterval(preloaderInterval);
        setTimeout(() => {
          preloader.classList.add("mil-complete");
        }, 500); // Затримка в пів секунди перед додаванням класу
      }
    }

    let preloaderInterval = setInterval(updatePreloader, 100);
  };

  // Додаємо затримку в пів секунди перед запуском initPreloader
  setTimeout(initPreloader, 500);
  /* -------------------------------------------

    page transitions

    ------------------------------------------- */
  const options = {
    containers: ["#swupMain", "#swupMenu"],
    animateHistoryBrowsing: true,
    linkSelector: 'a:not([data-no-swup]):not([href^="#"])',
    plugins: [new SwupBodyClassPlugin()],
  };

  const swup = new Swup(options);

  /* -------------------------------------------

    smooth scroll

    ------------------------------------------- */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  /* -------------------------------------------

    menu

    ------------------------------------------- */
  const menuBtn = document.querySelector(".mil-menu-btn");
  const mainMenu = document.querySelector(".mil-main-menu");
  const topPanel = document.querySelector(".mil-top-panel");
  const menuLinks = document.querySelectorAll(".mil-main-menu a");

  if (menuBtn && mainMenu) {
    menuBtn.addEventListener("click", function () {
      menuBtn.classList.toggle("mil-active");
      mainMenu.classList.toggle("mil-active");
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (menuBtn && mainMenu) {
        menuBtn.classList.remove("mil-active");
        mainMenu.classList.remove("mil-active");
      }
    });
  });

  window.addEventListener("scroll", function () {
    if (mainMenu && topPanel) {
      if (window.scrollY > 10) {
        mainMenu.classList.add("mil-scroll");
        topPanel.classList.add("mil-scroll");
      } else {
        mainMenu.classList.remove("mil-scroll");
        topPanel.classList.remove("mil-scroll");
      }
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          parseFloat(getComputedStyle(document.documentElement).fontSize) * 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  /* -------------------------------------------

    right buttons

    ------------------------------------------- */
  const milRightButtonsFrame = document.querySelector(
    ".mil-right-buttons-frame"
  );
  const milOpenWindow = document.querySelector(".mil-open-window");
  const milOrderCallWindow = document.querySelector(".mil-order-call-window");
  const milBackToTop = document.querySelector(".mil-back-to-top");

  if (milRightButtonsFrame && milBackToTop) {
    window.addEventListener("scroll", function () {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop + windowHeight >= documentHeight - 100) {
        milRightButtonsFrame.classList.add("mil-on-bottom");
      } else {
        milRightButtonsFrame.classList.remove("mil-on-bottom");
      }

      if (scrollTop >= 200) {
        milBackToTop.classList.add("mil-active");
      } else {
        milBackToTop.classList.remove("mil-active");
      }
    });
  }

  if (milOpenWindow && milOrderCallWindow) {
    milOpenWindow.addEventListener("click", function () {
      this.classList.toggle("mil-active");
      milOrderCallWindow.classList.toggle("mil-active");
    });
  }

  /* -------------------------------------------

    sliders

    ------------------------------------------- */
  const initSliders = () => {
    const reviewsSliderEl = document.querySelector(".mil-reviews-slider");
    const teamSliderEl = document.querySelector(".mil-team-slider");

    if (reviewsSliderEl) {
      const menu = [
        '<div class="mil-custom-dot mil-slide-1"></div>',
        '<div class="mil-custom-dot mil-slide-2"></div>',
        '<div class="mil-custom-dot mil-slide-3"></div>',
        '<div class="mil-custom-dot mil-slide-4"></div>',
        '<div class="mil-custom-dot mil-slide-5"></div>',
        '<div class="mil-custom-dot mil-slide-6"></div>',
        '<div class="mil-custom-dot mil-slide-7"></div>',
      ];

      new Swiper(reviewsSliderEl, {
        pagination: {
          el: ".mil-revi-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + menu[index] + "</span>";
          },
        },
        speed: 800,
        effect: "fade",
        parallax: true,
        navigation: {
          nextEl: ".mil-revi-next",
          prevEl: ".mil-revi-prev",
        },
      });
    }

    if (teamSliderEl) {
      new Swiper(teamSliderEl, {
        spaceBetween: 15,
        slidesPerView: 2,
        loop: true,
        speed: 5000,
        autoplay: {
          delay: 0,
        },
        freeMode: true,
        breakpoints: {
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 7,
          },
        },
      });
    }
  };

  initSliders();

  /* -------------------------------------------

    scroll animation

    ------------------------------------------- */
  const initScrollAnimations = () => {
    const animateSections = (selector, animationProps, scrollTriggerConfig) => {
      document.querySelectorAll(selector).forEach((section) => {
        const props = animationProps(section);
        const config = scrollTriggerConfig(section);
        gsap.fromTo(section, props.from, {
          ...props.to,
          scrollTrigger: config,
        });
      });
    };

    // Fade In Animation
    animateSections(
      ".mil-up",
      () => ({
        from: {
          opacity: 0,
          y: 60,
          ease: "sine",
        },
        to: {
          opacity: 1,
          y: 0,
        },
      }),
      (section) => ({
        trigger: section,
        toggleActions: "play none none reverse",
      })
    );

    // Parallax Animation
    animateSections(
      ".mil-parallax-img",
      (section) => ({
        from: {
          y: section.getAttribute("data-value-1"),
          ease: "sine",
        },
        to: {
          y: section.getAttribute("data-value-2"),
        },
      }),
      (section) => ({
        trigger: section,
        scrub: true,
        toggleActions: "play none none reverse",
      })
    );

    // Rotate Animation
    animateSections(
      ".mil-rotate",
      (section) => ({
        from: {
          rotate: 0,
          ease: "sine",
        },
        to: {
          rotate: section.getAttribute("data-value"),
        },
      }),
      (section) => ({
        trigger: section,
        scrub: true,
        toggleActions: "play none none reverse",
      })
    );

    // Scale Animation
    animateSections(
      ".mil-scale-img",
      (section) => ({
        from: {
          scale: section.getAttribute("data-value-1"),
          ease: "sine",
        },
        to: {
          scale: section.getAttribute("data-value-2"),
        },
      }),
      (section) => ({
        trigger: section,
        scrub: true,
        toggleActions: "play none none reverse",
      })
    );

    // Scale Animation with Y offset
    animateSections(
      ".mil-scale-img-2",
      (section) => ({
        from: {
          y: "-130",
          scale: section.getAttribute("data-value-1"),
          ease: "sine",
        },
        to: {
          y: "0",
          scale: section.getAttribute("data-value-2"),
        },
      }),
      (section) => ({
        trigger: section,
        end: "top top+=120",
        scrub: true,
        toggleActions: "play none none reverse",
      })
    );

    // Scale Animation starting from top offset
    animateSections(
      ".mil-scale-img-top",
      (section) => ({
        from: {
          scale: section.getAttribute("data-value-1"),
          ease: "sine",
        },
        to: {
          scale: section.getAttribute("data-value-2"),
        },
      }),
      (section) => ({
        trigger: section,
        scrub: true,
        start: "top top+=120",
        toggleActions: "play none none reverse",
      })
    );

    // Counter Animation
    document.querySelectorAll(".mil-counter").forEach((element) => {
      const zero = {
        val: 0,
      };
      const num = parseFloat(element.dataset.number);
      const decimals = num.toString().split(".")[1]?.length || 0;

      gsap.to(zero, {
        val: num,
        duration: 1.8,
        scrollTrigger: {
          trigger: element,
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          element.textContent = zero.val.toFixed(decimals);
        },
      });
    });
  };

  initScrollAnimations();

  /* -------------------------------------------

    accordion

    ------------------------------------------- */
  const initAccordion = () => {
    const accordions = document.querySelectorAll(".mil-accordion");

    accordions.forEach((button) => {
      button.addEventListener("click", () => {
        const panel = button.nextElementSibling;
        const icon = button.querySelector(".mil-icon");

        accordions.forEach((otherButton) => {
          if (otherButton !== button) {
            otherButton.classList.remove("mil-active");
            if (otherButton.querySelector(".mil-icon")) {
              otherButton.querySelector(".mil-icon").textContent = "+";
            }
            if (otherButton.nextElementSibling) {
              otherButton.nextElementSibling.style.maxHeight = null;
            }
          }
        });

        button.classList.toggle("mil-active");
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          icon.textContent = "+";
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          icon.textContent = "−";
        }

        ScrollTrigger.refresh();
      });
    });
  };

  initAccordion();

  /* -------------------------------------------

    popup

    ------------------------------------------- */
  let popupClicked = false;

  const initPopup = () => {
    const callPopupButton = document.querySelector(".mil-call-popup");
    const closePopupButton = document.querySelector(".mil-close-popup");
    const discountPopup = document.querySelector(".mil-discount-popup");

    if (callPopupButton && discountPopup) {
      callPopupButton.addEventListener("click", function () {
        discountPopup.classList.add("mil-active");
        popupClicked = true;
      });
    }

    if (closePopupButton && discountPopup) {
      closePopupButton.addEventListener("click", function () {
        discountPopup.classList.remove("mil-active");
      });
    }
  };

  initPopup();

  setTimeout(function () {
    document.querySelector(".mil-discount-popup").classList.add("mil-active");
  }, 20000);

  /* -------------------------------------------

    forms

    ------------------------------------------- */

  const initForms = () => {
    var phoneInputs = document.querySelectorAll(".mil-phone-input");

    phoneInputs.forEach(function (phoneInput) {
      var cleave = new Cleave(phoneInput, {
        delimiters: ["(", ")", "-", "-"],
        blocks: [4, 3, 3, 2, 2],
        prefix: "+234",
        numericOnly: true,
        noImmediatePrefix: true,
      });

      phoneInput.addEventListener("focus", function () {
        if (phoneInput.value === "") {
          phoneInput.value = "+234";
        }
      });

      phoneInput.addEventListener("blur", function () {
        if (phoneInput.value === "+234" || phoneInput.value === "+234(") {
          phoneInput.value = "";
        }
      });
    });
  };
  initForms();

  /* -------------------------------------------

    custom select

    ------------------------------------------- */
  const initSelect = () => {
    document.querySelectorAll(".mil-custom-select").forEach((customSelect) => {
      const selectBtn = customSelect.querySelector(".mil-select-button");
      const selectedValue = customSelect.querySelector(".mil-selected-value");
      const optionsList = customSelect.querySelectorAll(
        ".mil-select-dropdown li"
      );

      if (selectBtn && selectedValue && optionsList.length > 0) {
        selectBtn.addEventListener("click", () => {
          customSelect.classList.toggle("mil-active");
        });

        optionsList.forEach((option) => {
          function handler(e) {
            if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
              selectedValue.textContent = option.children[1].textContent;
              customSelect.classList.remove("mil-active");
              if (!selectedValue.classList.contains("mil-selected")) {
                selectedValue.classList.add("mil-selected");
              }
            }
            if (e.key === "Enter") {
              selectedValue.textContent = option.textContent;
              customSelect.classList.remove("mil-active");
              if (!selectedValue.classList.contains("mil-selected")) {
                selectedValue.classList.add("mil-selected");
              }
            }
          }
          option.addEventListener("keyup", handler);
          option.addEventListener("click", handler);
        });
      }
    });
  };
  initSelect();

  /* -------------------------------------------

    before/after

    ------------------------------------------- */
  const initBF = () => {
    var subject = document.querySelector(".mil-before-and-after");
    var scraper = document.querySelector(".mil-subject-scraper");
    var after = document.querySelector(".mil-subject-after");

    if (!subject || !scraper || !after) return;

    var distance = (window.innerWidth - subject.clientWidth) / 2;
    window.onresize = recalculateDistance;
    var px = 0;
    var touches = [];

    subject.addEventListener("mousemove", dragScraper, false);
    subject.addEventListener("touchmove", dragScraper, false);

    function recalculateDistance() {
      distance = (window.innerWidth - subject.clientWidth) / 2;
    }

    function dragScraper(event) {
      px = event.clientX - distance;

      if (px == null) {
        touches = event.touches;
        px = touches[0].clientX - distance;
      }
      if (px < 0) {
        px = 0;
      }
      scraper.style.transform = "translate(" + px + "px, 0)";
      after.style.transform = "translate(-" + px + "px, 0)";
    }
  };

  initBF();

  /* -------------------------------------------

    fancybox

    ------------------------------------------- */
  const initFancybox = () => {
    const galleryItems = document.querySelectorAll('[data-fancybox="gallery"]');

    Fancybox.defaults.Hash = false;

    Fancybox.bind('[data-fancybox="gallery"]', {
      loop: true,
      toolbar: true,
      buttons: ["zoom", "close"],
    });
  };

  initFancybox();

  /*----------------------------------------------------------
    ------------------------------------------------------------

    REINIT

    ------------------------------------------------------------
    ----------------------------------------------------------*/
  document.addEventListener("swup:contentReplaced", function () {
    window.scrollTo(0, 0);
    lenis.scrollTo(0, {
      immediate: true,
    });
    /* -------------------------------------------

        menu

        ------------------------------------------- */
    const menuBtn = document.querySelector(".mil-menu-btn");
    const mainMenu = document.querySelector(".mil-main-menu");
    const menuLinks = document.querySelectorAll(".mil-main-menu a");

    function toggleMenu() {
      menuBtn.classList.toggle("mil-active");
      mainMenu.classList.toggle("mil-active");
    }

    menuLinks.forEach((link) => {
      link.addEventListener("click", toggleMenu);
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offsetPosition =
            targetElement.getBoundingClientRect().top +
            window.scrollY -
            parseFloat(getComputedStyle(document.documentElement).fontSize) *
              20;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });
    initAccordion();
    initSliders();
    initScrollAnimations();
    initPopup();
    initForms();
    initSelect();
    initBF();
    initFancybox();
    ScrollTrigger.refresh();
  });
});

//   window.addEventListener('load', () => {
//     const preloader = document.querySelector('.mil-preloader-frame');
//     preloader.style.transition = 'opacity 0.5s ease';
//     preloader.style.opacity = 0;
//     setTimeout(() => {
//       preloader.remove();
//     }, 500);
//   });


//   const percentText = document.querySelector(".mil-percent");
//   const preloader = document.querySelector(".mil-preloader-frame");
//   let current = 0;

//   const loadingInterval = setInterval(() => {
//     if (current < 100) {
//       current++;
//       percentText.textContent = current.toString().padStart(2, '0');
//     }
//   }, 20);

//   window.addEventListener('load', () => {
//     clearInterval(loadingInterval);
//     percentText.textContent = "100";

//     // ✅ Only affect the preloader
//     preloader.classList.add('hidden');

//     setTimeout(() => {
//       preloader.remove();
//     }, 500); // match transition duration
//   });


   // Wait until DOM is loaded
   document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a");

    links.forEach(link => {
      link.addEventListener("click", function (e) {
        const href = link.getAttribute("href");

        // Ignore if it's an anchor (#), or JavaScript:void(0), or external link
        if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

        // Show preloader
        document.querySelector(".preloader").style.display = "block";

        // Optional: delay navigation slightly for preloader to be visible
        e.preventDefault();
        setTimeout(() => {
          window.location.href = href;
        }, 100); // Delay as needed for animation
      });
    });
  });
