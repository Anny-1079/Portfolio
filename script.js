document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuIcon && mobileMenu) {
        mobileMenuIcon.addEventListener('click', () => {
            mobileMenuIcon.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            // Toggle body scroll
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuIcon.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    // Cinematic Studio - Spotlight & Parallax Effect (Hero + About)
    const interactSections = document.querySelectorAll('.cinematic-studio, .studio-kinetic');
    const spotlightTargets = document.querySelectorAll('.spotlight-target, .spotlight-effect');

    interactSections.forEach(section => {
        section.addEventListener('mousemove', (e) => {
            spotlightTargets.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (!section.contains(card)) return;

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
        });

        section.addEventListener('mouseleave', () => {
            spotlightTargets.forEach(card => {
                if (!section.contains(card)) return;
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
            });
        });
    });

    // Cinematic Reveal Trigger
    const heroSection = document.querySelector('.cinematic-studio');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('is-loaded');
        }, 1200);
    }

    // Studio Card 'See More' Toggle Logic
    const cardToggleBtns = document.querySelectorAll('.card-toggle-btn');

    cardToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Prevent event bubbling if necessary
            e.stopPropagation();

            const card = btn.closest('.studio-card');
            const btnText = btn.querySelector('.btn-text');

            // Toggle expanded class on the card
            card.classList.toggle('expanded');

            // Update button text based on state
            if (card.classList.contains('expanded')) {
                btnText.textContent = 'CLOSE';
            } else {
                btnText.textContent = 'SEE MORE';
            }
        });
    });

    // Certificates Lightbox Logic
    const lightboxModal = document.getElementById('cert-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const viewCertBtns = document.querySelectorAll('.cert-image-wrapper'); // Allowing click on the whole image wrapper for better UX

    if (lightboxModal && lightboxImg) {
        // Open lightbox
        viewCertBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Find the specific button to get the data-cert URL, or fallback to the img src
                const targetBtn = btn.querySelector('.view-cert-btn');
                const targetImg = btn.querySelector('.cert-img');

                const certUrl = targetBtn ? targetBtn.getAttribute('data-cert') : targetImg.src;

                lightboxImg.src = certUrl;
                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        // Close lightbox on X click
        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightboxModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Close lightbox when clicking outside the image
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: Stop observing once revealed
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => revealObserver.observe(el));
    // Contact Form AJAX Submit
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://formspree.io/f/meernvjo', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert(' Message sent successfully! I\'ll get back to you soon.');
                contactForm.reset();
            } else {
                alert(' Something went wrong. Please try again.');
            }
        } catch (error) {
            alert(' Network error. Please check your connection.');
        }
    });
}
});
