// Main JavaScript for Soul Connect

// Therapist data
const therapists = [
    {
        name: "Dr. Vashisht Madhavan",
        photo: "https://i.ibb.co/9hW4N8F/vashisht.jpg",
        specialization: "Mental Health & Wellness Expert",
        expertise: ["Anxiety & Depression", "Career Counseling", "Life Transitions"]
    },
    {
        name: "Apurva Upadhyay",
        photo: "https://i.ibb.co/2qnQ1DJ/Whats-App-Image-2024-01-07-at-6-05-56-AM.jpg",
        specialization: "Women's Mental Health & Empowerment",
        expertise: ["Women's Wellness", "Self-Development", "Relationship Counseling"]
    }
];

// Peer Moderator data
const moderators = [
    {
        name: "Abhuday Singh",
        photo: "https://i.ibb.co/LNCb19V/Whats-App-Image-2024-01-07-at-6-05-56-AM.jpg",
        specialization: "Men's Mental Health & Wellness",
        expertise: ["Men's Mental Health", "Personal Growth", "Stress Management"],
        verified: true,
        badgeText: "Senior Moderator",
        badgeType: "senior",
        group: "verified"
    }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    createTherapistCards();
    createModeratorCards();
});

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            const container = button.closest('.tabs-container');
            
            // Update active state for buttons
            container.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Update active state for content
            container.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            container.querySelector(`.tab-content[data-tab="${tabId}"]`).classList.add('active');
        });
    });
}

function createTherapistCards() {
    const allGrid = document.querySelector('#therapists .tab-content[data-tab="all"] .cards-grid');
    const mentalHealthGrid = document.querySelector('#therapists .tab-content[data-tab="mental-health"] .cards-grid');
    const relationshipsGrid = document.querySelector('#therapists .tab-content[data-tab="relationships"] .cards-grid');
    const wellnessGrid = document.querySelector('#therapists .tab-content[data-tab="wellness"] .cards-grid');

    if (!allGrid || !mentalHealthGrid || !relationshipsGrid || !wellnessGrid) {
        console.error('Therapist grid containers not found');
        return;
    }

    // Clear existing cards
    [allGrid, mentalHealthGrid, relationshipsGrid, wellnessGrid].forEach(grid => {
        grid.innerHTML = '';
    });

    therapists.forEach((therapist, index) => {
        const card = createTherapistCard(therapist);
        
        // Add to All tab
        allGrid.appendChild(card.cloneNode(true));
        
        // Add to specific category tabs based on expertise
        const expertise = therapist.expertise.map(e => e.toLowerCase());
        if (expertise.some(e => e.includes('mental') || e.includes('anxiety') || e.includes('depression'))) {
            mentalHealthGrid.appendChild(card.cloneNode(true));
        }
        if (expertise.some(e => e.includes('relationship') || e.includes('family') || e.includes('couple'))) {
            relationshipsGrid.appendChild(card.cloneNode(true));
        }
        if (expertise.some(e => e.includes('wellness') || e.includes('life') || e.includes('stress'))) {
            wellnessGrid.appendChild(card.cloneNode(true));
        }
    });
}

function createModeratorCards() {
    const verifiedGrid = document.querySelector('#moderators .tab-content[data-tab="verified"] .cards-grid');
    const trainingGrid = document.querySelector('#moderators .tab-content[data-tab="training"] .cards-grid');

    if (!verifiedGrid || !trainingGrid) {
        console.error('Moderator grid containers not found');
        return;
    }

    // Clear existing cards
    verifiedGrid.innerHTML = '';
    trainingGrid.innerHTML = '';

    moderators.forEach((moderator) => {
        const card = createModeratorCard(moderator);
        if (moderator.group === 'verified') {
            verifiedGrid.appendChild(card);
        } else {
            trainingGrid.appendChild(card);
        }
    });
}

function createTherapistCard(therapist) {
    const card = document.createElement('div');
    card.className = 'therapist-card';
    
    card.innerHTML = `
        <div class="therapist-content">
            <div class="therapist-image-container">
                <img src="${therapist.photo}" alt="${therapist.name}" class="therapist-image">
                <div class="image-overlay"></div>
            </div>
            <h3>${therapist.name}</h3>
            <p class="specialization">${therapist.specialization}</p>
            <div class="expertise-tags">
                ${therapist.expertise.map(tag => `<span class="expertise-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

function createModeratorCard(moderator) {
    const card = document.createElement('div');
    card.className = 'moderator-card';
    
    card.innerHTML = `
        <div class="moderator-content">
            ${moderator.verified ? `
                <div class="moderator-badge">
                    <div class="verified-icon">✓</div>
                    <span class="badge-text ${moderator.badgeType}-badge">${moderator.badgeText}</span>
                </div>
            ` : ''}
            <div class="moderator-image-container">
                <img src="${moderator.photo}" alt="${moderator.name}" class="moderator-image">
                <div class="image-overlay"></div>
            </div>
            <h3>${moderator.name}</h3>
            <p class="specialization">${moderator.specialization}</p>
            <div class="expertise-tags">
                ${moderator.expertise.map(tag => `<span class="expertise-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbar = document.querySelector('.navbar-nav');

if (mobileMenuBtn && navbar) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navbar.classList.toggle('active');
    });
} 