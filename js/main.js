/**
 * RR Computers - Main JavaScript
 * Handles Mobile Menu, Accordions, Sticky Header, etc.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStickyHeader();
  initAccordions();
  initSmoothScroll();
});

/* Mobile Menu Toggle */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileNav.classList.toggle('active');
      
      // Toggle icon if needed (using Material Symbols usually implies text content change, but assuming simple toggle for now)
      // menuBtn.textContent = isExpanded ? 'menu' : 'close'; 
    });
  }
}

/* Sticky Header Effect */
function initStickyHeader() {
  const header = document.querySelector('.header');
  /* CSS position: sticky or fixed handles most, but we might want shadow on scroll */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* Generic Accordion */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-header');
  
  accordions.forEach(acc => {
    acc.addEventListener('click', () => {
      const content = acc.nextElementSibling;
      const isActive = acc.classList.contains('active');
      
      // Close all others (optional - can be toggle behavior)
      // document.querySelectorAll('.accordion-header').forEach(h => {
      //   h.classList.remove('active');
      //   h.nextElementSibling.style.maxHeight = null;
      // });

      if (!isActive) {
        acc.classList.add('active');
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add('open');
      } else {
        acc.classList.remove('active');
        content.style.maxHeight = null;
        content.classList.remove('open');
      }
    });
  });
}

/* Smooth Scroll for Anchors */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }

        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}
