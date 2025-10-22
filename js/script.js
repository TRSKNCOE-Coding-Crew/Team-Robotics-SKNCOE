// Particle System
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 75; // Reduced for better performance

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor(x, y, size, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.originalSize = size;
    }

    update() {
        if (this.x < 0 || this.x > canvas.width) {
            this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Pulsing effect
        this.size = this.originalSize + Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.5;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
    }
}

function initParticles() {
    particles = [];
    const count = getParticleCount();
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = (Math.random() - 0.5) * 0.8;
        const speedY = (Math.random() - 0.5) * 0.8;
        const color = `rgba(255, ${Math.floor(102 + Math.random() * 153)}, 0, ${0.4 + Math.random() * 0.4})`;
        particles.push(new Particle(x, y, size, color, speedX, speedY));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 0;
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateParticles);
}

function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            const distance = Math.sqrt(
                (particles[a].x - particles[b].x) * (particles[a].x - particles[b].x) +
                (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y)
            );

            if (distance < 80) { // Reduced connection distance
                opacityValue = 1 - (distance / 80);
                ctx.strokeStyle = `rgba(255, 102, 0, ${opacityValue * 0.3})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.backdropFilter = 'blur(25px)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
        header.style.backdropFilter = 'blur(20px)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.card, .team-card, .achievement-card, .gallery-item, .project-tile, .robocon-grid img, .robocon-year');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

//---------------------------------------------------------------------
// ✅ Robocon Lightbox functionality (Fixed)
document.addEventListener('DOMContentLoaded', () => {
  const roboconImages = document.querySelectorAll('.robocon-grid img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');

  roboconImages.forEach(img => {
    img.addEventListener('click', () => {
      const title = img.alt || "Robocon Moment";
      lightboxImg.src = img.src;
      lightboxImg.alt = title;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = "Captured moment from " + title;

      lightbox.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });
});


// Gallery functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-desc');
const lightboxClose = document.querySelector('.lightbox-close');



// Gallery filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Gallery lightbox functionality
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-overlay h4').textContent;
        const desc = item.querySelector('.gallery-overlay p').textContent;
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});



// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
        border: 1px solid ${type === 'success' ? '#00ff00' : '#ff0000'};
        border-radius: 10px;
        color: ${type === 'success' ? '#00ff00' : '#ff0000'};
        font-family: var(--body-font);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Interactive Holographic Display and Mouse Effects
const holographicDisplay = document.getElementById('holographic-display');
const mouseTrailCanvas = document.getElementById('mouse-trail-canvas');
const dynamicBackground = document.getElementById('dynamic-background');
const mouseTrailCtx = mouseTrailCanvas.getContext('2d');

// Set canvas size
mouseTrailCanvas.width = window.innerWidth;
mouseTrailCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    mouseTrailCanvas.width = window.innerWidth;
    mouseTrailCanvas.height = window.innerHeight;
});

// Mouse trail particles
let trailParticles = [];
const maxTrailParticles = 30;

class TrailParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.life = 1.0;
        this.decay = Math.random() * 0.03 + 0.01;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3;
        this.color = `hsl(${Math.floor(Math.random() * 60 + 20)}, 100%, ${Math.floor(Math.random() * 30 + 50)}%)`;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.vx *= 0.98;
        this.vy *= 0.98;
    }
    
    draw() {
        mouseTrailCtx.save();
        mouseTrailCtx.globalAlpha = this.life;
        mouseTrailCtx.fillStyle = this.color;
        mouseTrailCtx.beginPath();
        mouseTrailCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        mouseTrailCtx.fill();
        mouseTrailCtx.restore();
    }
}

// Mouse tracking variables
let mouseX = 0;
let mouseY = 0;

// 3D Mouse Tracking for Holographic Display
function init3DMouseTracking() {
    const holographicDisplay = document.getElementById('holographic-display');
    if (!holographicDisplay) {
        console.log('Holographic display not found');
        return;
    }

    console.log('Initializing 3D mouse tracking');
    holographicDisplay.classList.add('mouse-tracking');

    // Mouse move handler for 3D effect
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Get holographic display position and dimensions
        const rect = holographicDisplay.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate mouse position relative to display center (improved calculation)
        const deltaX = (mouseX - centerX) / (rect.width / 2);
        const deltaY = (mouseY - centerY) / (rect.height / 2);

        // Calculate rotation angles (limit the rotation)
        const maxRotation = 20; // Maximum rotation in degrees
        const rotateY = deltaX * maxRotation;
        const rotateX = -deltaY * maxRotation;

        // Calculate translation for depth effect
        const maxTranslate = 15;
        const translateZ = (Math.abs(deltaX) + Math.abs(deltaY)) * maxTranslate;

        // Apply 3D transform with proper perspective
        holographicDisplay.style.transformStyle = 'preserve-3d';
        holographicDisplay.style.transform = `
            perspective(1200px) 
            rotateY(${rotateY}deg) 
            rotateX(${rotateX}deg) 
            translateZ(${translateZ}px)
            scale(${1 + (Math.abs(deltaX) + Math.abs(deltaY)) * 0.03})
        `;

        // Add subtle glow effect based on mouse proximity
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const glowIntensity = Math.max(0.4, 1 - distance * 0.5);
        
        holographicDisplay.style.boxShadow = `
            0 0 ${60 + glowIntensity * 40}px rgba(255, 102, 0, ${0.4 + glowIntensity * 0.2}),
            inset 0 0 ${60 + glowIntensity * 40}px rgba(255, 102, 0, ${0.1 + glowIntensity * 0.1}),
            0 ${20 + translateZ}px ${40 + translateZ}px rgba(0, 0, 0, 0.3)
        `;
    });

    // Reset transform when mouse leaves the viewport
    document.addEventListener('mouseleave', () => {
        holographicDisplay.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)';
        holographicDisplay.style.boxShadow = `
            0 0 60px rgba(255, 102, 0, 0.4),
            inset 0 0 60px rgba(255, 102, 0, 0.1),
            0 20px 40px rgba(0, 0, 0, 0.3)
        `;
    });
}

// Initialize 3D mouse tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing 3D tracking');
    init3DMouseTracking();
});

// Also try to initialize after a short delay in case of timing issues
setTimeout(() => {
    init3DMouseTracking();
}, 1000);

// Mouse move handler
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Add trail particles
    if (trailParticles.length < maxTrailParticles) {
        trailParticles.push(new TrailParticle(mouseX, mouseY));
    }
    
    // Update dynamic background
    const centerX = (mouseX / window.innerWidth) * 100;
    const centerY = (mouseY / window.innerHeight) * 100;
    dynamicBackground.style.background = `radial-gradient(circle at ${centerX}% ${centerY}%, rgba(255, 102, 0, 0.08) 0%, transparent 70%)`;
    
    // Holographic display interaction
    if (holographicDisplay) {
        const displayRect = holographicDisplay.getBoundingClientRect();
        const displayCenterX = displayRect.left + displayRect.width / 2;
        const displayCenterY = displayRect.top + displayRect.height / 2;
        
        const deltaX = mouseX - displayCenterX;
        const deltaY = mouseY - displayCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Display tilt based on mouse position
        const maxTilt = 8;
        const tiltX = (deltaY / distance) * maxTilt;
        const tiltY = (deltaX / distance) * maxTilt;
        
        holographicDisplay.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
        
        // Display brightness based on mouse proximity
        const maxDistance = 400;
        const intensity = Math.max(0.5, 1 - (distance / maxDistance) * 0.5);
        
        holographicDisplay.style.filter = `brightness(${1 + intensity * 0.3}) saturate(${1 + intensity * 0.2})`;
        
        // Data bars animation based on mouse proximity
        const dataItems = document.querySelectorAll('.data-item');
        dataItems.forEach((item, index) => {
            const proximity = Math.max(0, 1 - (distance / maxDistance));
            const delay = index * 0.1;
            
            setTimeout(() => {
                const dataFill = item.querySelector('.data-fill');
                if (dataFill) {
                    dataFill.style.animation = 'none';
                    dataFill.offsetHeight; // Trigger reflow
                    dataFill.style.animation = `dataFill ${1 + proximity}s ease-out forwards`;
                }
            }, delay * 1000);
        });
        
        // Particle effects intensity
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const particleIntensity = Math.min(1, distance / 300);
            particle.style.opacity = 0.3 + (1 - particleIntensity) * 0.7;
            particle.style.transform = `scale(${1 + (1 - particleIntensity) * 0.5})`;
        });
        
        // Scan line speed based on mouse movement
        const scanLine = document.querySelector('.scan-line-animated');
        if (scanLine) {
            const speed = Math.max(4, 8 - (distance / maxDistance) * 4);
            scanLine.style.animationDuration = `${speed}s`;
        }
    }
});

// Mouse leave handler
document.addEventListener('mouseleave', () => {
    if (holographicDisplay) {
        holographicDisplay.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        holographicDisplay.style.filter = 'brightness(1) saturate(1)';
    }
    
    // Reset background
    dynamicBackground.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 102, 0, 0.05) 0%, transparent 70%)';
});

// Animation loop for trail particles
function animateTrail() {
    mouseTrailCtx.clearRect(0, 0, mouseTrailCanvas.width, mouseTrailCanvas.height);
    
    // Update and draw particles
    trailParticles = trailParticles.filter(particle => {
        particle.update();
        particle.draw();
        return particle.life > 0;
    });
    
    requestAnimationFrame(animateTrail);
}

// Start trail animation
animateTrail();

// Data counter animation
function animateDataCounters() {
    const dataValues = document.querySelectorAll('.data-value');
    
    dataValues.forEach((value, index) => {
        const target = value.textContent.replace(/\D/g, '');
        const suffix = value.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 60;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            value.textContent = Math.floor(current) + suffix;
        }, 50 + index * 20);
    });
}

// Trigger counter animation when hologram is visible
const hologramObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                animateDataCounters();
            }, 1000);
            hologramObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    if (holographicDisplay) {
        hologramObserver.observe(holographicDisplay);
    }
});
// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hologramContainer = document.querySelector('.hologram-container');
    
    if (hologramContainer) {
        hologramContainer.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Team card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Achievement timeline animation
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
});

// Stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + suffix;
        }, 20);
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// METEOR Animation
const meteorCanvas = document.getElementById('meteor-canvas');
const meteorCtx = meteorCanvas.getContext('2d');
let meteorParticles = [];

function initMeteorAnimation() {
    meteorCanvas.width = window.innerWidth;
    meteorCanvas.height = window.innerHeight;

    // Create meteor particles
    for (let i = 0; i < 10; i++) {
        meteorParticles.push({
            x: Math.random() * meteorCanvas.width,
            y: -50,
            speedX: Math.random() * 5 + 2,
            speedY: Math.random() * 5 + 2,
            size: Math.random() * 3 + 1,
            opacity: 1,
            trail: []
        });
    }

    animateMeteors();
}

function animateMeteors() {
    meteorCtx.clearRect(0, 0, meteorCanvas.width, meteorCanvas.height);

    meteorParticles.forEach((particle, index) => {
        // Update trail
        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity });
        if (particle.trail.length > 20) particle.trail.shift();

        // Draw trail
        particle.trail.forEach((point, i) => {
            meteorCtx.save();
            meteorCtx.globalAlpha = point.opacity * (i / particle.trail.length);
            meteorCtx.fillStyle = `rgba(255, 102, 0, ${point.opacity})`;
            meteorCtx.beginPath();
            meteorCtx.arc(point.x, point.y, particle.size * (i / particle.trail.length), 0, Math.PI * 2);
            meteorCtx.fill();
            meteorCtx.restore();
        });

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.opacity -= 0.005;

        // Reset if off-screen
        if (particle.y > meteorCanvas.height || particle.x > meteorCanvas.width || particle.opacity <= 0) {
            particle.x = Math.random() * meteorCanvas.width;
            particle.y = -50;
            particle.opacity = 1;
            particle.trail = [];
        }
    });

    requestAnimationFrame(animateMeteors);
}

// Initialize METEOR on load
document.addEventListener('DOMContentLoaded', () => {
    if (meteorCanvas) {
        initMeteorAnimation();
    }

    // Fun interaction: Click to create explosion effect
    meteorCanvas.addEventListener('click', (e) => {
        const explosion = {
            x: e.clientX,
            y: e.clientY,
            particles: []
        };
        for (let i = 0; i < 20; i++) {
            explosion.particles.push({
                x: explosion.x,
                y: explosion.y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1
            });
        }
        // Animate explosion (simple fade-out)
        const animateExplosion = () => {
            meteorCtx.clearRect(0, 0, meteorCanvas.width, meteorCanvas.height);
            explosion.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
                if (p.life > 0) {
                    meteorCtx.save();
                    meteorCtx.globalAlpha = p.life;
                    meteorCtx.fillStyle = `rgba(255, 102, 0, ${p.life})`;
                    meteorCtx.beginPath();
                    meteorCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                    meteorCtx.fill();
                    meteorCtx.restore();
                }
            });
            if (explosion.particles.some(p => p.life > 0)) {
                requestAnimationFrame(animateExplosion);
            }
        };
        animateExplosion();
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .input-group.focused label {
        top: -0.75rem !important;
        left: 1rem !important;
        font-size: 0.8rem !important;
        color: var(--secondary-color) !important;
    }
    
    /* Enhanced loading animations */
    @keyframes pulseGlow {
        0%, 100% { 
            box-shadow: 0 0 20px rgba(255, 102, 0, 0.3);
            transform: scale(1);
        }
        50% { 
            box-shadow: 0 0 40px rgba(255, 102, 0, 0.6);
            transform: scale(1.05);
        }
    }
    
    .team-card:hover {
        animation: pulseGlow 2s ease-in-out infinite;
    }
    
    /* Smooth scroll behavior */
    html {
        scroll-behavior: smooth;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--gradient-primary);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--gradient-secondary);
    }
`;
document.head.appendChild(style);

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired.');
    const faqItems = document.querySelectorAll('.faq-item');
    
    console.log('Found FAQ items:', faqItems.length);
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                console.log('FAQ question clicked');
                
                // Close other open items
                const currentlyActive = document.querySelector('.faq-item.active');
                if (currentlyActive && currentlyActive !== item) {
                    currentlyActive.classList.remove('active');
                }
                
                // Toggle current item
                item.classList.toggle('active');
                
                console.log('FAQ item toggled, active:', item.classList.contains('active'));
            });
        }
    });
});

