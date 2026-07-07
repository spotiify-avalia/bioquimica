document.addEventListener('DOMContentLoaded', () => {
    
    // Top Banner Date
    const dateSpan = document.getElementById('current-date');
    if (dateSpan) {
        const today = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        dateSpan.textContent = today.toLocaleDateString('pt-BR', options);
    }
    
    // Top Banner Countdown & Progress
    const countdownSpan = document.getElementById('countdown');
    const progressBar = document.getElementById('banner-progress');
    
    if (countdownSpan && progressBar) {
        let totalSeconds = 10 * 60; // 10 minutes
        const savedTime = localStorage.getItem('offerCountdown');
        
        if (savedTime && !isNaN(savedTime) && savedTime > 0) {
            totalSeconds = parseInt(savedTime);
        }
        
        const initialSeconds = 10 * 60;

        const updateTimer = () => {
            if (totalSeconds <= 0) {
                totalSeconds = 0; // Freeze at zero
            }
            
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            countdownSpan.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            const percentage = (totalSeconds / initialSeconds) * 100;
            progressBar.style.width = `${percentage}%`;
            
            localStorage.setItem('offerCountdown', totalSeconds);
            
            if (totalSeconds > 0) {
                totalSeconds--;
            }
        };
        
        updateTimer(); // Initial call
        setInterval(updateTimer, 1000); // Tick every second
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple auto-scroll for samples carousel on mobile
    const carousel = document.querySelector('.amostras-grid');
    if(carousel && window.innerWidth < 768) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast
            carousel.scrollLeft = scrollLeft - walk;
        });
    }

    // Modal Upsell Logic
    const btnEssencial = document.getElementById('btn-essencial');
    const upsellModal = document.getElementById('upsellModal');
    const closeModal = document.querySelector('.close-modal');
    const btnDeclineOffer = document.getElementById('btn-decline-offer');

    if (btnEssencial && upsellModal) {
        btnEssencial.addEventListener('click', (e) => {
            e.preventDefault();
            upsellModal.style.display = 'block';
        });
    }

    const closeUpsell = (e) => {
        if(e) e.preventDefault();
        upsellModal.style.display = 'none';
    };

    if (closeModal) closeModal.addEventListener('click', closeUpsell);
    
    if (btnDeclineOffer) {
        btnDeclineOffer.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'https://pay.lowify.com.br/checkout?product_id=3eBnGE';
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === upsellModal) {
            closeUpsell();
        }
    });

});
