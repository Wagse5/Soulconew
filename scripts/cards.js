// Card creation functions

// Function to create therapist cards
export function createTherapistCards(therapists) {
    const therapistGrid = document.querySelector('.therapist-grid');
    if (!therapistGrid) return;

    therapists.forEach((therapist, index) => {
        const card = document.createElement('div');
        card.className = 'therapist-card';
        
        const expertiseTags = therapist.expertise
            .map(exp => `<span class="expertise-tag">${exp}</span>`)
            .join('');
        
        card.innerHTML = `
            <div class="therapist-content">
                <div class="therapist-image-container">
                    <img src="${therapist.photo}" alt="${therapist.name}" class="therapist-image" onerror="this.src='data:image/svg+xml,${encodeURIComponent(`<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="180" fill="#E6F0FF"/><circle cx="90" cy="70" r="35" fill="#004D7A"/><path d="M50 140C50 117.909 67.909 100 90 100C112.091 100 130 117.909 130 140" stroke="#004D7A" stroke-width="12" stroke-linecap="round"/></svg>`)}'">
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
export function createModeratorCards(moderators) {
    const moderatorGrid = document.querySelector('.moderator-grid');
    if (!moderatorGrid) return;

    moderators.forEach((moderator, index) => {
        const card = document.createElement('div');
        card.className = 'moderator-card';
        
        const expertiseTags = moderator.expertise
            .map(exp => `<span class="expertise-tag">${exp}</span>`)
            .join('');
        
        const verifiedTickSVG = `
            <svg viewBox="0 0 24 24" width="14" height="14">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
            </svg>
        `;
        
        const badges = `
            <div class="moderator-badge">
                <div class="verified-icon" title="Verified Moderator">
                    ${verifiedTickSVG}
                </div>
                <span class="badge-text ${moderator.badgeType}-badge">${moderator.badgeText}</span>
            </div>
        `;
        
        card.innerHTML = `
            <div class="moderator-content">
                ${badges}
                <div class="moderator-image-container">
                    <img src="${moderator.photo}" alt="${moderator.name}" class="moderator-image" onerror="this.src='data:image/svg+xml,${encodeURIComponent(`<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="180" fill="#E6F0FF"/><circle cx="90" cy="70" r="35" fill="#004D7A"/><path d="M50 140C50 117.909 67.909 100 90 100C112.091 100 130 117.909 130 140" stroke="#004D7A" stroke-width="12" stroke-linecap="round"/></svg>`)}'">
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
    });
} 