document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close navbar on link click for small screens
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    });

    // Dark Mode Toggle Functionality
    const enableDarkMode = () => {
        body.classList.add('dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    };

    const disableDarkMode = () => {
        body.classList.remove('dark');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    };

    // Apply stored theme or detect system preference
    if (currentTheme === 'dark') {
        enableDarkMode();
    } else if (currentTheme === 'light') {
        disableDarkMode();
    } else {
        // Auto-detect prefers-color-scheme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }

    // Listener for dark mode toggle button
    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Listener for system color scheme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (localStorage.getItem('theme') === null) { // Only auto-switch if no user preference is set
            if (event.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent actual form submission
        alert('¡Mensaje enviado! 📧 Gracias por contactarme, Juan Pérez te responderá pronto.');
        contactForm.reset(); // Clear the form fields
    });
});