/* ========================================
   Dra Niclesia Dias - Advocacia | JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 500);
    });

    // --- Particles Effect ---
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random properties
        const size = Math.random() * 3 + 1; // 1 to 4px
        const left = Math.random() * 100; // 0 to 100vw
        const duration = Math.random() * 15 + 10; // 10 to 25s
        const delay = Math.random() * 5; // 0 to 5s

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + 'vw';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        // Color variation (Gold and White)
        if (Math.random() > 0.7) {
            particle.style.background = '#FFFFFF';
            particle.style.boxShadow = '0 0 5px rgba(255,255,255,0.5)';
        } else {
            particle.style.background = '#C5A059';
            particle.style.boxShadow = '0 0 5px rgba(197, 160, 89, 0.5)';
        }

        particlesContainer.appendChild(particle);

        // Remove and recreate to keep layout clean if needed (Not strictly necessary due to infinite loop, but good practice for mem)
    }

    // --- Navbar & Scroll Events ---
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Sticky Navbar
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to Top Button
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Mobile Menu Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Scroll Animations Intersection Observer ---
    const animationElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.getAttribute('data-delay');

                if (delay) {
                    setTimeout(() => {
                        el.classList.add('animated');
                    }, parseInt(delay));
                } else {
                    el.classList.add('animated');
                }

                observer.unobserve(el); // Animate only once
            }
        });
    }, observerOptions);

    animationElements.forEach(el => observer.observe(el));

    // --- Contact Form (WhatsApp Redirect) ---
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const area = document.getElementById('area').value;
            const message = document.getElementById('message').value;

            const text = `*Solicitação de Agendamento - Site*\n\n*Nome:* ${name}\n*Telefone:* ${phone}\n*Área de Interesse:* ${area}\n*Resumo do Caso:* ${message}`;
            const encodedText = encodeURIComponent(text);
            const whatsappNumber = '5579999288881'; // WhatsApp da Dra Niclesia Dias

            window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
        });
    }

});