// Performance optimization - Reduce particle count on mobile
function getParticleCount() {
    if (window.innerWidth < 768) return 30;
    if (window.innerWidth < 1200) return 50;
    return 75;
}

// Update particle count based on screen size
window.addEventListener('resize', () => {
    const newCount = getParticleCount();
    if (particles.length !== newCount) {
        initParticles();
    }
});

// Add scroll-triggered animations for better performance
const createScrollObserver = (callback, options = {}) => {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Enhanced scroll animations
const scrollAnimationObserver = createScrollObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            scrollAnimationObserver.unobserve(entry.target);
        }
    });
});

// Add CSS classes for scroll animations
const scrollAnimationStyle = document.createElement('style');
scrollAnimationStyle.textContent = `
    .scroll-animate {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .scroll-animate.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .scroll-animate-left {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .scroll-animate-left.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    .scroll-animate-right {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .scroll-animate-right.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
`;
document.head.appendChild(scrollAnimationStyle);

// Smooth scroll with offset for fixed header
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Enhanced navigation with smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScrollTo(target);
    });
});

// Simple image error handling without opacity manipulation
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => {
            console.warn('Failed to load image:', img.src);
            // You could add a placeholder image here if needed
        });
    });
});

// Initialize everything only after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Don't initialize particles here - wait for window load
    console.log('DOM loaded, waiting for full page load...');
});

