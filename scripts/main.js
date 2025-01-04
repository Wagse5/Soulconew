// Main JavaScript for Soul Connect

// Therapist data
const therapists = [
    {
        name: "G Sharath Chandra",
        photo: "https://i.ibb.co/59vKF3G/aryan-2.jpg",
        specialization: "Mental Health & Cultural Integration",
        expertise: ["Cultural Integration", "Men's Mental Health", "Career Stress Management"]
    },
    {
        name: "Catherine Mary Joy",
        photo: "https://i.ibb.co/4N7mxX6/CMJ.jpg",
        specialization: "Family Dynamics & Relationships",
        expertise: ["Family Counseling", "Relationship Therapy", "Cross-Cultural Adaptation"]
    },
    {
        name: "Malavika R",
        photo: "https://i.ibb.co/KV5R5Hb/MR.jpg",
        specialization: "Anxiety & Women's Wellness",
        expertise: ["Women's Mental Health", "Anxiety Management", "Work-Life Balance"]
    },
    {
        name: "Dr. Rajesh Kumar",
        photo: "",
        specialization: "Depression & Anxiety Management",
        expertise: ["Clinical Depression", "Anxiety Disorders", "Mindfulness Therapy"]
    },
    {
        name: "Dr. Sarah Matthews",
        photo: "",
        specialization: "Youth & Teen Counseling",
        expertise: ["Teen Psychology", "Academic Stress", "Identity Development"]
    }
];

// Peer Moderator data
const moderators = [
    // Verified Moderators
    {
        name: "Priya Sharma",
        photo: "",
        specialization: "Cultural Transition Support",
        expertise: ["NRI Experience", "Cultural Adaptation", "Peer Support"],
        isVerified: true,
        badgeText: "Lead Moderator",
        badgeType: "lead",
        group: "verified"
    },
    {
        name: "Rahul Kapoor",
        photo: "",
        specialization: "Career & Life Balance",
        expertise: ["Work-Life Balance", "Professional Growth", "Stress Management"],
        isVerified: true,
        badgeText: "Senior Moderator",
        badgeType: "senior",
        group: "verified"
    },
    {
        name: "Anjali Patel",
        photo: "",
        specialization: "Family & Relationships",
        expertise: ["Family Dynamics", "Cross-Cultural Dating", "Social Integration"],
        isVerified: true,
        badgeText: "Expert Moderator",
        badgeType: "expert",
        group: "verified"
    },
    {
        name: "Michael Chen",
        photo: "",
        specialization: "International Student Support",
        expertise: ["Academic Life", "Cultural Exchange", "Student Wellness"],
        isVerified: true,
        badgeText: "Verified Moderator",
        badgeType: "verified",
        group: "verified"
    },
    // Training Moderators
    {
        name: "Neha Gupta",
        photo: "",
        specialization: "Mental Health Awareness",
        expertise: ["Mental Health Education", "Community Support", "Wellness Programs"],
        isVerified: false,
        badgeText: "Training Moderator",
        badgeType: "training",
        group: "training"
    },
    {
        name: "James Wilson",
        photo: "",
        specialization: "Expat Life Integration",
        expertise: ["Cultural Adjustment", "Social Networking", "Life Transitions"],
        isVerified: false,
        badgeText: "Training Moderator",
        badgeType: "training",
        group: "training"
    },
    {
        name: "Lisa Rodriguez",
        photo: "",
        specialization: "Wellness & Lifestyle",
        expertise: ["Holistic Wellness", "Work-Life Balance", "Stress Relief"],
        isVerified: false,
        badgeText: "Training Moderator",
        badgeType: "training",
        group: "training"
    }
];

// Function to create therapist cards with SVG placeholders
function createTherapistCards() {
    const therapistGrid = document.querySelector('.therapist-grid');
    if (!therapistGrid) return;

    // SVG placeholder for therapist profile (fallback)
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
                    <img src="${therapist.photo}" alt="${therapist.name}" class="therapist-image" onerror="this.src='${placeholderSVG}'">
                    <div class="image-overlay"></div>
                </div>
                <h3>${therapist.name}</h3>
                <p class="specialization">${therapist.specialization}</p>
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

// Function to create moderator cards
function createModeratorCards() {
    const moderatorGrid = document.querySelector('.moderator-grid');
    if (!moderatorGrid) return;

    // Clear existing content
    moderatorGrid.innerHTML = '';

    // SVG placeholder for profile (fallback)
    const placeholderSVG = `data:image/svg+xml,${encodeURIComponent(`
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="180" height="180" fill="#E6F0FF"/>
            <circle cx="90" cy="70" r="35" fill="#004D7A"/>
            <path d="M50 140C50 117.909 67.909 100 90 100C112.091 100 130 117.909 130 140" stroke="#004D7A" stroke-width="12" stroke-linecap="round"/>
        </svg>
    `)}`;

    // Verification tick SVG
    const verifiedTickSVG = `
        <svg viewBox="0 0 24 24" width="14" height="14">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
        </svg>
    `;

    // Group moderators
    const verifiedModerators = moderators.filter(m => m.group === 'verified');
    const trainingModerators = moderators.filter(m => m.group === 'training');

    // Create group headers and cards
    if (verifiedModerators.length > 0) {
        const verifiedHeader = document.createElement('div');
        verifiedHeader.className = 'moderator-group-header';
        verifiedHeader.innerHTML = '<h3>Verified Moderators</h3>';
        moderatorGrid.appendChild(verifiedHeader);

        verifiedModerators.forEach((moderator, index) => {
            createModeratorCard(moderator, index);
        });
    }

    if (trainingModerators.length > 0) {
        const trainingHeader = document.createElement('div');
        trainingHeader.className = 'moderator-group-header';
        trainingHeader.innerHTML = '<h3>Training Moderators</h3>';
        moderatorGrid.appendChild(trainingHeader);

        trainingModerators.forEach((moderator, index) => {
            createModeratorCard(moderator, index);
        });
    }

    function createModeratorCard(moderator, index) {
        const card = document.createElement('div');
        card.className = 'moderator-card glass-card';
        
        const expertiseTags = moderator.expertise
            .map(exp => `<span class="expertise-tag">${exp}</span>`)
            .join('');
        
        // Add verification badge and text if moderator is verified
        const badges = moderator.isVerified ? `
            <div class="moderator-badge">
                <div class="verified-icon" title="Verified Moderator">
                    ${verifiedTickSVG}
                </div>
                ${moderator.badgeText ? `<span class="badge-text ${moderator.badgeType}-badge">${moderator.badgeText}</span>` : ''}
            </div>
        ` : moderator.badgeText ? `
            <div class="moderator-badge">
                <span class="badge-text ${moderator.badgeType}-badge">${moderator.badgeText}</span>
            </div>
        ` : '';
        
        card.innerHTML = `
            <div class="moderator-content">
                ${badges}
                <div class="moderator-image-container">
                    <img src="${moderator.photo || placeholderSVG}" alt="${moderator.name}" class="moderator-image" onerror="this.src='${placeholderSVG}'">
                    <div class="image-overlay"></div>
                </div>
                <h3>${moderator.name}</h3>
                <p class="specialization">${moderator.specialization}</p>
                <div class="expertise-tags">
                    ${expertiseTags}
                </div>
                <a href="#waitlist" class="cta-button">Connect with Peer</a>
            </div>
        `;

        // Add animation class after a delay
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 200);
        
        moderatorGrid.appendChild(card);
    }
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
    createModeratorCards();
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