/* =========================
   NOVA ELITE
   JavaScript
========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       Loader
    ========================= */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 700);
    });


    /* =========================
       Header
    ========================= */

    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });


    /* =========================
       Mobile Menu
    ========================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
        });
    });


    /* =========================
       Active Navigation
    ========================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    const updateActiveLink = () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateActiveLink);


    /* =========================
       Scroll Reveal
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       Animated Statistics
    ========================= */

    const counters = document.querySelectorAll("[data-target]");

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = Number(counter.dataset.target);
                let current = 0;

                const duration = 1600;
                const increment = target / (duration / 16);

                const updateCounter = () => {

                    current += increment;

                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }

                };

                updateCounter();

                counterObserver.unobserve(counter);
            });

        },
        {
            threshold: .7
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =========================
       Reviews Slider
    ========================= */

    const reviews = [
        {
            text: "فريق NOVA ELITE فهم رؤيتنا من أول اجتماع وحولها إلى تجربة رقمية أفضل مما كنا نتخيل.",
            name: "محمد أحمد",
            role: "CEO — Orbit",
            avatar: "م"
        },
        {
            text: "الاهتمام بالتفاصيل كان واضحًا في كل جزء من المشروع. النتيجة كانت احترافية وسريعة جدًا.",
            name: "سارة علي",
            role: "Founder — Monarch",
            avatar: "س"
        },
        {
            text: "احتجنا موقعًا يعكس قيمة علامتنا التجارية، وNOVA ELITE قدمت لنا تجربة تتجاوز توقعاتنا.",
            name: "أحمد سامي",
            role: "Director — Apex",
            avatar: "أ"
        }
    ];

    let currentReview = 0;

    const reviewText = document.getElementById("reviewText");
    const authorName = document.getElementById("authorName");
    const authorRole = document.getElementById("authorRole");
    const authorAvatar = document.getElementById("authorAvatar");
    const reviewCount = document.getElementById("reviewCount");

    function showReview(index) {

        const review = reviews[index];

        reviewText.style.opacity = "0";
        authorName.style.opacity = "0";
        authorRole.style.opacity = "0";

        setTimeout(() => {

            reviewText.textContent = review.text;
            authorName.textContent = review.name;
            authorRole.textContent = review.role;
            authorAvatar.textContent = review.avatar;

            reviewCount.textContent =
                `${String(index + 1).padStart(2, "0")} / ${String(reviews.length).padStart(2, "0")}`;

            reviewText.style.opacity = "1";
            authorName.style.opacity = "1";
            authorRole.style.opacity = "1";

        }, 200);
    }

    document.getElementById("nextReview").addEventListener("click", () => {

        currentReview++;

        if (currentReview >= reviews.length) {
            currentReview = 0;
        }

        showReview(currentReview);

    });

    document.getElementById("prevReview").addEventListener("click", () => {

        currentReview--;

        if (currentReview < 0) {
            currentReview = reviews.length - 1;
        }

        showReview(currentReview);

    });


    /* =========================
       Contact Form
    ========================= */

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const button = contactForm.querySelector("button");

        button.innerHTML = "جاري الإرسال...";

        setTimeout(() => {

            formMessage.textContent =
                "تم إرسال طلبك بنجاح. سنتواصل معك قريبًا.";

            button.innerHTML = "تم الإرسال ✓";

            contactForm.reset();

            setTimeout(() => {
                button.innerHTML = 'إرسال الطلب <span>←</span>';
            }, 3000);

        }, 1000);

    });


    /* =========================
       Smooth Anchor Links
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================
       Mouse Parallax
    ========================= */

    const heroVisual = document.querySelector(".hero-visual");
    const dashboard = document.querySelector(".dashboard-card");

    if (window.innerWidth > 900 && heroVisual && dashboard) {

        heroVisual.addEventListener("mousemove", event => {

            const rect = heroVisual.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - .5;
            const y = (event.clientY - rect.top) / rect.height - .5;

            dashboard.style.transform =
                `perspective(1000px) rotateY(${x * 8 - 5}deg) rotateX(${y * -6 + 3}deg)`;

        });

        heroVisual.addEventListener("mouseleave", () => {

            dashboard.style.transform =
                "perspective(1000px) rotateY(-5deg) rotateX(3deg)";

        });

    }

});