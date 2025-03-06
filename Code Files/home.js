// Initialize Swiper Carousel
const initSwiper = () => {
    const swiper = new Swiper('.main-carousel', {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        on: {
            init: function () {
                const lazyImages = document.querySelectorAll('.swiper-lazy');
                lazyImages.forEach(img => {
                    img.classList.add('swiper-lazy-loaded');
                });
            }
        }
    });
};

// Initialize Masonry Grid
const initMasonry = () => {
    const grid = document.querySelector('[data-masonry]');
    if (grid) {
        new Masonry(grid, {
            itemSelector: '.col',
            percentPosition: true,
            transitionDuration: 0
        });
    }
};

// Mobile Menu Handler
const handleMobileMenu = () => {
    const offcanvas = new bootstrap.Offcanvas('#mobileMenu');
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => offcanvas.hide());
    });
};

// Smooth Scroll
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Lazy Load Images
const lazyLoadImages = () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '200px 0px'
    });

    lazyImages.forEach(img => observer.observe(img));
};

// Search Suggestions
const handleSearch = () => {
    const searchInput = document.querySelector('.search-form input');
    const suggestions = document.querySelector('.search-suggestions');

    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        if (value.length > 2) {
            suggestions.classList.add('show');
        } else {
            suggestions.classList.remove('show');
        }
    });
};

// Scroll Effects
const handleScroll = () => {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
};

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initSwiper();
    initMasonry();
    handleMobileMenu();
    initSmoothScroll();
    lazyLoadImages();
    handleSearch();
    handleScroll();
});

// Resize Handler
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});