// Constants
const CARD_WIDTH = 360;
const CARD_GAP = 24;
const AUTO_SCROLL_INTERVAL = 1000; // 1 second
const MOBILE_BREAKPOINT = 768;
const MOBILE_CARD_WIDTH = 300;
const MOBILE_CARD_GAP = 16;

// Utility functions
function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
}

function createCarouselStructure() {
    const structure = document.createElement('div');
    structure.className = 'carousel-container';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-wrapper';
    
    const carousel = document.createElement('div');
    carousel.className = 'carousel';
    
    wrapper.appendChild(carousel);
    structure.appendChild(wrapper);
    
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

function initializeCarousel(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const carousel = container.querySelector('.carousel');
    if (!carousel) return;

    const cardWidth = isMobile() ? MOBILE_CARD_WIDTH : CARD_WIDTH;
    const cardGap = isMobile() ? MOBILE_CARD_GAP : CARD_GAP;
    let autoScrollInterval;
    let isScrolling = false;
    let scrollTimeout;

    function setupCarousel() {
        carousel.style.overflow = 'auto';
        carousel.style.scrollSnapType = 'x mandatory';
        carousel.style.scrollBehavior = 'smooth';
        carousel.style.display = 'flex';
        carousel.style.gap = `${cardGap}px`;
        carousel.style.padding = isMobile() ? '0.5rem' : '1rem';
    }

    function autoScroll() {
        if (isScrolling) return;

        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const nextScrollPosition = carousel.scrollLeft + cardWidth + cardGap;

        if (nextScrollPosition >= maxScroll) {
            // When reaching the last card, smoothly scroll to the beginning
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            carousel.scrollTo({ left: nextScrollPosition, behavior: 'smooth' });
        }
    }

    function handleScrollEnd() {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        if (carousel.scrollLeft >= maxScroll) {
            // When manually scrolled to the end, smoothly return to the beginning
            setTimeout(() => {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            }, 500);
        }
    }

    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(autoScroll, AUTO_SCROLL_INTERVAL);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    // Event Listeners
    carousel.addEventListener('scroll', () => {
        isScrolling = true;
        stopAutoScroll();

        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            handleScrollEnd();
            startAutoScroll();
        }, 150);
    });

    carousel.addEventListener('touchstart', stopAutoScroll);
    carousel.addEventListener('touchend', () => {
        handleScrollEnd();
        setTimeout(startAutoScroll, 1000);
    });

    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', () => {
        handleScrollEnd();
        startAutoScroll();
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setupCarousel();
            stopAutoScroll();
            startAutoScroll();
        }, 100);
    });

    // Initialize
    setupCarousel();
    startAutoScroll();
}

// Main card creation function
function createCards(data, containerId, buttonText) {
    const container = document.querySelector(`#${containerId}`);
    if (!container) return;

    // Setup carousel structure
    let carouselContainer = container.querySelector('.carousel-container');
    if (!carouselContainer) {
        carouselContainer = createCarouselStructure();
        container.appendChild(carouselContainer);
    }

    const carousel = carouselContainer.querySelector('.carousel');
    if (!carousel) return;

    // Clear and create cards
    carousel.innerHTML = '';
    data.forEach(person => carousel.appendChild(createCardElement(person, buttonText)));

    // Initialize carousel
    initializeCarousel(`#${containerId} .carousel-container`);

    // Animate cards
    setTimeout(() => {
        Array.from(carousel.children).forEach((card, index) => {
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