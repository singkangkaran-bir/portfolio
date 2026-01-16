/* --- CONFIGURAZIONE INIZIALE --- */
let currentLang = "it";

document.addEventListener("DOMContentLoaded", () => {
    
    // --- ELEMENTI DOM ---
    const langToggle = document.getElementById("langToggle");
    const langText = document.getElementById("current-lang");
    const navbar = document.querySelector(".navbar");
    
    // CAMBIO QUI: Cerchiamo il nuovo bottone magico tramite ID
    const magicBtn = document.getElementById("magic-button");

    /* --- GESTIONE CAMBIO LINGUA (IT/EN) --- */
    if (langToggle) {
        langToggle.addEventListener("click", () => {
            currentLang = currentLang === "it" ? "en" : "it";
            if (langText) {
                langText.innerText = currentLang.toUpperCase();
            }
            
            document.querySelectorAll("[data-it]").forEach((el) => {
                const newText = el.getAttribute(`data-${currentLang}`);
                if (newText) {
                    el.innerText = newText;
                }
            });
        });
    }

    /* --- SCROLL FLUIDO PER NAVBAR E HERO --- */
    document.querySelectorAll(".nav-center a, .hero-cta a").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            // Se è il download del CV o un link esterno, non fare lo scroll fluido
            if (this.classList.contains("nav-cv") || this.hasAttribute('download') || this.getAttribute('href').startsWith('http')) return;

            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });

/* --- EFFETTO CORIANDOLI TECH (Easter Egg) con SUONO MUSICALE --- */
    if (magicBtn) {
        // Ho scelto un suono musicale armonioso (arpeggio magico)
        const magicSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3');
        magicSound.volume = 0.4; // Leggermente più alto perché è più dolce

        magicBtn.addEventListener('click', function() {
            // Riproduce il suono armonioso
            magicSound.currentTime = 0;
            magicSound.play();

            const techIcons = [
                'fa-laptop', 'fa-microchip', 'fa-server', 'fa-code', 
                'fa-database', 'fa-network-wired', 'fa-robot', 'fa-terminal',
                'fa-memory', 'fa-satellite-dish'
            ];
            const colors = ['#00f2ff', '#7000ff', '#ffffff', '#667eea'];

            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('i');
                const randomIcon = techIcons[Math.floor(Math.random() * techIcons.length)];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                confetti.className = `fa-solid ${randomIcon} tech-confetti`;
                
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-50px';
                confetti.style.color = randomColor;
                
                const duration = Math.random() * 3 + 2 + 's';
                confetti.style.animationDuration = duration;
                confetti.style.fontSize = Math.random() * 25 + 15 + 'px';

                document.body.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }
        });
    }
    /* --- EFFETTO NAVBAR ALLO SCROLL --- */
    window.addEventListener("scroll", () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = "rgba(5, 5, 5, 0.95)";
                navbar.style.padding = "10px 0";
            } else {
                navbar.style.background = "rgba(5, 5, 5, 0.8)";
                navbar.style.padding = "0";
            }
        }
    });
});