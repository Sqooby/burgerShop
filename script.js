// ================================================
// BURGER SHOP - Interactive Features
// ================================================

// Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initSmoothScroll();
    initFormHandling();
    initParticles();
});

// ================================================
// BURGER CAROUSEL
// ================================================

function initCarousel() {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselArrowLeft = document.querySelector('.carousel-arrow-left');
    const carouselArrowRight = document.querySelector('.carousel-arrow-right');
    const burgerThumbs = document.querySelectorAll('.burger-thumb');
    const mainBurgerImage = document.querySelector('.main-burger');

    if (!carouselTrack || !carouselArrowLeft || !carouselArrowRight) return;

    // Scroll carousel left
    carouselArrowLeft.addEventListener('click', () => {
        carouselTrack.scrollBy({
            left: -150,
            behavior: 'smooth'
        });
    });

    // Scroll carousel right
    carouselArrowRight.addEventListener('click', () => {
        carouselTrack.scrollBy({
            left: 150,
            behavior: 'smooth'
        });
    });

    // Switch main burger image on thumbnail click
    burgerThumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            // Remove active class from all thumbnails
            burgerThumbs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked thumbnail
            thumb.classList.add('active');

            // Get image source from thumbnail
            const thumbImg = thumb.querySelector('img');
            if (thumbImg && mainBurgerImage) {
                // Fade out
                mainBurgerImage.style.opacity = '0';

                setTimeout(() => {
                    mainBurgerImage.src = thumbImg.src;
                    // Fade in
                    mainBurgerImage.style.opacity = '1';
                }, 200);
            }
        });
    });
}

// ================================================
// SMOOTH SCROLL
// ================================================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
}

// ================================================
// FORM HANDLING
// ================================================

function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);

            // Show success message (you can customize this)
            alert('Thank you for your message! We will get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }

    // Add to cart button handling
    const addButtons = document.querySelectorAll('.add-btn');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            count++;
            if (cartCount) {
                cartCount.textContent = count;

                // Add animation
                cartCount.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    cartCount.style.transform = 'scale(1)';
                }, 200);
            }

            // Visual feedback on button
            const originalText = button.innerHTML;
            button.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M5 10L8 13L15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Added';
            button.style.background = '#2ECC40';
            button.style.borderColor = '#2ECC40';

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.style.borderColor = '';
            }, 1500);
        });
    });
}

// ================================================
// PARTICLE EFFECTS
// ================================================

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Create floating particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 107, 53, ' + (Math.random() * 0.3 + 0.1) + ')';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.pointerEvents = 'none';
        particle.style.filter = 'blur(1px)';

        particlesContainer.appendChild(particle);

        // Animate particle
        const duration = Math.random() * 3000 + 2000;
        const xMovement = (Math.random() - 0.5) * 200;

        particle.animate([
            {
                transform: 'translateY(0) translateX(0)',
                opacity: 0
            },
            {
                transform: `translateY(-100vh) translateX(${xMovement}px)`,
                opacity: 1,
                offset: 0.2
            },
            {
                transform: `translateY(-100vh) translateX(${xMovement * 2}px)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => {
            particle.remove();
        };
    }

    // Create particles periodically
    setInterval(createParticle, 1500);

    // Create initial particles
    for (let i = 0; i < 3; i++) {
        setTimeout(createParticle, i * 500);
    }
}

// ================================================
// SCROLL ANIMATIONS
// ================================================

// Add scroll-based animations for menu cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu cards
document.addEventListener('DOMContentLoaded', () => {
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        observer.observe(card);
    });

    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
});

// ================================================
// BURGER IMAGE TRANSITION
// ================================================

// Smooth transition for main burger image
const mainBurger = document.querySelector('.main-burger');
if (mainBurger) {
    mainBurger.style.transition = 'opacity 0.3s ease-in-out';
}
