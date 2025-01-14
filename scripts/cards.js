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
    
    function getMaxScroll(carousel) {
        const carouselWidth = carousel.offsetWidth;
        const cardWidth = carousel.children[0].offsetWidth;
        const gap = 24; // Gap between cards
        const totalCards = carousel.children.length;
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // On mobile, show exactly one card at a time
            return (totalCards - 1) * (cardWidth + gap);
        } else {
            // On desktop, calculate based on visible width
            const visibleCards = Math.floor(carouselWidth / (cardWidth + gap));
            return Math.max(0, (totalCards - visibleCards) * (cardWidth + gap));
        }
    }
    
    function moveNext(carousel) {
        const maxScroll = getMaxScroll(carousel);
        const cardWidth = carousel.children[0].offsetWidth;
        const gap = 24;
        const isMobile = window.innerWidth <= 768;
        
        let newScrollLeft = carousel.scrollLeft + cardWidth + gap;
        
        if (isMobile) {
            // On mobile, if we're at the last card, stay there
            if (newScrollLeft > maxScroll) {
                newScrollLeft = maxScroll;
            }
        } else {
            // On desktop, loop back to start
            if (newScrollLeft > maxScroll) {
                newScrollLeft = 0;
            }
        }
        
        carousel.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    }
    
    function movePrev(carousel) {
        const cardWidth = carousel.children[0].offsetWidth;
        const gap = 24;
        const maxScroll = getMaxScroll(carousel);
        const isMobile = window.innerWidth <= 768;
        
        let newScrollLeft = carousel.scrollLeft - (cardWidth + gap);
        
        if (isMobile) {
            // On mobile, don't go before the first card
            if (newScrollLeft < 0) {
                newScrollLeft = 0;
            }
        } else {
            // On desktop, loop to end
            if (newScrollLeft < 0) {
                newScrollLeft = maxScroll;
            }
        }
        
        carousel.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
        movePrev(carousel);
        stopAutoScroll();
        setTimeout(startAutoScroll, scrollSpeed);
    });
    
    nextBtn.addEventListener('click', () => {
        moveNext(carousel);
        stopAutoScroll();
        setTimeout(startAutoScroll, scrollSpeed);
    });
    
    // Auto scroll functionality
    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(() => {
            moveNext(carousel);
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
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoScroll();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;
        
        // Determine direction and move one card, regardless of swipe distance
        if (Math.abs(difference) > 20) { // Small threshold just to prevent accidental swipes
            if (difference > 0) {
                moveNext(carousel);
            } else {
                movePrev(carousel);
            }
        }
        
        setTimeout(startAutoScroll, scrollSpeed);
    }, { passive: true });

    // Remove touchmove handler as we don't need it anymore
    carousel.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent default scrolling
    }, { passive: false });
    
    // Stop auto scroll on hover or touch
    container.addEventListener('mouseenter', stopAutoScroll);
    container.addEventListener('mouseleave', startAutoScroll);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        stopAutoScroll();
        
        resizeTimeout = setTimeout(() => {
            const maxScroll = getMaxScroll(carousel);
            // If we're beyond the new max scroll, reset to the start
            if (position < maxScroll) {
                position = 0;
            }
            updatePosition(false);
            startAutoScroll();
        }, 100);
    });
    
    // Initialize
    updatePosition(false);
    startAutoScroll();
} 