document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            // Change icon
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
                body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                icon.setAttribute('data-lucide', 'menu');
                body.style.overflow = 'auto';
            }
            lucide.createIcons();
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').setAttribute('data-lucide', 'menu');
                body.style.overflow = 'auto';
                lucide.createIcons();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && e.target !== menuToggle) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').setAttribute('data-lucide', 'menu');
                body.style.overflow = 'auto';
                lucide.createIcons();
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // Sticky Header
    const header = document.querySelector('header');
    const headerContainer = document.querySelector('.header-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            headerContainer.style.padding = '12px 20px';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            headerContainer.style.padding = '20px 20px';
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    });

    // Form Submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const container = btn.parentElement;
            const originalText = btn.innerText;

            btn.innerText = 'Processing...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                const successMsg = document.createElement('p');
                successMsg.innerText = '✓ Application received successfully!';
                successMsg.style.color = 'var(--success)';
                successMsg.style.marginTop = '15px';
                successMsg.style.fontWeight = '600';
                successMsg.style.animation = 'fadeIn 0.5s ease-out';

                form.appendChild(successMsg);
                btn.innerText = originalText;
                btn.disabled = false;
                form.reset();

                setTimeout(() => successMsg.remove(), 5000);
            }, 1000);
        });
    });
});

// Add keyframes for fadeIn if not in CSS
if (!document.querySelector('#dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}
