document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated if you only want it to happen once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const navbarContainer = navbar.querySelector('div');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbarContainer.classList.add('nav-scrolled');
        } else {
            navbarContainer.classList.remove('nav-scrolled');
        }
    });

    // 3. Form Handling (Mock)
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = appointmentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Booking...';
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
            
            // WhatsApp Integration
            const name = document.getElementById('form-name').value;
            const phone = document.getElementById('form-phone').value;
            const email = document.getElementById('form-email').value;
            const treatment = document.getElementById('form-treatment').value;
            const date = document.getElementById('form-date').value;
            const time = document.getElementById('form-time').value;
            const message = document.getElementById('form-message').value;

            const whatsappMessage = `*New Appointment Request* 🦷\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Treatment:* ${treatment}\n*Date:* ${date}\n*Time:* ${time}\n*Symptoms/Message:* ${message}`;
            
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappNumber = "919655456322"; // Clinic number
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');

            // Reset form
            appointmentForm.reset();
            submitBtn.innerText = originalText;
            submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
        });
    }

    // 4. Popup Notification
    const popup = document.getElementById('welcome-popup');
    const popupContent = document.getElementById('popup-content');
    const closePopupBtn = document.getElementById('close-popup');
    const popupBackdrop = document.getElementById('popup-backdrop');
    const popupBookBtn = document.getElementById('popup-book-btn');

    if (popup) {
        // Show popup after 2.5 seconds
        setTimeout(() => {
            popup.classList.remove('hidden');
            // Small delay to allow display:block to apply before animating opacity/scale
            setTimeout(() => {
                popupContent.classList.remove('scale-95', 'opacity-0');
                popupContent.classList.add('scale-100', 'opacity-100');
            }, 50);
        }, 2500);

        const closePopup = () => {
            popupContent.classList.remove('scale-100', 'opacity-100');
            popupContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                popup.classList.add('hidden');
            }, 300); // Wait for transition to finish
        };

        closePopupBtn.addEventListener('click', closePopup);
        popupBackdrop.addEventListener('click', closePopup);
        popupBookBtn.addEventListener('click', closePopup);
    }
});
