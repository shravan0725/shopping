/* ============================================
   ANIMATIONS & MICRO-INTERACTIONS
   ============================================ */

class AnimationManager {
    constructor() {
        this.initIntersectionObserver();
        this.initScrollEffects();
        this.initTrendingSlider();
        this.initSmoothScroll();
    }

    // Intersection Observer for fade-in animations
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all product cards and section headers
        document.querySelectorAll('.product-card, .category-card, .section-header').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // Navbar scroll effect
    initScrollEffects() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;
        let scrollTimeout;

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;

            // Add scrolled class
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (scrollTimeout) clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up or at top
                    navbar.style.transform = 'translateY(0)';
                }
                lastScrollTop = scrollTop;
            }, 100);
        }, { passive: true });

        // Add transition to navbar
        navbar.style.transition = 'transform 0.3s ease';
    }

    // Trending slider functionality
    initTrendingSlider() {
        const prevBtn = document.querySelector('.slider-control.prev');
        const nextBtn = document.querySelector('.slider-control.next');
        const sliderTrack = document.querySelector('.slider-track');
        const sliderContainer = document.querySelector('.slider-container');

        if (!prevBtn || !nextBtn || !sliderTrack) return;

        const cardWidth = 280 + 16; // Card width + gap
        let currentScroll = 0;

        const updateSliderPosition = () => {
            sliderTrack.style.transform = `translateX(-${currentScroll}px)`;
        };

        prevBtn.addEventListener('click', () => {
            currentScroll = Math.max(0, currentScroll - cardWidth);
            updateSliderPosition();
            this.updateSliderButtons(prevBtn, nextBtn, sliderTrack, cardWidth);
        });

        nextBtn.addEventListener('click', () => {
            const maxScroll = sliderTrack.scrollWidth - sliderContainer.clientWidth;
            currentScroll = Math.min(maxScroll, currentScroll + cardWidth);
            updateSliderPosition();
            this.updateSliderButtons(prevBtn, nextBtn, sliderTrack, cardWidth);
        });

        // Touch support for slider
        let touchStartX = 0;
        let touchDiff = 0;

        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        sliderContainer.addEventListener('touchmove', (e) => {
            touchDiff = touchStartX - e.touches[0].clientX;
        }, { passive: true });

        sliderContainer.addEventListener('touchend', () => {
            if (Math.abs(touchDiff) > 50) {
                if (touchDiff > 0) {
                    nextBtn.click();
                } else {
                    prevBtn.click();
                }
            }
        }, { passive: true });

        this.updateSliderButtons(prevBtn, nextBtn, sliderTrack, cardWidth);
    }

    updateSliderButtons(prevBtn, nextBtn, sliderTrack, cardWidth) {
        const sliderContainer = document.querySelector('.slider-container');
        const currentScroll = Math.abs(parseFloat(sliderTrack.style.transform.match(/\d+/)?.[0] || 0));
        const maxScroll = sliderTrack.scrollWidth - sliderContainer.clientWidth;

        prevBtn.style.opacity = currentScroll === 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentScroll === 0 ? 'none' : 'auto';

        nextBtn.style.opacity = currentScroll >= maxScroll - 10 ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentScroll >= maxScroll - 10 ? 'none' : 'auto';
    }

    // Smooth scroll for navigation links
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const element = document.querySelector(href);
                
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        document.querySelector('.hamburger').classList.remove('active');
                    }
                }
            });
        });
    }
}

// Parallax Effect for Hero Section
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.gradient = document.querySelector('.hero-gradient');
        this.floatingCards = document.querySelectorAll('.floating-card');

        if (this.hero) {
            window.addEventListener('scroll', () => this.updateParallax(), { passive: true });
        }
    }

    updateParallax() {
        const scrollPosition = window.scrollY;
        const heroBottom = this.hero.offsetTop + this.hero.offsetHeight;

        if (scrollPosition < heroBottom) {
            const offset = scrollPosition * 0.5;
            this.gradient.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;

            this.floatingCards.forEach((card, index) => {
                const speed = 0.3 + (index * 0.1);
                card.style.transform = `translateY(${offset * speed}px)`;
            });
        }
    }
}

// Product Interaction Effects
class ProductInteractions {
    constructor() {
        this.init();
    }

    init() {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const image = card.querySelector('.product-image');
            const cartBtn = card.querySelector('.product-cart-btn');

            // Image zoom on hover
            card.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.08)';
            });

            card.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
            });

            // Button hover effect
            cartBtn.addEventListener('mouseenter', () => {
                cartBtn.style.transform = 'translateY(-2px)';
            });

            cartBtn.addEventListener('mouseleave', () => {
                cartBtn.style.transform = 'translateY(0)';
            });
        });
    }
}

// Newsletter Form Validation & Animation
class NewsletterForm {
    constructor() {
        this.form = document.getElementById('newsletterForm');
        
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const input = this.form.querySelector('input');
        const email = input.value;

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            this.showSuccess();
            input.value = '';
        } else {
            this.showError();
        }
    }

    showSuccess() {
        const btn = this.form.querySelector('button');
        const originalText = btn.textContent;

        btn.textContent = '✓ Subscribed!';
        btn.style.background = 'linear-gradient(135deg, #34a853 0%, #2d7d4a 100%)';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
    }

    showError() {
        const input = this.form.querySelector('input');
        input.style.borderColor = '#f5576c';
        input.style.animation = 'shake 0.5s ease';

        setTimeout(() => {
            input.style.borderColor = '';
            input.style.animation = '';
        }, 500);
    }
}

// Add shake animation for error
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(errorStyles);

// Loading State Management
class LoadingState {
    constructor() {
        this.initSkeletonLoaders();
    }

    initSkeletonLoaders() {
        // Simulate data loading with skeleton screens
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelectorAll('.skeleton-loader').forEach(el => {
                    el.style.backgroundImage = 'none';
                    el.style.background = el.getAttribute('data-bg') || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                });
            }, 500);
        });
    }
}

// Page Transition Effects
class PageTransitions {
    constructor() {
        this.init();
    }

    init() {
        // Fade in animation for page
        document.addEventListener('DOMContentLoaded', () => {
            document.body.style.animation = 'fadeIn 0.6s ease';
        });

        // Link click animations
        document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.hostname === window.location.hostname) {
                    e.preventDefault();
                    document.body.style.animation = 'fadeOut 0.3s ease';

                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 300);
                }
            });
        });
    }
}

// Fade animations for page transitions
const transitionStyles = document.createElement('style');
transitionStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(transitionStyles);

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
    new ParallaxEffect();
    new ProductInteractions();
    new NewsletterForm();
    new LoadingState();
    new PageTransitions();
});
