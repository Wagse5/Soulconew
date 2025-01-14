// Constants
const MOBILE_BREAKPOINT = 768;

// Utility functions
function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
}

function createGridStructure() {
    const structure = document.createElement('div');
    structure.className = 'cards-grid';
    return structure;
}

function createCardElement(person, buttonText) {
    const card = document.createElement('div');
    card.className = 'card-base';
    
    const expertiseTags = person.expertise
        .map(exp => `<span class="expertise-tag">${exp}</span>`)
        .join('');
    
    card.innerHTML = `
        <div class="card-content">
            <div class="profile-image-container">
                <img src="${person.photo}" alt="${person.name}" class="profile-image" onerror="this.src='data:image/svg+xml,${encodeURIComponent(`<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="180" fill="#E6F0FF"/><circle cx="90" cy="70" r="35" fill="#004D7A"/><path d="M50 140C50 117.909 67.909 100 90 100C112.091 100 130 117.909 130 140" stroke="#004D7A" stroke-width="12" stroke-linecap="round"/></svg>`)}'">
            </div>
            <h3>${person.name}</h3>
            <p class="specialization">${person.specialization}</p>
            <div class="expertise-tags">
                ${expertiseTags}
            </div>
            <a href="#waitlist" class="cta-button">${buttonText}</a>
        </div>
    `;
    
    return card;
}

// Main card creation function
function createCards(data, containerId, buttonText) {
    const container = document.querySelector(`#${containerId}`);
    if (!container) return;

    // Setup grid structure
    let gridContainer = container.querySelector('.cards-grid');
    if (!gridContainer) {
        gridContainer = createGridStructure();
        container.appendChild(gridContainer);
    }

    // Clear and create cards
    gridContainer.innerHTML = '';
    data.forEach(person => gridContainer.appendChild(createCardElement(person, buttonText)));

    // Animate cards
    setTimeout(() => {
        Array.from(gridContainer.children).forEach((card, index) => {
            setTimeout(() => card.classList.add('animate-in'), index * 200);
        });
    }, 100);
}

// Export functions
export function createTherapistCards(therapists) {
    createCards(therapists, 'therapists', 'Book a Session');
}

export function createModeratorCards(moderators) {
    createCards(moderators, 'moderators', 'Book a Session');
} 