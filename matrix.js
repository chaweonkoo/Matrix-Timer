const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial resize
resizeCanvas();

// Resize on window resize
window.addEventListener('resize', resizeCanvas);

// Characters to use in the Matrix rain
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

// Create columns
const columns = Math.floor(canvas.width / 20); // 20px per column
const drops = new Array(columns).fill(1);

// Draw the Matrix rain
function draw() {
    // Set the background to black with some transparency
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the text color to Matrix green
    ctx.fillStyle = '#00FF41';
    ctx.font = '15px monospace';

    // Draw the characters
    for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw the character with varying opacity
        const opacity = Math.random() * 0.5 + 0.5; // Random opacity between 0.5 and 1
        ctx.globalAlpha = opacity;
        ctx.fillText(char, i * 20, drops[i] * 20);

        // Move the drop down
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
    
    // Reset global alpha
    ctx.globalAlpha = 1;
}

// Animation loop
setInterval(draw, 33); // ~30 FPS 