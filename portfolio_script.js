document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll animation for sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Typing effect
    const dynamicText = document.getElementById('dynamic-text');
    const phrases = [
        "혁신적인 아이디어를 현실로 만드는 것을 즐깁니다.",
        "사용자 중심의 인터페이스를 구현합니다.",
        "새로운 기술을 배우는 것을 좋아합니다.",
        "동료와 함께 성장하는 것을 중요하게 생각합니다."
    ];
    let phraseIndex = 0;
    let letterIndex = 0;
    let currentPhrase = "";
    let isDeleting = false;
    let lastFrameTime = 0;
    const typingDelay = 70; // milliseconds per character
    const deletingDelay = 30; // milliseconds per character
    const phrasePause = 2000; // milliseconds pause at end of phrase

    function type(currentTime) {
        if (!lastFrameTime) lastFrameTime = currentTime;
        const deltaTime = currentTime - lastFrameTime;

        let delay = isDeleting ? deletingDelay : typingDelay;

        if (deltaTime >= delay) {
            const fullPhrase = phrases[phraseIndex];

            if (isDeleting) {
                currentPhrase = fullPhrase.substring(0, letterIndex - 1);
                letterIndex--;
            } else {
                currentPhrase = fullPhrase.substring(0, letterIndex + 1);
                letterIndex++;
            }

            dynamicText.textContent = currentPhrase;

            if (!isDeleting && letterIndex === fullPhrase.length) {
                // Pause at end of typing
                setTimeout(() => {
                    isDeleting = true;
                    lastFrameTime = 0; // Reset for next animation frame
                    requestAnimationFrame(type);
                }, phrasePause);
                return; // Stop current requestAnimationFrame loop for pause
            } else if (isDeleting && letterIndex === 0) {
                // Move to next phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
            lastFrameTime = currentTime; // Update last frame time only when a character is typed/deleted
        }

        requestAnimationFrame(type);
    }

    requestAnimationFrame(type);

    // Project Slider
    const sliderTrack = document.querySelector('.slider-track');
    const projectItems = document.querySelectorAll('.project-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const paginationContainer = document.querySelector('.slider-pagination');

    let currentIndex = 0;
    const totalSlides = projectItems.length;
    let autoSlideInterval;

    function updateSlider() {
        const itemWidth = projectItems[0].offsetWidth; // Assuming all items have same width
        console.log('updateSlider: itemWidth:', itemWidth);
        sliderTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
        console.log('updateSlider: transform:', sliderTrack.style.transform);
        updatePagination();
    }

    function goToSlide(index) {
        console.log('goToSlide called with index:', index);
        currentIndex = index;
        if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
        } else if (currentIndex >= totalSlides) {
            currentIndex = 0;
        }
        updateSlider();
    }

    function nextSlide() {
        console.log('nextSlide called');
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        console.log('prevSlide called');
        goToSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        console.log('startAutoSlide called');
        autoSlideInterval = setInterval(nextSlide, 5000); // 5초마다 자동 슬라이드
    }

    function stopAutoSlide() {
        console.log('stopAutoSlide called');
        clearInterval(autoSlideInterval);
    }

    function updatePagination() {
        paginationContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                stopAutoSlide();
                goToSlide(i);
                startAutoSlide();
            });
            paginationContainer.appendChild(dot);
        }
    }

    // Event Listeners
    prevButton.addEventListener('click', () => {
        console.log('prevButton clicked');
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        console.log('nextButton clicked');
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    // Initial setup
    updateSlider();
    startAutoSlide();

    // Pause auto-slide on hover
    sliderTrack.addEventListener('mouseenter', stopAutoSlide);
    sliderTrack.addEventListener('mouseleave', startAutoSlide);

    // Handle window resize
    window.addEventListener('resize', updateSlider);
});