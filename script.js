// 1. Single-Run Typewriter Effect
document.addEventListener("DOMContentLoaded", () => {
    const line1Text = "Ankan";
    const line2Text = "Karmakar.";
    const line1El = document.getElementById("type-line-1");
    const line2El = document.getElementById("type-line-2");
    
    let i = 0;
    let j = 0;
    const typingSpeed = 100; 

    function typeLine1() {
        if (i < line1Text.length) {
            line1El.innerHTML += line1Text.charAt(i);
            i++;
            setTimeout(typeLine1, typingSpeed);
        } else {
            setTimeout(typeLine2, 200); 
        }
    }

    function typeLine2() {
        if (j < line2Text.length) {
            line2El.innerHTML += line2Text.charAt(j);
            j++;
            setTimeout(typeLine2, typingSpeed);
        } else {
            gsap.to("#fade-subtitle", { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
            gsap.to("#fade-desc", { opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" });
        }
    }

    setTimeout(typeLine1, 500);
});

// 2. Mouse Tracking Logic
const tiltImage = document.getElementById('tilt-image');

document.addEventListener('mousemove', (e) => {
    let moveX = (e.pageX - (window.innerWidth / 2)) / 15; 
    let moveY = (e.pageY - (window.innerHeight / 2)) / 15;
    tiltImage.style.transform = `translate(${moveX}px, ${moveY}px) rotateY(${moveX/2}deg) rotateX(${-moveY/2}deg) scale3d(1.02, 1.02, 1.02)`;
});

document.addEventListener('mouseleave', () => {
    tiltImage.style.transform = `translate(0px, 0px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
});

// 3. Custom Particle System
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; 
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = Math.random() > 0.3 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(230, 0, 0, 0.6)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// 4. GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);
const fadeUpItems = document.querySelectorAll('.gsap-fade-up');
fadeUpItems.forEach(item => {
    gsap.fromTo(item, 
        { opacity: 0, y: 30 },
        {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }
    );
});


