// ==========================================================================
// Professional Portfolio JavaScript
// César Carrasco - AWS Builder Challenge
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ==========================================================================
// Main App Initialization
// ==========================================================================

function initializeApp() {
    initThemeToggle();
    initNavbar();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initMobileMenu();
    initPerformanceOptimizations();
}

// ==========================================================================
// Theme Toggle Functionality
// ==========================================================================

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.dataset.theme = currentTheme;
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const newTheme = body.dataset.theme === 'light' ? 'dark' : 'light';
        body.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ==========================================================================
// Navigation Bar
// ==========================================================================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    // Add scroll effect
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10));
    
    // Update active nav links
    window.addEventListener('scroll', throttle(updateActiveNavLink, 50));
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// ==========================================================================
// Smooth Scrolling
// ==========================================================================

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-links');
                if (mobileMenu) {
                    mobileMenu.classList.remove('show');
                }
            }
        });
    });
    
    // Handle hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    heroButtons.forEach(button => {
        if (button.getAttribute('href').startsWith('#')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// ==========================================================================
// Scroll Animations
// ==========================================================================

function initScrollAnimations() {
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation delay
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateOnScrollElements.forEach((el) => {
            observer.observe(el);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        animateOnScrollElements.forEach(el => {
            el.classList.add('animated');
        });
    }
}

// ==========================================================================
// Contact Form
// ==========================================================================

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const LAMBDA_URL = 'YOUR_LAMBDA_FUNCTION_URL_HERE'; // Replace with your actual Lambda URL
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.contact-submit-btn');
            const messageDiv = document.getElementById('form-message');
            
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            hideMessage();
            
            // Get form data
            const formData = {
                name: this.name.value.trim(),
                email: this.email.value.trim(),
                message: this.message.value.trim()
            };
            
            // Basic validation
            if (!validateForm(formData)) {
                showMessage('Please fill in all fields correctly.', 'error');
                resetSubmitButton(submitBtn, originalText);
                return;
            }
            
            try {
                // Simulate form submission for demo purposes
                // Replace this section with actual fetch call when Lambda URL is configured
                await simulateFormSubmission();
                
                /* Uncomment this section when you have your Lambda URL:
                const response = await fetch(LAMBDA_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    const result = await response.json();
                    showMessage('Message sent successfully! Thank you for reaching out. 🚀', 'success');
                    this.reset();
                } else {
                    const errorText = await response.text();
                    throw new Error(`Server responded with ${response.status}: ${errorText}`);
                }
                */
                
                showMessage('Message sent successfully! Thank you for reaching out. 🚀', 'success');
                this.reset();
                
            } catch (error) {
                console.error('Contact form error:', error);
                showMessage('There was an error sending your message. Please try again or contact me directly.', 'error');
            }
            
            resetSubmitButton(submitBtn, originalText);
        });
    }
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return (
        data.name && data.name.length >= 2 &&
        data.email && emailRegex.test(data.email) &&
        data.message && data.message.length >= 10
    );
}

function simulateFormSubmission() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

function resetSubmitButton(button, originalText) {
    button.textContent = originalText;
    button.disabled = false;
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('form-message');
    if (messageDiv) {
        messageDiv.textContent = text;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                hideMessage();
            }, 5000);
        }
    }
}

function hideMessage() {
    const messageDiv = document.getElementById('form-message');
    if (messageDiv) {
        messageDiv.style.display = 'none';
    }
}

// ==========================================================================
// Mobile Menu
// ==========================================================================

function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            
            // Update hamburger icon
            const isOpen = navLinks.classList.contains('show');
            mobileMenu.textContent = isOpen ? '✕' : '☰';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                navLinks.classList.remove('show');
                mobileMenu.textContent = '☰';
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('show');
                mobileMenu.textContent = '☰';
            }
        });
    }
}

// ==========================================================================
// Performance Optimizations
// ==========================================================================

function initPerformanceOptimizations() {
    // Lazy load images
    lazyLoadImages();
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Add performance monitoring
    monitorPerformance();
}

function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }
}

function preloadCriticalResources() {
    const criticalResources = [
        {
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
            as: 'style'
        }
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = resource.as;
        link.href = resource.href;
        document.head.appendChild(link);
    });
}

function monitorPerformance() {
    // Log performance metrics for development
    if (window.performance && console.log) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.getEntriesByType('navigation')[0];
                console.log('🚀 Site Performance:', {
                    'Load Time': `${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`,
                    'DOM Content Loaded': `${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`,
                    'First Byte': `${Math.round(perfData.responseStart - perfData.requestStart)}ms`
                });
            }, 0);
        });
    }
}

// ==========================================================================
// Utility Functions
// ==========================================================================

function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function(...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ==========================================================================
// Additional Interactive Features
// ==========================================================================

// Add smooth hover effects for project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add typing animation effect for hero title (optional enhancement)
function addTypingAnimation() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--accent)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        const navLinks = document.querySelector('.nav-links');
        const mobileMenu = document.getElementById('mobile-menu');
        if (navLinks && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            if (mobileMenu) mobileMenu.textContent = '☰';
        }
    }
});

// ==========================================================================
// Analytics and Tracking (for future use)
// ==========================================================================

function trackEvent(eventName, eventData = {}) {
    // Placeholder for future analytics integration
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Console log for development
    console.log(`📊 Event: ${eventName}`, eventData);
}

// Track important user interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary, .project-link, .social-link')) {
        trackEvent('interaction', {
            element: e.target.tagName,
            text: e.target.textContent,
            href: e.target.href || 'none'
        });
    }
});

// ==========================================================================
// Service Worker Registration (for future PWA features)
// ==========================================================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}
