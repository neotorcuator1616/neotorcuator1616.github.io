/* ============================================
   PROFESSIONAL PORTFOLIO WEBSITE
   JavaScript - Interactive Features & Animations
   ============================================ */

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');

// Load saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark' && themeToggle) {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = 'Light';
}

// Toggle dark mode on button click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDarkMode ? 'Light' : 'Theme';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}

// Parallax scrolling effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `0px ${scrollPosition * 0.5}px`;
    }
});

// Smooth scroll animations on page load
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.style.color = 'var(--text-dark)');
            link.style.color = 'var(--primary-color)';
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = 'var(--text-dark)';
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = 'var(--primary-color)';
            }
        });
    });
});

// Smooth reveal animations on scroll with staggered effect
const createScrollAnimationObserver = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    return observer;
};

const scrollObserver = createScrollAnimationObserver();

// Apply animations to various elements
document.querySelectorAll('.project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.95)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});

document.querySelectorAll('.skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.95)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});

document.querySelectorAll('.about-text').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.95)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});

// Smooth fade-in for form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.style.opacity = '0';
    contactForm.style.transform = 'translateY(30px)';
    contactForm.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(contactForm);
}

// Navbar scroll effect with smooth shadow transition
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        navbar.style.backdropFilter = 'blur(0px)';
    }
    
    lastScrollTop = scrollTop;
});

// Form submission handler
const contactFormElement = document.getElementById('contactForm');
if (contactFormElement) {
    contactFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactFormElement.querySelector('input[type="text"]').value;
        const email = contactFormElement.querySelector('input[type="email"]').value;
        const message = contactFormElement.querySelector('textarea').value;
        
        // Simple validation
        if (name.trim() && email.trim() && message.trim()) {
            // Show success message with animation
            const button = contactFormElement.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Message Sent!';
            button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
                contactFormElement.reset();
                button.textContent = originalText;
                button.style.background = '';
            }, 500);
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Mouse follower effect (subtle)
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.querySelectorAll('.project-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(e.clientX - cardX, 2) + Math.pow(e.clientY - cardY, 2)
        );
        
        if (distance < 200) {
            const angle = Math.atan2(e.clientY - cardY, e.clientX - cardX);
            const moveX = Math.cos(angle) * 5;
            const moveY = Math.sin(angle) * 5;
            card.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        } else {
            card.style.transform = '';
        }
    });
});

// Add console message
console.log('Portfolio website loaded with smooth animations and dark mode.');
