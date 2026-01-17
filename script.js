window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const bar = document.querySelector(".loader-bar-fill");
    const status = document.querySelector(".loader-status");
    
    // Simulazione di caricamento progressivo
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            
            // Piccola pausa sul 100% per fluidità visiva
            setTimeout(() => {
                loader.classList.add("loader-hidden");
            }, 500);
        } else {
            width += Math.random() * 15; // Incremento randomico per sembrare reale
            if (width > 100) width = 100;
            bar.style.width = width + "%";
            
            // Cambio testo opzionale durante il caricamento
            if(width > 70) {
                status.innerText = currentLang === "it" ? "Analisi dati completata..." : "Data analysis complete...";
            }
        }
    }, 150);
});

// Inizializzazione 3D Semplificata
const container = document.getElementById('avatar-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Creazione "Omino Stilizzato" (Robot di luce)
const bodyGroup = new THREE.Group();
const material = new THREE.MeshPhongMaterial({ color: 0x00f2ff, emissive: 0x00f2ff, emissiveIntensity: 0.5 });

// Testa
const head = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), material);
head.position.y = 1.6;
bodyGroup.add(head);

// Torso
const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.2, 1, 32), material);
torso.position.y = 0.8;
bodyGroup.add(torso);

scene.add(bodyGroup);
camera.position.z = 5;

// Luce
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x00f2ff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Animazione e Eye-Tracking (il corpo segue il mouse)
document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) - 0.5;
    const mouseY = (e.clientY / window.innerHeight) - 0.5;
    gsap.to(bodyGroup.rotation, { y: mouseX * 0.5, x: mouseY * 0.2, duration: 0.5 });
});

// Animazione Scroll
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    
    // L'omino scende e ruota mentre scendi
    bodyGroup.position.y = -scrollPercent * 10;
    bodyGroup.rotation.z = scrollPercent * 2;
    
    // Quando arrivi alla sezione About, mostriamo la foto
    const aboutSection = document.querySelector('.about-section');
    if (window.scrollY > aboutSection.offsetTop - 400) {
        document.querySelector('.about-image-container').classList.add('show-photo');
    }
});

function animate() {
    requestAnimationFrame(animate);
    // Movimento "respiro" automatico
    bodyGroup.position.y += Math.sin(Date.now() * 0.002) * 0.001;
    renderer.render(scene, camera);
}
animate();

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