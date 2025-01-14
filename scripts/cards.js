// Constants
const CARD_WIDTH = 360;
const CARD_GAP = 24;
const SCROLL_SPEED = 3000;
const MOBILE_BREAKPOINT = 768;

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
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-button prev';
    prevBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-button next';
    nextBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>';
    
    wrapper.appendChild(carousel);
    structure.appendChild(prevBtn);
    structure.appendChild(wrapper);
    structure.appendChild(nextBtn);
    
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

    // Initialize carousel based on device
    if (isMobile()) {
        initializeMobileCarousel(`#${containerId} .carousel-container`);
    } else {
        initializeDesktopCarousel(`#${containerId} .carousel-container`);
    }

    // Animate cards
    setTimeout(() => {
        Array.from(carousel.children).forEach((card, index) => {
            setTimeout(() => card.classList.add('animate-in'), index * 200);
        });
    }, 100);
}

// Mobile carousel initialization (unchanged as it works perfectly)
function initializeMobileCarousel(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const carousel = container.querySelector('.carousel');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    
    if (!carousel || !prevBtn || !nextBtn) return;

    // Hide navigation buttons
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';

    // Setup mobile carousel
    carousel.style.transform = 'none';
    carousel.style.display = 'flex';
    carousel.style.overflow = 'auto';
    carousel.style.scrollSnapType = 'x mandatory';
    carousel.style.scrollBehavior = 'smooth';
    carousel.style.width = '100%';
    
    // Setup mobile cards
    Array.from(carousel.children).forEach(card => {
        card.style.flex = '0 0 100%';
        card.style.scrollSnapAlign = 'center';
        card.style.marginRight = '0';
    });

    // Handle scroll end for looping
    carousel.addEventListener('scrollend', () => {
        const totalWidth = carousel.scrollWidth;
        const currentScroll = carousel.scrollLeft;
        const viewportWidth = carousel.offsetWidth;

        if (currentScroll + viewportWidth >= totalWidth) {
            setTimeout(() => {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            }, 500);
        }
    });
}

// Desktop carousel initialization
function initializeDesktopCarousel(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const carousel = container.querySelector('.carousel');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    
    if (!carousel || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    let autoScrollInterval;

    // Show navigation buttons
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';

    // Setup desktop carousel
    carousel.style.display = 'grid';
    carousel.style.gridAutoFlow = 'column';
    carousel.style.gridAutoColumns = `${CARD_WIDTH}px`;
    carousel.style.gap = `${CARD_GAP}px`;
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = 'translateX(0)';
    
    // Calculate total width
    const totalCards = carousel.children.length;
    const totalWidth = (CARD_WIDTH * totalCards) + (CARD_GAP * (totalCards - 1));
    carousel.style.width = `${totalWidth}px`;

    // Setup desktop cards
    Array.from(carousel.children).forEach(card => {
        card.style.width = `${CARD_WIDTH}px`;
        card.style.margin = '0';
    });

    function getMaxIndex() {
        const containerWidth = container.offsetWidth;
        const visibleCards = Math.floor((containerWidth + CARD_GAP) / (CARD_WIDTH + CARD_GAP));
        return Math.max(0, totalCards - visibleCards);
    }

    function updatePosition() {
        const offset = currentIndex * -(CARD_WIDTH + CARD_GAP);
        carousel.style.transform = `translateX(${offset}px)`;
    }

    function moveNext() {
        const maxIndex = getMaxIndex();
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updatePosition();
    }

    function movePrev() {
        const maxIndex = getMaxIndex();
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updatePosition();
    }

    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(moveNext, SCROLL_SPEED);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        movePrev();
        stopAutoScroll();
        setTimeout(startAutoScroll, SCROLL_SPEED);
    });

    nextBtn.addEventListener('click', () => {
        moveNext();
        stopAutoScroll();
        setTimeout(startAutoScroll, SCROLL_SPEED);
    });

    container.addEventListener('mouseenter', stopAutoScroll);
    container.addEventListener('mouseleave', startAutoScroll);

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (isMobile()) {
                stopAutoScroll();
                initializeMobileCarousel(containerSelector);
            } else {
                currentIndex = 0;
                updatePosition();
                startAutoScroll();
            }
        }, 100);
    });

    // Start auto-scroll
    startAutoScroll();
}

// Export functions
export function createTherapistCards(therapists) {
    createCards(therapists, 'therapists', 'Book a Session');
}

export function createModeratorCards(moderators) {
    createCards(moderators, 'moderators', 'Book a Session');
} 