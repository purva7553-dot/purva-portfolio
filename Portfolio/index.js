
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // MOBILE NAVIGATION
    // =========================

    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        if (!menuToggle || !navbar) return;

        navbar.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';
    }

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navbar.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.forEach(function (item) {
                    item.classList.remove("active");
                });

                link.classList.add("active");
                closeMenu();
            });
        });

        document.addEventListener("click", function (event) {
            if (
                navbar.classList.contains("open") &&
                !navbar.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth >= 768) {
                closeMenu();
            }
        });
    }

    // =========================
    // ACTIVE LINK ON SCROLL
    // =========================

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    function updateActiveLink() {
        let currentSection = "home";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 130;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(function (link) {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + currentSection
            );
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    // =========================
    // CURRENT YEAR
    // =========================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // =========================
    // CHECK PROFILE IMAGES
    // =========================

    document.querySelectorAll(
        ".hero-image, .about-photo"
    ).forEach(function (image) {

        image.addEventListener("error", function () {
            console.error(
                "Image not found. Please check the image path:",
                image.getAttribute("src")
            );
        });

        image.addEventListener("load", function () {
            console.log(
                "Image loaded successfully:",
                image.getAttribute("src")
            );
        });
    });

    // =========================
    // SOCIAL PROFILE LINKS
    // =========================

    document.querySelectorAll(".social-link").forEach(
        function (link) {
            link.addEventListener("click", function (event) {
                const url = link.getAttribute("href");

                if (
                    !url ||
                    url === "#" ||
                    url.includes("your-actual-username") ||
                    url.includes("your-actual-profile")
                ) {
                    event.preventDefault();

                    alert(
                        "Please add your actual GitHub or LinkedIn profile URL in index.html."
                    );
                }
            });
        }
    );

    // =========================
    // CONTACT FORM VALIDATION
    // =========================

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameField = document.getElementById("name");
            const emailField = document.getElementById("email");
            const messageField = document.getElementById("message");

            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const message = messageField.value.trim();

            if (!name || !email || !message) {
                formStatus.textContent =
                    "Please fill in all fields.";
                return;
            }

            if (!emailField.checkValidity()) {
                formStatus.textContent =
                    "Please enter a valid email address.";
                emailField.focus();
                return;
            }

            const recipient = "purva7553@gmail.com";

            const subject = encodeURIComponent(
                "Portfolio Contact - " + name
            );

            const body = encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\n\nMessage:\n" + message
            );

            formStatus.textContent =
                "Opening your email application...";

            window.location.href =
                "mailto:" + recipient +
                "?subject=" + subject +
                "&body=" + body;
        });
    }

});