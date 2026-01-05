/**
 * ZipShift - Animations Module
 * Handles scroll animations, page interactions, and visual effects
 */

const PageAnimations = {
    /**
         * Initialize all animations
     */
    init() {
          this.setupIntersectionObserver();
          this.setupSmoothScroll();
          this.setupButtonEffects();
    },

    /**
         * Setup Intersection Observer for scroll animations
     */
    setupIntersectionObserver() {
          const observerOptions = {
                  threshold: 0.1,
                  rootMargin: '0px 0px -100px 0px',
          };

      const observer = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                                    entry.target.classList.add('animated');
                                    observer.unobserve(entry.target);
                        }
              });
      }, observerOptions);

      // Observe all sections and cards
      document.querySelectorAll(
              '.section-title, .problem-card, .pricing-card, .step, .feature-list li'
            ).forEach((el) => {
              observer.observe(el);
      });
    },

    /**
         * Setup smooth scroll for navigation links
     */
    setupSmoothScroll() {
          document.querySelectorAll('a[href^="#"]').forEach((link) => {
                  link.addEventListener('click', (e) => {
                            e.preventDefault();
                            const targetId = link.getAttribute('href');
                            const targetElement = document.querySelector(targetId);

                                                if (targetElement) {
                                                            targetElement.scrollIntoView({
                                                                          behavior: 'smooth',
                                                                          block: 'start',
                                                            });

                              // Track navigation
                              trackEvent('navigation_click', {
                                            target: targetId,
                                            text: link.textContent,
                              });
                                                }
                  });
          });
    },

    /**
         * Setup button hover effects
     */
    setupButtonEffects() {
          const buttons = document.querySelectorAll('.cta-button');

      buttons.forEach((button) => {
              button.addEventListener('mouseenter', (e) => {
                        // Create ripple effect
                                              const ripple = document.createElement('span');
                        ripple.className = 'ripple';
                        button.appendChild(ripple);

                                              // Remove ripple after animation
                                              setTimeout(() => ripple.remove(), 600);
              });

                            button.addEventListener('click', (e) => {
                                      // Track button clicks
                                                            trackEvent('cta_click', {
                                                                        button_text: button.textContent,
                                                                        button_location: this.getElementLocation(button),
                                                            });
                            });
      });
    },

    /**
         * Get element location on page
     */
    getElementLocation(element) {
          const rect = element.getBoundingClientRect();
          return {
                  section: element.closest('section')?.className || 'unknown',
                  x: Math.round(rect.left),
                  y: Math.round(rect.top),
          };
    },

    /**
         * Scroll to element with offset
     */
    scrollToElement(selector, offset = 100) {
          const element = document.querySelector(selector);
          if (!element) return;

      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
                  top: elementPosition - offset,
                  behavior: 'smooth',
          });
    },

    /**
         * Add fade-in animation to elements
     */
    fadeInElements(selector, stagger = 0.1) {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el, index) => {
                  el.style.opacity = '0';
                  el.style.animation = `fadeIn 0.6s ease forwards`;
                  el.style.animationDelay = `${index * stagger}s`;
          });
    },

    /**
         * Parallax scroll effect
     */
    setupParallax() {
          const parallaxElements = document.querySelectorAll('[data-parallax]');

      window.addEventListener('scroll', () => {
              parallaxElements.forEach((el) => {
                        const speed = el.dataset.parallax || 0.5;
                        const yPos = window.scrollY * speed;
                        el.style.transform = `translateY(${yPos}px)`;
              });
      });
    },

    /**
         * Count up animation for statistics
     */
    animateCounter(element, target, duration = 2000) {
          const start = 0;
          const startTime = Date.now();

      const updateCounter = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const currentValue = Math.floor(progress * target);

              element.textContent = currentValue.toLocaleString();

              if (progress < 1) {
                        requestAnimationFrame(updateCounter);
              }
      };

      updateCounter();
    },

    /**
         * Sticky header scroll effect
     */
    setupStickyHeader() {
          const nav = document.querySelector('nav');
          let lastScrollY = 0;

      window.addEventListener('scroll', () => {
              const currentScrollY = window.scrollY;

                                    if (currentScrollY > 100) {
                                              nav.classList.add('scrolled');
                                    } else {
                                              nav.classList.remove('scrolled');
                                    }

                                    lastScrollY = currentScrollY;
      });
    },

    /**
         * Lazy load images
     */
    setupLazyLoading() {
          if ('IntersectionObserver' in window) {
                  const imageObserver = new IntersectionObserver((entries, observer) => {
                            entries.forEach((entry) => {
                                        if (entry.isIntersecting) {
                                                      const img = entry.target;
                                                      img.src = img.dataset.src;
                                                      img.classList.add('loaded');
                                                      observer.unobserve(img);
                                        }
                            });
                  });

            document.querySelectorAll('img[data-src]').forEach((img) => {
                      imageObserver.observe(img);
            });
          }
    },

    /**
         * Accordion/collapse animations
     */
    setupAccordion(selector) {
          const accordions = document.querySelectorAll(selector);

      accordions.forEach((accordion) => {
              const header = accordion.querySelector('.accordion-header');
              const body = accordion.querySelector('.accordion-body');

                               header.addEventListener('click', () => {
                                         accordion.classList.toggle('active');

                                                               if (accordion.classList.contains('active')) {
                                                                           body.style.maxHeight = body.scrollHeight + 'px';
                                                               } else {
                                                                           body.style.maxHeight = '0';
                                                               }
                               });
      });
    },
};

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    PageAnimations.init();
    PageAnimations.setupStickyHeader();
    PageAnimations.setupLazyLoading();
});
