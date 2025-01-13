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
        name: "Apurva Upadhyay",
        photo: "https://i.ibb.co/2qnQ1DJ/Screenshot-2025-01-12-182609.jpg",
        specialization: "Women's Mental Health & Empowerment",
        expertise: ["Women's Wellness", "Self-Development", "Relationship Counseling"]
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
        name: "Shashank Shukla",
        photo: "https://i.ibb.co/CsQyqTp/shashank.jpg",
        specialization: "Emotion Focused Therapy",
        expertise: ["Romantic Relationships", "Connection", "Heartbreak"]
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
        name: "Chaitanya Kanoria",
        photo: "https://i.ibb.co/gDwDXXM/chaitanya.jpg",
        specialization: "Peer Specialist & Compassionate Communication",
        expertise: ["Communication Skills", "Philosophy & Spirituality", "Human Values"],
        isVerified: true,
        badgeText: "Expert Moderator",
        badgeType: "expert",
        group: "verified"
    },
    {
        name: "Abhuday Singh",
        photo: "https://i.ibb.co/LNCb19V/Screenshot-2025-01-12-181850.jpg",
        specialization: "Men's Mental Health & Wellness",
        expertise: ["Men's Mental Health", "Personal Growth", "Stress Management"],
        isVerified: true,
        badgeText: "Senior Moderator",
        badgeType: "senior",
        group: "verified"
    },
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

// Function to create therapist cards
function createTherapistCards() {
    const therapistGrid = document.querySelector('#therapists .tab-content[data-tab="all"] .cards-grid');
    if (!therapistGrid) return;

    // SVG placeholder for therapist profile (fallback)
    const placeholderSVG = `data:image/svg+xml,${encodeURIComponent(`
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="180" height="180" fill="#E6F0FF"/>
            <circle cx="90" cy="70" r="35" fill="#004D7A"/>
            <path d="M50 140C50 117.909 67.909 100 90 100C112.091 100 130 117.909 130 140" stroke="#004D7A" stroke-width="12" stroke-linecap="round"/>
        </svg>
    `)}`;

    // Create cards for each category
    const categories = {
        'all': therapistGrid,
        'mental-health': document.createElement('div'),
        'relationships': document.createElement('div'),
        'wellness': document.createElement('div')
    };

    // Add class to all category divs
    Object.values(categories).forEach(div => {
        div.className = 'cards-grid';
    });

    // Create tab content containers
    Object.entries(categories).forEach(([category, grid]) => {
        if (category !== 'all') {
            const tabContent = document.createElement('div');
            tabContent.className = 'tab-content';
            tabContent.setAttribute('data-tab', category);
            tabContent.appendChild(grid);
            therapistGrid.parentElement.parentElement.appendChild(tabContent);
        }
    });

    therapists.forEach(therapist => {
        const card = document.createElement('div');
        card.className = 'therapist-card';
        
        const expertiseTags = therapist.expertise
            .map(exp => `<span class="expertise-tag">${exp}</span>`)
            .join('');
        
        card.innerHTML = `
            <div class="therapist-content">
                <div class="therapist-image-container">
                    <img src="${therapist.photo || placeholderSVG}" alt="${therapist.name}" class="therapist-image" onerror="this.src='${placeholderSVG}'">
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

        // Add card to appropriate categories
        categories['all'].appendChild(card.cloneNode(true));
        
        // Add to other categories based on expertise and specialization
        const cardText = (therapist.specialization + ' ' + therapist.expertise.join(' ')).toLowerCase();
        if (cardText.includes('mental health')) {
            categories['mental-health'].appendChild(card.cloneNode(true));
        }
        if (cardText.includes('relationship')) {
            categories['relationships'].appendChild(card.cloneNode(true));
        }
        if (cardText.includes('wellness') || cardText.includes('balance')) {
            categories['wellness'].appendChild(card.cloneNode(true));
        }
    });
}

// Function to create moderator cards
function createModeratorCards() {
    const verifiedGrid = document.querySelector('#moderators .tab-content[data-tab="verified"] .cards-grid');
    const trainingGrid = document.querySelector('#moderators .tab-content[data-tab="training"] .cards-grid');
    if (!verifiedGrid || !trainingGrid) return;

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

    function createModeratorCard(moderator) {
        const card = document.createElement('div');
        card.className = 'moderator-card';
        
        const expertiseTags = moderator.expertise
            .map(exp => `<span class="expertise-tag">${exp}</span>`)
            .join('');
        
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
        
        return card;
    }

    // Create cards for each group
    verifiedModerators.forEach(moderator => {
        verifiedGrid.appendChild(createModeratorCard(moderator));
    });

    trainingModerators.forEach(moderator => {
        trainingGrid.appendChild(createModeratorCard(moderator));
    });
}

// Tab switching functionality
function setupTabs() {
    document.querySelectorAll('.tabs-container').forEach(container => {
        const tabs = container.querySelectorAll('.tab-btn');
        const contents = container.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-tab');

                // Update active states
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Show/hide content
                contents.forEach(content => {
                    if (content.getAttribute('data-tab') === target) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    });
}

// Initialize all functionality
function initializeAll() {
    createTherapistCards();
    createModeratorCards();
    setupTabs();
    setupMobileMenu();
    setupScrollProgress();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}

// Handle loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}); 