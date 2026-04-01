// --- 1. Typewriter Effect for Name ---
const nameText = "Deepak Kumar Sharma";
const typewriterElement = document.getElementById("typewriter");
let i = 0;
let isTyping = true;

function typeWriter() {
    if (i < nameText.length) {
        typewriterElement.innerHTML = nameText.substring(0, i + 1) + '<span class="cursor">|</span>';
        i++;
        setTimeout(typeWriter, 100);
    } else {
        // Blinking cursor after typing finishes
        typewriterElement.innerHTML = nameText + '<span class="cursor">|</span>';
    }
}

// Start typing effect on load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
    document.getElementById('year').textContent = new Date().getFullYear();
});

// --- 2. Galaxy / Starfield Canvas Animation ---
const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- Background & Star Theme ---
const themeColors = ['#00f3fe', '#bc13fe', '#ff007f', '#00ff00', '#ffea00', '#ffffff'];
const bgImage = "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2500&auto=format&fit=crop')";

document.getElementById('bg-layer-1').style.backgroundImage = bgImage;

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * width;
        this.radius = Math.random() * 2 + 1; // Slightly larger stars
        // Speeds corresponding to 'deep space' feel
        this.speed = (Math.random() * 0.5) + 0.1;

        // Take colors from the active theme
        this.color = themeColors[Math.floor(Math.random() * themeColors.length)];
        this.glow = Math.random() * 15 + 5; // Glowing effect
    }

    update() {
        this.x -= this.speed;
        this.y -= this.speed * 0.5;

        // Wrap around smoothly to maintain uniform density across the entire screen
        if (this.x < -this.radius) {
            this.x = width + this.radius;
            // Get a fresh neon color when wrapping
            this.color = themeColors[Math.floor(Math.random() * themeColors.length)];
        }
        if (this.y < -this.radius) {
            this.y = height + this.radius;
            this.color = themeColors[Math.floor(Math.random() * themeColors.length)];
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.glow;
        ctx.shadowColor = this.color;
        
        ctx.fill();
        
        // Reset shadow for next drawing operations
        ctx.shadowBlur = 0;
    }
}

function initStars() {
    stars = [];
    const numStars = Math.floor(width * height / 4000); // Responsive amount of stars
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animateStars() {
    ctx.clearRect(0, 0, width, height);
    
    // Add a slight dark overlay to keep text readable against the bright galaxy 
    ctx.fillStyle = 'rgba(5, 7, 12, 0.4)';
    ctx.fillRect(0, 0, width, height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animateStars);
}

initStars();
animateStars();

// --- 3. Mobile Navigation Menu ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if(navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// --- 4. Project Modals ---
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');

// Dummy data for projects
const projectData = {
    project1: {
        title: "Smart Road Safety Framework in Hilly Terrains",
        description: "Developed a real-time road safety system designed for hilly terrains to detect hazards and provide terrain-aware alerts. Built a Python-based interface using OpenCV and PyTorch to simulate vehicle movement and environmental conditions.",
        techStack: ["Microcontrollers", "IoT Sensors", "Python (OpenCV, PyTorch)", "Wireless Communication"],
        impact: "Helps reduce accidents by improving driver awareness and predicting potential hazards in low-visibility and complex road conditions."
    },
    project2: {
        title: "FSM-Based Traffic Signal Controller",
        description: "Designed a traffic signal controller using Finite State Machine (FSM) concepts in Verilog HDL. Focused on sequential logic design and accurate state transitions for real-time signal control.",
        techStack: ["Verilog HDL", "ModelSim", "Digital Design Concepts", "RTL Simulation"],
        impact: "Improved understanding of RTL design and debugging by resolving issues related to reset sequencing, timing constraints, and simulation accuracy."
    },
    project3: {
        title: "Mini-Chip Design using OpenLane",
        description: "Implemented a complete RTL-to-GDS ASIC design flow for a mini chip integrating ALU, FIFO, and Counter modules using OpenLane toolchain.",
        techStack: ["OpenLane", "Verilog HDL", "KLayout", "ASIC Design Flow"],
        impact: "Achieved successful timing closure with positive setup and hold slack, and verified final chip layout ensuring design correctness."
    }
};

window.openModal = function(projectId) {
    const data = projectData[projectId];
    if (data) {
        modalBody.innerHTML = `
            <div class="modal-body-content">
                <h2>${data.title}</h2>
                <p><strong>Description:</strong> ${data.description}</p>
                <p><strong>Impact:</strong> ${data.impact}</p>
                <h3>Technologies Used:</h3>
                <ul>
                    ${data.techStack.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            </div>
        `;
        modal.classList.add('show');
    }
}

window.closeModal = function() {
    modal.classList.remove('show');
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// --- 5. Contact Form Silent Submission ---
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function() {
        // We let the form submit natively to hit FormSubmit.co securely within the hidden iframe
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Transmitting... ⚡';
        submitBtn.disabled = true;
        
        // Wait briefly to simulate the transmission, then show the flawless UI popup
        setTimeout(() => {
            contactForm.reset();
            formMessage.textContent = 'Transmission Successful! System data delivered smoothly. ✨';
            formMessage.className = 'form-message success';
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Fade out the success message beautifully after 5 seconds
            setTimeout(() => {
                formMessage.style.opacity = '0';
                setTimeout(() => { formMessage.className = 'form-message'; formMessage.style.opacity = ''; }, 300);
            }, 5000);
        }, 1500);
    });
}
