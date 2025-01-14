// Unified card creation function
function createCards(data, containerId, buttonText) {
    const grid = document.querySelector(`#${containerId} .therapist-grid`);
    if (!grid) return;

    // Clear existing content
    grid.innerHTML = '';

    data.forEach((person, index) => {
        const card = document.createElement('div');
        card.className = 'therapist-card';
        
        const expertiseTags = person.expertise
            .map(exp => `<span class="expertise-tag">${exp}</span>`)
            .join('');
        
        card.innerHTML = `
            <div class="therapist-content">
                <div class="therapist-image-container">
                    <img src="${person.photo}" alt="${person.name}" class="therapist-image" onerror="this.src='data:image/svg+xml,${encodeURIComponent(`<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="180" fill="#E6F0FF"/><circle cx="90" cy="70" r="35" fill="#004D7A"/><path d="M50 140C50 117.909 67.909 100 90 100C112.091 100 130 117.909 130 140" stroke="#004D7A" stroke-width="12" stroke-linecap="round"/></svg>`)}'">
                    <div class="image-overlay"></div>
                </div>
                <h3>${person.name}</h3>
                <p class="specialization">${person.specialization}</p>
                <div class="expertise-tags">
                    ${expertiseTags}
                </div>
                <a href="#waitlist" class="cta-button">${buttonText}</a>
            </div>
        `;

        // Add animation class after a delay
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 200);
        
        grid.appendChild(card);
    });

    // Initialize carousel after cards are created
    initializeCarousel(`#${containerId} .carousel-container`);
}

// Export functions that use the unified createCards function
export function createTherapistCards(therapists) {
    createCards(therapists, 'therapists', 'Book a Session');
}

export function createModeratorCards(moderators) {
    createCards(moderators, 'moderators', 'Book a Session');
}

// Carousel functionality
function initializeCarousel(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.warn(`Container not found for selector: ${containerSelector}`);
        return;
    }

    const carousel = container.querySelector('.carousel');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    
    if (!carousel || !prevBtn || !nextBtn) {
        console.warn(`Required carousel elements not found in container: ${containerSelector}`);
        return;
    }

    let position = 0;
    let autoScrollInterval;
    const scrollSpeed = 3000; // Auto scroll every 3 seconds
    const cardWidth = 360; // Fixed card width
    const cardGap = 24; // Gap between cards
    const moveDistance = cardWidth + cardGap;
    
    function updatePosition(animate = true) {
        if (animate) {
            carousel.style.transition = 'transform 0.5s ease-in-out';
        } else {
            carousel.style.transition = 'none';
        }
        carousel.style.transform = `translateX(${position}px)`;
    }
    
    function getMaxScroll() {
        const containerWidth = container.querySelector('.carousel-wrapper').offsetWidth;
        const totalCards = carousel.children.length;
        const visibleCards = Math.ceil(containerWidth / moveDistance);
        const maxScroll = -(totalCards - visibleCards) * moveDistance;
        
        return Math.min(0, maxScroll);
    }
    
    function moveNext() {
        const maxScroll = getMaxScroll();
        position -= moveDistance;
        
        // If we've scrolled past the last card, reset to first
        if (position < maxScroll) {
            position = 0;
        }
        
        updatePosition();
    }
    
    function movePrev() {
        const maxScroll = getMaxScroll();
        position += moveDistance;
        
        // If we're at the start and trying to go back, loop to last card
        if (position > 0) {
            position = maxScroll;
        }
        
        updatePosition();
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
        movePrev();
        stopAutoScroll();
        setTimeout(startAutoScroll, scrollSpeed);
    });
    
    nextBtn.addEventListener('click', () => {
        moveNext();
        stopAutoScroll();
        setTimeout(startAutoScroll, scrollSpeed);
    });
    
    // Auto scroll functionality
    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(() => {
            const maxScroll = getMaxScroll();
            if (maxScroll < 0) {
                moveNext();
            }
        }, scrollSpeed);
    }
    
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isSwiping = true;
        stopAutoScroll();
        carousel.style.transition = 'none';
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        
        const currentX = e.changedTouches[0].screenX;
        const diff = touchStartX - currentX;
        const newPosition = position - diff;
        const maxScroll = getMaxScroll();
        
        // Limit scrolling within bounds with resistance at edges
        if (newPosition > 0) {
            position = newPosition * 0.3; // Add resistance at start
        } else if (newPosition < maxScroll) {
            position = maxScroll + (newPosition - maxScroll) * 0.3; // Add resistance at end
        } else {
            position = newPosition;
        }
        
        updatePosition(false);
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        isSwiping = false;
        touchEndX = e.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;
        
        carousel.style.transition = 'transform 0.5s ease-in-out';
        
        if (Math.abs(difference) > 50) { // Minimum swipe distance
            if (difference > 0) {
                moveNext();
            } else {
                movePrev();
            }
        } else {
            // Snap back to nearest card
            const cardPosition = Math.round(position / moveDistance) * moveDistance;
            const maxScroll = getMaxScroll();
            position = Math.max(maxScroll, Math.min(0, cardPosition));
            updatePosition();
        }
        
        setTimeout(startAutoScroll, scrollSpeed);
    }, { passive: true });
    
    // Stop auto scroll on hover or touch
    container.addEventListener('mouseenter', stopAutoScroll);
    container.addEventListener('mouseleave', startAutoScroll);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        stopAutoScroll();
        
        resizeTimeout = setTimeout(() => {
            const maxScroll = getMaxScroll();
            position = Math.max(maxScroll, Math.min(0, position));
            updatePosition(false);
            startAutoScroll();
        }, 100);
    });
    
    // Initialize
    updatePosition(false);
    startAutoScroll();
} 