// Loading screen functionality
const loadingScreen = document.getElementById('loading-screen');

// Hide loading screen after everything loads
window.addEventListener('load', () => {
    // Wait for a minimum time to show the loading animation
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }
        
        // Initialize animations after loading
        initializeAnimations();
    }, 1200); // Show loading for 1.2 seconds minimum
});

// Initialize animations after page load
function initializeAnimations() {
    // Initialize particle system
    initParticles();
    animateParticles();
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        if (el) {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}

// Secret Easter Egg - TRSKNCOE Logo Click Counter
let logoClickCount = 0;
let logoClickTimer = null;
const REQUIRED_CLICKS = 7; // Number of clicks needed to activate
const CLICK_TIMEOUT = 3000; // Reset counter after 3 seconds of no clicks

function initializeSecretEasterEgg() {
    const secretLogo = document.getElementById('secret-logo');
    
    if (secretLogo) {
        secretLogo.addEventListener('click', function(e) {
            e.preventDefault();
            logoClickCount++;
            
            // Clear existing timer
            if (logoClickTimer) {
                clearTimeout(logoClickTimer);
            }
            
            // Add visual feedback for each click
            this.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 150);
            
            // Add click indicator
            showClickIndicator(logoClickCount);
            
            // Check if enough clicks
            if (logoClickCount >= REQUIRED_CLICKS) {
                activateSecretPage();
                logoClickCount = 0; // Reset counter
                return;
            }
            
            // Set timer to reset counter
            logoClickTimer = setTimeout(() => {
                logoClickCount = 0;
                hideClickIndicator();
            }, CLICK_TIMEOUT);
        });
    }
}

