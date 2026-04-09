/**
 * Portfolio Website - Main JavaScript
 * Handles navigation, form submission, smooth scrolling, and interactive features
 */

// ==========================================
// DOM ELEMENTS
// ==========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contactForm');

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

/**
 * Toggle mobile hamburger menu
 */
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

/**
 * Handle hamburger click
 */
hamburger.addEventListener('click', toggleMobileMenu);

/**
 * Close menu when a nav link is clicked
 */
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ==========================================
// SMOOTH SCROLL NAVIGATION
// ==========================================

/**
 * Smooth scroll to section with offset for fixed navbar
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

/**
 * Add background to navbar on scroll
 */
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = '0 1px 0 rgba(100, 116, 139, 0.1)';
    }
});

// ==========================================
// FORM HANDLING
// ==========================================

/**
 * Validate email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 0.5rem;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideInDown 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInUp 0.3s ease-out reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

/**
 * Handle form submission
 */
contactForm.addEventListener('submit', (e) => {
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        e.preventDefault();
        showNotification('Please fill out all fields', 'error');
        return;
    }

    if (!validateEmail(email)) {
        e.preventDefault();
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    if (message.length < 10) {
        e.preventDefault();
        showNotification('Message must be at least 10 characters', 'error');
        return;
    }

    // Allow the form to submit naturally to FormSubmit
    // Change button text to indicate progress
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

/**
 * Observe elements for fade-in animations when they come into view
 */
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

// Observe all skill items and project cards
document.querySelectorAll('.skill-item, .project-card, .professional-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ==========================================
// ACTIVE NAVIGATION LINK
// ==========================================

/**
 * Update active navigation link based on scroll position
 */
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            const sectionId = section.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--accent-primary)';
                } else {
                    link.style.color = '';
                }
            });
        }
    });
});

// ==========================================
// SKILL PROGRESS ANIMATION
// ==========================================

/**
 * Animate skill progress bars when they come into view
 */
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target.querySelector('.progress-fill');
            if (progressFill && !progressFill.classList.contains('animated')) {
                progressFill.classList.add('animated');
                progressObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-bar').forEach(bar => {
    progressObserver.observe(bar);
});

// ==========================================
// PARALLAX EFFECT (Optional)
// ==========================================

/**
 * Add parallax effect to particles
 */
window.addEventListener('scroll', () => {
    const particles = document.querySelectorAll('.particle');
    const scrollY = window.scrollY;

    particles.forEach((particle, index) => {
        const speed = 0.5 + (index * 0.1);
        particle.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// ==========================================
// SMOOTH SCROLL BEHAVIOR (Polyfill for older browsers)
// ==========================================

if (!window.CSS || !window.CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ==========================================
// PAGE LOAD ANIMATIONS
// ==========================================

/**
 * Trigger animations on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero text
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');

    // Stagger animation
    setTimeout(() => {
        heroTitle?.style.animation = 'slideInUp 0.6s ease-out';
    }, 100);

    setTimeout(() => {
        heroSubtitle?.style.animation = 'slideInUp 0.6s ease-out';
    }, 200);

    setTimeout(() => {
        heroDescription?.style.animation = 'slideInUp 0.6s ease-out';
    }, 300);

    heroButtons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.animation = 'slideInUp 0.6s ease-out';
        }, 400 + index * 100);
    });

    // Log for development
    console.log('Portfolio website initialized successfully!');
});

// ==========================================
// UTILITIES
// ==========================================

/**
 * Scroll to top button (optional)
 */
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00d4ff, #a855f7);
        color: #0f172a;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-out;
        z-index: 999;
        font-weight: 700;
        box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Uncomment to enable scroll-to-top button
createScrollToTopButton();

// ==========================================
// KEYBOARD SHORTCUTS (Accessibility)
// ==========================================

/**
 * Handle keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }

    // Ctrl/Cmd + K to scroll to contact
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const navHeight = navbar.offsetHeight;
            window.scrollTo({
                top: contactSection.offsetTop - navHeight,
                behavior: 'smooth'
            });
        }
    }
});

// ==========================================
// DEVELOPMENT HELPERS
// ==========================================

/**
 * Log theme colors for debugging
 */
function logThemeColors() {
    const colors = {
        'Primary Background': getComputedStyle(document.documentElement).getPropertyValue('--bg-primary'),
        'Accent Primary': getComputedStyle(document.documentElement).getPropertyValue('--accent-primary'),
        'Accent Secondary': getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary'),
    };
    console.table(colors);
}

// Uncomment to debug colors
// logThemeColors();
