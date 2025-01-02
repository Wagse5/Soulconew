// Main JavaScript for Soul Connect

// Therapist data
const therapists = [
    {
        name: "Dr. Anjali Mehta",
        photo: "assets/images/therapist1.jpg", // Placeholder image path
        specialization: "Anxiety & Cultural Identity",
        description: "Experienced therapist specializing in anxiety and cultural identity issues faced by NRIs.",
        expertise: ["Cultural Adaptation", "Anxiety Management", "Identity Issues"]
    },
    {
        name: "Rahul Sharma",
        photo: "assets/images/therapist2.jpg", // Placeholder image path
        specialization: "Family Counseling",
        description: "Family counseling expert with focus on cross-cultural relationships and parenting.",
        expertise: ["Family Dynamics", "Cross-Cultural Relations", "Parenting Support"]
    }
];

// Function to create therapist cards
function createTherapistCards() {
    const therapistGrid = document.querySelector('.therapist-grid');
    if (!therapistGrid) return;

    therapists.forEach((therapist, index) => {
        const card = document.createElement('div');
        card.className = 'therapist-card glass-card animate-in';
        card.style.animationDelay = `${index * 0.2}s`;
        
        const expertiseTags = therapist.expertise
            .map(exp => `<span class="expertise-tag">${exp}</span>`)
            .join('');
        
        card.innerHTML = `
            <div class="therapist-content">
                <div class="therapist-image-container">
                    <img src="${therapist.photo}" alt="${therapist.name}" class="therapist-image" 
                         onerror="this.src='https://via.placeholder.com/150'">
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
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 45px rgba(31, 38, 135, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.15)';
        });
        
        therapistGrid.appendChild(card);
    });
}

// Intersection Observer for animations
function setupIntersectionObserver() {
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

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createTherapistCards();
    setupIntersectionObserver();
    setupSmoothScroll();
    setupScrollEffect();
    setupParallax();
    setupScrollProgress();
    setupMobileMenu();
});

// Handle loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}); 