//POP UP

document.addEventListener("DOMContentLoaded", () => {
  const introText = document.querySelector('.intro-text p');
  if (introText) {
    const text = introText.innerHTML.trim();
    const lines = text.split(/<br\s*\/?>/i);
    introText.innerHTML = ''; 

    lines.forEach((line, i) => {
      const span = document.createElement('span');
      span.innerHTML = line.trim();
      span.style.display = 'block';
      span.style.opacity = 0;
      span.style.transform = 'translateY(-20px)'; 
      span.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      introText.appendChild(span);

      setTimeout(() => {
        span.style.opacity = 1;
        span.style.transform = 'translateY(0)';  
      }, i * 500);  
    });
  }

  // --- Image popup on click ---
  const images = document.querySelectorAll(".project-hero-image, .image-in-box");

  images.forEach(image => {
    image.addEventListener("click", () => {
      const popup = document.createElement("div");
      Object.assign(popup.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "9999"
      });

      const imgContainer = document.createElement("div");
      if (image.classList.contains("image-in-box")) {
        Object.assign(imgContainer.style, {
          backgroundColor: "#F7F7F7",
          padding: "10px",
          borderRadius: "4px",
          display: "inline-block"
        });
      }

      const popupImage = document.createElement("img");
      popupImage.src = image.src;
      popupImage.alt = image.alt || "";
      Object.assign(popupImage.style, {
        maxWidth: "90%",
        maxHeight: "90%",
        display: "block"
      });

      imgContainer.appendChild(popupImage);
      popup.appendChild(imgContainer);

      popup.addEventListener("click", () => popup.remove());
      document.body.appendChild(popup);
    });
  });

  // NAV HIGHLIGHT
  const nav = document.querySelector(".nav-links");
  if (!nav) return; 

  const links = nav.querySelectorAll("a");
  let currentActive = null;
  let allowAnimation = true;

  function updateHighlight(link, animate = true) {
    const linkRect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const offsetX = linkRect.left - navRect.left;
    const width = linkRect.width;

    if (currentActive && currentActive !== link && animate) {
      const currentIndex = Array.from(links).indexOf(currentActive);
      const newIndex = Array.from(links).indexOf(link);

      nav.classList.remove('slide-left', 'slide-right', 'animate');
      void nav.offsetWidth; 

      nav.classList.add(newIndex > currentIndex ? 'slide-right' : 'slide-left');
      nav.classList.add('animate');
    } else {
      nav.classList.remove('animate');
    }

    nav.style.setProperty("--highlight-x", `${offsetX}px`);
    nav.style.setProperty("--highlight-width", `${width}px`);
    currentActive = link;
  }

  function setInitialActive() {
    const currentPath = window.location.pathname.split('/').pop().toLowerCase();
    links.forEach(link => {
      const href = link.getAttribute("href").toLowerCase();
      if (currentPath === href || (currentPath === "" && href === "work.html")) {
        link.classList.add("active-button");
        updateHighlight(link, false);
      }
    });

    const blurbLines = document.querySelectorAll('.blurb-line');
    blurbLines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('visible');
      }, 300 + index * 250);
    });
  }

  function handleLinkClick(e) {
    if (!allowAnimation) return;

    const targetLink = e.currentTarget;

    if (targetLink !== currentActive) {
      e.preventDefault();

      links.forEach(link => link.classList.remove("active-button"));
      targetLink.classList.add("active-button");
      updateHighlight(targetLink, true);

      setTimeout(() => {
        allowAnimation = false;
        window.location.href = targetLink.href;
      }, 300);
    }
  }

  setInitialActive();
  links.forEach(link => link.addEventListener("click", handleLinkClick));

  setTimeout(() => {
    allowAnimation = true;
  }, 100);

  window.addEventListener("resize", () => {
    const active = nav.querySelector(".active-button");
    if (active) updateHighlight(active, false);
  });

  const logo = document.getElementById('logo');
  if (logo) {
    const staticSrc = logo.src;
    const gifSrc = staticSrc.replace('Logo.png', 'Logo.gif');

    logo.addEventListener('mouseenter', () => {
      logo.src = gifSrc;
    });

    logo.addEventListener('mouseleave', () => {
      logo.src = staticSrc;
    });
  }

  // --- BACK TO TOP BUTTON ---
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

//CAROUSEL FOR BBM NEWSLETTERS

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.textbox-style-2').forEach(container => {
    const carousel = container.querySelector('.carousel');
    const imagesWrapper = container.querySelector('.carousel-images');
    const dotsContainer = container.querySelector('.carousel-dots');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');

    // Safety check to skip incomplete carousels
    if (!carousel || !imagesWrapper || !dotsContainer) {
      console.warn('Skipping: missing carousel structure in one of the containers.');
      return;
    }

    const slides = imagesWrapper.querySelectorAll('.carousel-img');
    if (!slides.length) {
      console.warn('Skipping: no images found inside carousel-images.');
      return;
    }

    let currentIndex = 0;

    // Ensure only the first image is active initially
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === 0);
    });

    // Create dot indicators
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');

      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });

      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function updateCarousel() {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function changeSlide(direction) {
      currentIndex = (currentIndex + direction + slides.length) % slides.length;
      updateCarousel();
    }

    // Attach event listeners to nav buttons
    if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));

    updateCarousel();
  });
});

