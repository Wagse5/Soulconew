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
    if (!container) return;

    const carousel = container.querySelector('.carousel');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    
    if (!carousel || !prevBtn || !nextBtn) return;

    const isMobile = () => window.innerWidth <= 768;
    let currentIndex = 0;
    let autoScrollInterval;
    const scrollSpeed = 3000;

    // Set initial state based on device
    function initializeState() {
        if (isMobile()) {
            // Mobile: Hide buttons, enable touch scroll
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            carousel.style.transform = 'none';
            carousel.style.display = 'flex';
            carousel.style.overflow = 'auto';
            carousel.style.scrollSnapType = 'x mandatory';
            carousel.style.scrollBehavior = 'smooth';
            
            // Set each card to full width and snap
            Array.from(carousel.children).forEach(card => {
                card.style.flex = '0 0 100%';
                card.style.scrollSnapAlign = 'center';
            });
        } else {
            // Desktop: Show buttons, disable touch scroll
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            carousel.style.transform = 'translateX(0)';
            carousel.style.overflow = 'hidden';
            carousel.style.scrollSnapType = 'none';
            
            // Reset card styles
            Array.from(carousel.children).forEach(card => {
                card.style.flex = '0 0 360px';
            });
        }
    }

    // Desktop navigation functions
    function moveNext() {
        if (isMobile()) return;
        
        const totalCards = carousel.children.length;
        const cardsPerView = Math.floor(carousel.offsetWidth / 384); // 360px + 24px gap
        const maxIndex = totalCards - cardsPerView;

        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }

        updateCarouselPosition();
    }

    function movePrev() {
        if (isMobile()) return;
        
        const totalCards = carousel.children.length;
        const cardsPerView = Math.floor(carousel.offsetWidth / 384);
        const maxIndex = totalCards - cardsPerView;

        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; // Loop to end
        }

        updateCarouselPosition();
    }

    function updateCarouselPosition() {
        if (isMobile()) return;
        
        const offset = currentIndex * -384; // 360px + 24px gap
        carousel.style.transform = `translateX(${offset}px)`;
    }

    // Event listeners
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

    // Auto scroll (desktop only)
    function startAutoScroll() {
        if (isMobile()) return;
        stopAutoScroll();
        autoScrollInterval = setInterval(moveNext, scrollSpeed);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    // Mobile scroll end detection
    carousel.addEventListener('scrollend', () => {
        if (!isMobile()) return;
        
        const totalWidth = carousel.scrollWidth;
        const currentScroll = carousel.scrollLeft;
        const viewportWidth = carousel.offsetWidth;

        // If we're at the end, smoothly scroll back to start
        if (currentScroll + viewportWidth >= totalWidth) {
            setTimeout(() => {
                carousel.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            }, 500);
        }
    });

    // Stop auto scroll on hover (desktop only)
    container.addEventListener('mouseenter', stopAutoScroll);
    container.addEventListener('mouseleave', startAutoScroll);

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initializeState();
            if (!isMobile()) {
                currentIndex = 0;
                updateCarouselPosition();
            }
        }, 100);
    });

    // Initialize
    initializeState();
    if (!isMobile()) {
        startAutoScroll();
    }
} 