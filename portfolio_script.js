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

    function type() {
        const fullPhrase = phrases[phraseIndex];

        if (isDeleting) {
            currentPhrase = fullPhrase.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            currentPhrase = fullPhrase.substring(0, letterIndex + 1);
            letterIndex++;
        }

        dynamicText.textContent = currentPhrase;

        let typeSpeed = 150;
        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && letterIndex === fullPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        setTimeout(type, typeSpeed);
    }

    type();
});