function showClickIndicator(count) {
    // Remove existing indicator
    const existingIndicator = document.querySelector('.click-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    // Create new indicator
    const indicator = document.createElement('div');
    indicator.className = 'click-indicator';
    indicator.innerHTML = `
        <div class="click-counter">${count}/${REQUIRED_CLICKS}</div>
        <div class="click-hint">${count === 1 ? 'Keep clicking the logo...' : count < REQUIRED_CLICKS ? 'Almost there!' : 'Activating...'}</div>
    `;
    
    // Add styles
    indicator.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 212, 255, 0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: bold;
        z-index: 10000;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
        backdrop-filter: blur(10px);
        animation: slideDown 0.3s ease-out;
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#click-indicator-styles')) {
        const style = document.createElement('style');
        style.id = 'click-indicator-styles';
        style.textContent = `
            @keyframes slideDown {
                from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
            .click-counter {
                font-size: 16px;
                margin-bottom: 2px;
            }
            .click-hint {
                font-size: 12px;
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(indicator);
}

function hideClickIndicator() {
    const indicator = document.querySelector('.click-indicator');
    if (indicator) {
        indicator.style.animation = 'slideUp 0.3s ease-out forwards';
        setTimeout(() => indicator.remove(), 300);
    }
}

function activateSecretPage() {
    // Hide click indicator
    hideClickIndicator();
    
    // Create activation effect
    const activationEffect = document.createElement('div');
    activationEffect.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: activationPulse 1.5s ease-out;
    `;
    
    activationEffect.innerHTML = `
        <div style="
            text-align: center;
            color: #00d4ff;
            font-size: 2rem;
            font-weight: bold;
            text-shadow: 0 0 20px #00d4ff;
            animation: glow 0.5s ease-in-out infinite alternate;
        ">
            🚀 SECRET ACTIVATED! 🚀<br>
            <div style="font-size: 1rem; margin-top: 10px; opacity: 0.8;">
                Redirecting to developers page...
            </div>
        </div>
    `;
    
    // Add activation animation styles
    if (!document.querySelector('#activation-styles')) {
        const style = document.createElement('style');
        style.id = 'activation-styles';
        style.textContent = `
            @keyframes activationPulse {
                0% { opacity: 0; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.1); }
                100% { opacity: 1; transform: scale(1); }
            }
            @keyframes glow {
                from { text-shadow: 0 0 20px #00d4ff; }
                to { text-shadow: 0 0 30px #00d4ff, 0 0 40px #00d4ff; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(activationEffect);
    
    // Redirect after animation
    setTimeout(() => {
        window.location.href = 'developers.html';
    }, 2000);
}
