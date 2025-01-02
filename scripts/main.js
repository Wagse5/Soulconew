// Main JavaScript for Soul Connect

// Therapist data
const therapists = [
    {
        name: "Dr. Anjali Mehta",
        specialization: "Anxiety & Cultural Identity",
        description: "Experienced therapist specializing in anxiety and cultural identity issues faced by NRIs.",
        expertise: ["Cultural Adaptation", "Anxiety Management", "Identity Issues"]
    },
    {
        name: "Rahul Sharma",
        specialization: "Family Counseling",
        description: "Family counseling expert with focus on cross-cultural relationships and parenting.",
        expertise: ["Family Dynamics", "Cross-Cultural Relations", "Parenting Support"]
    }
];

// Function to create therapist cards with SVG placeholders
function createTherapistCards() {
    const therapistGrid = document.querySelector('.therapist-grid');
    if (!therapistGrid) return;

    // SVG placeholder for therapist profile
    const placeholderSVG = `data:image/svg+xml,${encodeURIComponent(`
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="180" height="180" fill="#E6F0FF"/>
            <circle cx="90" cy="70" r="35" fill="#004D7A"/>
            <path d="M50 140C50 117.909 67.909 100 90 100C112.091 100 130 117.909 130 140" stroke="#004D7A" stroke-width="12" stroke-linecap="round"/>
        </svg>
    `)}`;

    therapists.forEach((therapist, index) => {
        const card = document.createElement('div');
        card.className = 'therapist-card glass-card';
        
        const expertiseTags = therapist.expertise
            .map(exp => `<span class="expertise-tag">${exp}</span>`)
            .join('');
        
        card.innerHTML = `
            <div class="therapist-content">
                <div class="therapist-image-container">
                    <img src="${placeholderSVG}" alt="${therapist.name}" class="therapist-image">
                    <div class="image-overlay"></div>
                </div>
                <h3>${therapist.name}</h3>
                <p class="specialization">${therapist.specialization}</p>
                <p class="description">${therapist.description}</p>
                <div class="expertise-tags">
                    ${expertiseTags}
                </div>
                <a href="#waitlist" class="cta-button">Book a Session</a>
            </div>
        `;

        // Add animation class after a delay
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 200);
        
        therapistGrid.appendChild(card);
    });
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('.glass-card, .section-title, .mission-text, .testimonial-card').forEach(el => {
            el.classList.add('animate-in');
            if (el.classList.contains('testimonial-card')) {
                el.style.opacity = '1';
            }
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('testimonial-card')) {
                    entry.target.style.opacity = '1';
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    document.querySelectorAll('.glass-card, .section-title, .mission-text, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll with offset
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navigation scroll effect
function setupScrollEffect() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    let lastScroll = 0;
    const scrollThreshold = 10;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add background blur effect when scrolling down
        if (currentScroll > 50) {
            nav.classList.add('nav-blur');
        } else {
            nav.classList.remove('nav-blur');
        }
        
        // Hide/show navigation based on scroll direction
        if (Math.abs(currentScroll - lastScroll) < scrollThreshold) return;
        
        if (currentScroll > lastScroll && currentScroll > 500) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Parallax effect for header
function setupParallax() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        header.style.backgroundPositionY = `${scroll * 0.5}px`;
    });
}

// Add scroll progress indicator
function setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Add this function for mobile menu handling
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (!menuBtn || !navLinks) return;
    
    function toggleMenu() {
        const isOpen = navLinks.classList.contains('active');
        
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        // Toggle body scroll
        if (isOpen) {
            body.style.removeProperty('overflow');
        } else {
            body.style.overflow = 'hidden';
        }
    }
    
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !menuBtn.contains(e.target) && 
            !navLinks.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Prevent menu from staying open on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// Initialize all functionality
function initializeAll() {
    createTherapistCards();
    setupIntersectionObserver();
    setupSmoothScroll();
    setupScrollEffect();
    setupParallax();
    setupScrollProgress();
    setupMobileMenu();
}

// Initialize on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    // DOM already loaded, run initialization
    initializeAll();
}

// Handle loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}); 