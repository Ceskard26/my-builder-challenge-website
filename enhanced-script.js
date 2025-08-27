// Enhanced Portfolio JavaScript - César Carrasco
// All interactive features and animations

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupThemeToggle();
        this.setupScrollProgress();
        this.setupTypingAnimation();
        this.setupMatrixEffect();
        this.setupParticles();
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupSkillBars();
        this.setupTestimonialsCarousel();
        this.setupGitHubRepos();
        this.setupCredlyIntegration();
        this.setupPWA();
        this.setupKeyboardNavigation();
        this.setupSmoothScrolling();
        this.setupGlitchEffects();
    }

    // Loading Screen
    setupLoadingScreen() {
        window.addEventListener('load', () => {
            const loadingScreen = document.getElementById('loading-screen');
            const loadingBar = document.querySelector('.loading-bar');
            const loadingText = document.querySelector('.loading-text');
            
            const messages = [
                'Initializing...',
                'Loading AWS services...',
                'Connecting to cloud...',
                'Almost ready...'
            ];
            
            let messageIndex = 0;
            let progress = 0;
            
            const updateLoading = () => {
                progress += Math.random() * 30;
                loadingBar.style.width = Math.min(progress, 100) + '%';
                
                if (messageIndex < messages.length - 1 && progress > (messageIndex + 1) * 25) {
                    messageIndex++;
                    loadingText.textContent = messages[messageIndex];
                }
                
                if (progress >= 100) {
                    setTimeout(() => {
                        loadingScreen.style.opacity = '0';
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                        }, 500);
                    }, 500);
                } else {
                    setTimeout(updateLoading, 100 + Math.random() * 200);
                }
            };
            
            updateLoading();
        });
    }

    // Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
            
            // Animate transition
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }

    updateThemeIcon(theme) {
        const moonIcon = document.querySelector('#theme-toggle .fa-moon');
        const sunIcon = document.querySelector('#theme-toggle .fa-sun');
        
        if (theme === 'dark') {
            moonIcon.style.opacity = '0';
            sunIcon.style.opacity = '1';
        } else {
            moonIcon.style.opacity = '1';
            sunIcon.style.opacity = '0';
        }
    }

    // Scroll Progress
    setupScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Typing Animation
    setupTypingAnimation() {
        const typingText = document.getElementById('typing-text');
        const phrases = [
            'Cloud Builder & AWS Enthusiast',
            'Cybersecurity Engineering Student',
            'AI/ML Developer',
            'IBM Cloud Specialist',
            'Maritime Rescue Innovator'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;
        
        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let nextDelay = isDeleting ? deleteSpeed : typeSpeed;
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                nextDelay = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
            
            setTimeout(type, nextDelay);
        };
        
        type();
    }

    // Matrix Rain Effect
    setupMatrixEffect() {
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = 'rgba(120, 119, 198, 0.3)';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(draw, 35);
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Particle System
    setupParticles() {
        const container = document.getElementById('particles-container');
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            container.appendChild(particle);
        }
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('stat-card')) {
                        this.animateCounter(entry.target);
                    }
                    if (entry.target.classList.contains('skill-card')) {
                        this.animateSkillBars(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('section, .stat-card, .skill-card, .project-card, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    // Counter Animations
    setupCounterAnimations() {
        // Will be triggered by scroll observer
    }

    animateCounter(card) {
        const counter = card.querySelector('.stat-number');
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target === 247 ? '24/7' : target + (target === 100 ? '%' : '+');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
            }
        }, 50);
    }

    // Skill Progress Bars
    setupSkillBars() {
        // Will be triggered by scroll observer
    }

    animateSkillBars(card) {
        const progressBars = card.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const skill = bar.getAttribute('data-skill');
            setTimeout(() => {
                bar.style.width = skill + '%';
            }, Math.random() * 500);
        });
    }

    // Testimonials Carousel
    setupTestimonialsCarousel() {
        this.currentTestimonial = 0;
        this.testimonialInterval = null;
        
        // Auto-play carousel
        this.startTestimonialAutoplay();
        
        // Pause on hover
        const carousel = document.querySelector('.testimonials-carousel');
        carousel.addEventListener('mouseenter', () => this.stopTestimonialAutoplay());
        carousel.addEventListener('mouseleave', () => this.startTestimonialAutoplay());
    }

    moveTestimonial(direction) {
        const track = document.querySelector('.testimonial-track');
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        
        this.currentTestimonial += direction;
        
        if (this.currentTestimonial >= cards.length) {
            this.currentTestimonial = 0;
        } else if (this.currentTestimonial < 0) {
            this.currentTestimonial = cards.length - 1;
        }
        
        track.style.transform = `translateX(-${this.currentTestimonial * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentTestimonial);
        });
    }

    currentTestimonial(index) {
        this.currentTestimonial = index - 1;
        this.moveTestimonial(0);
    }

    startTestimonialAutoplay() {
        this.testimonialInterval = setInterval(() => {
            this.moveTestimonial(1);
        }, 5000);
    }

    stopTestimonialAutoplay() {
        if (this.testimonialInterval) {
            clearInterval(this.testimonialInterval);
        }
    }

    // GitHub Repositories
    async setupGitHubRepos() {
        try {
            const response = await fetch('https://api.github.com/users/Ceskard26/repos?sort=updated&per_page=3');
            const repos = await response.json();
            
            const container = document.getElementById('github-repos-container');
            container.innerHTML = '';
            
            repos.forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.className = 'repo-card';
                repoCard.innerHTML = `
                    <div class="repo-header">
                        <h4><i class="fab fa-github"></i> ${repo.name}</h4>
                        <a href="${repo.html_url}" target="_blank" class="repo-link">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                    <p>${repo.description || 'No description available'}</p>
                    <div class="repo-stats">
                        <span class="repo-stat">
                            <i class="fas fa-star"></i>
                            ${repo.stargazers_count}
                        </span>
                        <span class="repo-stat">
                            <i class="fas fa-code-branch"></i>
                            ${repo.forks_count}
                        </span>
                        ${repo.language ? `<span class="repo-language">${repo.language}</span>` : ''}
                    </div>
                    <div class="repo-updated">
                        Updated ${this.formatDate(repo.updated_at)}
                    </div>
                `;
                container.appendChild(repoCard);
            });
        } catch (error) {
            console.error('Error fetching GitHub repos:', error);
            document.getElementById('github-repos-container').innerHTML = '<p>Unable to load repositories at the moment.</p>';
        }
    }

    // Credly Integration (Mock data since Credly API requires auth)
    async setupCredlyIntegration() {
        // Mock certifications data
        const mockCertifications = [
            {
                title: 'AWS Cloud Practitioner',
                issuer: 'Amazon Web Services',
                date: '2024',
                badge: 'fas fa-cloud',
                level: 'Foundational'
            },
            {
                title: 'IBM Cloud Fundamentals',
                issuer: 'IBM',
                date: '2025',
                badge: 'fab fa-ibm',
                level: 'Professional'
            },
            {
                title: 'Cybersecurity Fundamentals',
                issuer: 'CompTIA',
                date: '2024',
                badge: 'fas fa-shield-alt',
                level: 'Professional'
            },
            {
                title: 'Machine Learning Basics',
                issuer: 'Coursera',
                date: '2024',
                badge: 'fas fa-robot',
                level: 'Intermediate'
            }
        ];
        
        const container = document.getElementById('certifications-grid');
        container.innerHTML = '';
        
        mockCertifications.forEach(cert => {
            const certCard = document.createElement('div');
            certCard.className = 'cert-card';
            certCard.innerHTML = `
                <div class="cert-badge">
                    <i class="${cert.badge}"></i>
                </div>
                <div class="cert-content">
                    <h4>${cert.title}</h4>
                    <p class="cert-issuer">${cert.issuer}</p>
                    <div class="cert-meta">
                        <span class="cert-date">${cert.date}</span>
                        <span class="cert-level">${cert.level}</span>
                    </div>
                </div>
            `;
            container.appendChild(certCard);
        });
    }

    // PWA Setup
    setupPWA() {
        // Register service worker if supported
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').catch(err => {
                console.log('Service Worker registration failed:', err);
            });
        }
        
        // Install prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            deferredPrompt = e;
            // Could show custom install button here
        });
    }

    // Keyboard Navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    if (e.target.closest('.testimonials-carousel')) {
                        this.moveTestimonial(-1);
                    }
                    break;
                case 'ArrowRight':
                    if (e.target.closest('.testimonials-carousel')) {
                        this.moveTestimonial(1);
                    }
                    break;
                case 'Escape':
                    this.closeProjectModal();
                    break;
            }
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
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
    }

    // Glitch Effects
    setupGlitchEffects() {
        const glitchElements = document.querySelectorAll('.glitch-text');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('glitch-active');
                setTimeout(() => {
                    element.classList.remove('glitch-active');
                }, 600);
            });
        });
    }

    // Utility Functions
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else if (diffDays < 30) {
            return `${Math.floor(diffDays / 7)} weeks ago`;
        } else {
            return `${Math.floor(diffDays / 30)} months ago`;
        }
    }
}

// Project Modal Functions (Global scope for onclick handlers)
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    
    const projectData = {
        drone: {
            title: 'Maritime Rescue AI Drone',
            description: 'Advanced AI-powered drone system using thermal camera and real-time recognition to detect drowning persons at sea.',
            fullDescription: `
                <div class="modal-project">
                    <div class="project-hero">
                        <div class="project-hero-image">
                            <i class="fas fa-drone"></i>
                        </div>
                        <div class="project-hero-content">
                            <h2>Maritime Rescue AI Drone</h2>
                            <p class="project-subtitle">AI-Powered Emergency Response System</p>
                        </div>
                    </div>
                    
                    <div class="project-details">
                        <div class="project-section">
                            <h3>Overview</h3>
                            <p>This revolutionary project combines advanced computer vision, thermal imaging, and drone technology to create an autonomous maritime rescue system. The AI can detect drowning persons in real-time using thermal signatures and visual recognition patterns.</p>
                        </div>
                        
                        <div class="project-section">
                            <h3>Key Features</h3>
                            <ul>
                                <li><strong>Real-time Detection:</strong> 95% accuracy in identifying drowning persons</li>
                                <li><strong>Thermal Vision:</strong> Works in low visibility conditions</li>
                                <li><strong>Edge Computing:</strong> On-board processing for instant response</li>
                                <li><strong>GPS Integration:</strong> Precise location tracking and emergency dispatch</li>
                                <li><strong>Weather Resistant:</strong> Operates in harsh maritime conditions</li>
                            </ul>
                        </div>
                        
                        <div class="project-section">
                            <h3>Technical Stack</h3>
                            <div class="tech-stack">
                                <span class="tech-tag">Python</span>
                                <span class="tech-tag">OpenCV</span>
                                <span class="tech-tag">TensorFlow</span>
                                <span class="tech-tag">Thermal Imaging</span>
                                <span class="tech-tag">Edge Computing</span>
                                <span class="tech-tag">GPS/IoT</span>
                            </div>
                        </div>
                        
                        <div class="project-metrics-detailed">
                            <div class="metric-card">
                                <div class="metric-value">95%</div>
                                <div class="metric-label">Detection Accuracy</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-value">2.3s</div>
                                <div class="metric-label">Average Response</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-value">5km</div>
                                <div class="metric-label">Operation Range</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            tech: ['Python', 'OpenCV', 'TensorFlow', 'Thermal Imaging', 'Edge Computing'],
            status: 'In Development'
        },
        portfolio: {
            title: 'Cloud Portfolio Website',
            description: 'Modern, responsive portfolio website built with AWS cloud services.',
            fullDescription: `
                <div class="modal-project">
                    <div class="project-hero">
                        <div class="project-hero-image">
                            <i class="fas fa-cloud"></i>
                        </div>
                        <div class="project-hero-content">
                            <h2>Cloud Portfolio Website</h2>
                            <p class="project-subtitle">AWS-Powered Modern Web Experience</p>
                        </div>
                    </div>
                    
                    <div class="project-details">
                        <div class="project-section">
                            <h3>Project Overview</h3>
                            <p>A cutting-edge portfolio website showcasing modern web development practices with AWS cloud services. Built for the AWS Builder Challenge, featuring advanced animations, PWA capabilities, and serverless architecture.</p>
                        </div>
                        
                        <div class="project-section">
                            <h3>Architecture</h3>
                            <ul>
                                <li><strong>Frontend:</strong> Static hosting on S3 with CloudFront CDN</li>
                                <li><strong>Backend:</strong> Lambda functions for contact form processing</li>
                                <li><strong>CI/CD:</strong> GitHub Actions for automated deployments</li>
                                <li><strong>Performance:</strong> 98+ Lighthouse score optimization</li>
                                <li><strong>Security:</strong> HTTPS, CSP headers, and input validation</li>
                            </ul>
                        </div>
                        
                        <div class="project-section">
                            <h3>Features</h3>
                            <div class="feature-list">
                                <div class="feature-item">
                                    <i class="fas fa-mobile-alt"></i>
                                    <span>Progressive Web App (PWA)</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-palette"></i>
                                    <span>Dark/Light Theme Toggle</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-rocket"></i>
                                    <span>Advanced Animations</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-chart-line"></i>
                                    <span>Real-time GitHub Integration</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="project-metrics-detailed">
                            <div class="metric-card">
                                <div class="metric-value">98</div>
                                <div class="metric-label">Lighthouse Score</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-value">100%</div>
                                <div class="metric-label">Uptime SLA</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-value">&lt;1s</div>
                                <div class="metric-label">Load Time</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            tech: ['AWS S3', 'CloudFront', 'Lambda', 'GitHub Actions', 'HTML5/CSS3'],
            status: 'Live'
        }
    };
    
    const project = projectData[projectId];
    if (project) {
        modalBody.innerHTML = project.fullDescription;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Testimonial carousel functions (Global scope)
function moveTestimonial(direction) {
    app.moveTestimonial(direction);
}

function currentTestimonial(index) {
    app.currentTestimonial(index);
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new PortfolioApp();
});

// Handle modal clicks
window.addEventListener('click', (e) => {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`🚀 Page loaded in ${loadTime}ms`);
    });
}
