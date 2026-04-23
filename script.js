document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const fadeElements = document.querySelectorAll('.fade-in-up, .slide-up');
    fadeElements.forEach(el => observer.observe(el));

    // 4. Language Switcher Logic
    let currentLang = localStorage.getItem('lang') || 'ko';
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = currentLang;
    }

    function updateLanguage(lang) {
        if (!translations[lang]) return;
        
        // Update innerHTML/innerText
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (translations[lang][key]) {
                el.setAttribute('placeholder', translations[lang][key]);
            }
        });

        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);
        currentLang = lang;
    }

    // Initial translation application
    updateLanguage(currentLang);

    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            updateLanguage(e.target.value);
        });
    }

    // 5. Form Submission Handling (Mock)
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = translations[currentLang].alert_sending;
            btn.style.opacity = '0.8';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert(translations[currentLang].alert_success);
                bookingForm.reset();
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 1500);
        });
    }
});
