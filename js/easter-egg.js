// Secret Easter Egg - TRSKNCOE Logo Click Counter
let logoClickCount = 0;
let logoClickTimer = null;
const REQUIRED_CLICKS = 12; // Number of clicks needed to activate (more secretive)
const CLICK_TIMEOUT = 2000; // Reset counter after 2 seconds of no clicks (faster timeout)

function initializeSecretEasterEgg() {
    const secretLogo = document.getElementById('secret-logo');
    if (secretLogo) {

        secretLogo.addEventListener('click', function (e) {
            e.preventDefault();
            logoClickCount++;

            // Clear existing timer
            if (logoClickTimer) {
                clearTimeout(logoClickTimer);
            }

            // Very subtle visual feedback for each click
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            // Only show hint after many clicks (no counter)
            if (logoClickCount > 8) {
                showSubtleHint();
            }

            // Check if enough clicks
            if (logoClickCount >= REQUIRED_CLICKS) {
                activateSecretPage();
                logoClickCount = 0; // Reset counter
                return;
            }

            // Set timer to reset counter
            logoClickTimer = setTimeout(() => {
                logoClickCount = 0;
                hideSubtleHint();
            }, CLICK_TIMEOUT);
        });
    }
}

function showSubtleHint() {
    // Remove existing hint
    const existingHint = document.querySelector('.subtle-hint');
    if (existingHint) {
        return; // Don't show multiple hints
    }

    // Create very subtle hint
    const hint = document.createElement('div');
    hint.className = 'subtle-hint';
    hint.innerHTML = '👀';

    // Add styles - very subtle
    hint.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        font-size: 12px;
        opacity: 0.3;
        z-index: 1001;
        animation: subtlePulse 2s ease-in-out;
        pointer-events: none;
    `;

    // Add animation if not already added
    if (!document.querySelector('#subtle-hint-styles')) {
        const style = document.createElement('style');
        style.id = 'subtle-hint-styles';
        style.textContent = `
            @keyframes subtlePulse {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.6; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(hint);

    // Remove hint after 3 seconds
    setTimeout(() => {
        if (hint.parentNode) {
            hint.remove();
        }
    }, 3000);
}

function hideSubtleHint() {
    const hint = document.querySelector('.subtle-hint');
    if (hint && hint.parentNode) {
        hint.remove();
    }
}

function activateSecretPage() {
    // Hide hint
    hideSubtleHint();

    // Create activation effect
    const activationEffect = document.createElement('div');
    activationEffect.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255, 102, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: activationPulse 1.5s ease-out;
    `;

    activationEffect.innerHTML = `
        <div style="
            text-align: center;
            color: #ff6600;
            font-size: 2rem;
            font-weight: bold;
            text-shadow: 0 0 20px #ff6600;
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
                from { text-shadow: 0 0 20px #ff6600; }
                to { text-shadow: 0 0 30px #ff6600, 0 0 40px #ff6600; }
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

// Initialize the easter egg when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeSecretEasterEgg();
});

// Also try after a short delay in case of timing issues
setTimeout(() => {
    initializeSecretEasterEgg();
}, 1000);