/* Tailwind CSS Configuration */
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
            },
            colors: {
                'accent': '#0066ff',
            },
            animation: {
                'slide-up': 'slideUp 1s cubic-bezier(0.23, 1, 0.32, 1) forwards',
                'fade-in-up': 'fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1) forwards',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                slideUp: {
                    'to': { transform: 'translateY(0)' }
                },
                fadeInUp: {
                    'to': { opacity: '1', transform: 'translateY(0)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' }
                }
            },
        }
    }
}

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        const delay = 0.1;
        followerX += (mouseX - followerX) * delay;
        followerY += (mouseY - followerY) * delay;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// Smooth scrolling
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

// Scroll reveal animation
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
    scrollRevealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < window.innerHeight - elementVisible) {
            el.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    if (scrollTop > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.background = 'transparent';
    }

    lastScrollTop = scrollTop;
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        const parallaxSpeed = 0.5;
        heroText.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Counter animation
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 60;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 50);
    });
};

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('#about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Add stagger animation to grid items
const addStaggerAnimation = (selector, delay = 100) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * delay}ms`;
    });
};

addStaggerAnimation('.skill-card');
addStaggerAnimation('.project-card');