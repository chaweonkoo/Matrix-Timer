function animateCrashMessage() {
    const message = "TIMER COMPLETE";
    const crashPopup = document.querySelector('.crash-popup');
    const span = crashPopup.querySelector('span');
    let currentIndex = 0;
    
    function typeNextLetter() {
        if (currentIndex < message.length) {
            span.textContent = message.substring(0, currentIndex + 1);
            currentIndex++;
            setTimeout(typeNextLetter, 100); // 100ms delay between letters
        } else {
            // Wait for 1 second before starting over
            setTimeout(() => {
                currentIndex = 0;
                span.textContent = '';
                setTimeout(typeNextLetter, 500); // 500ms delay before restarting
            }, 1000);
        }
    }
    
    typeNextLetter();
}

class Timer {
    constructor() {
        this.hours = 3;
        this.minutes = 0;
        this.seconds = 0;
        this.interval = null;
        this.isRunning = false;

        // DOM elements
        this.hoursDisplay = document.getElementById('hours');
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');

        // Slider elements
        this.hoursSlider = document.getElementById('hoursSlider');
        this.minutesSlider = document.getElementById('minutesSlider');
        this.secondsSlider = document.getElementById('secondsSlider');
        this.hoursSliderValue = document.getElementById('hoursSliderValue');
        this.minutesSliderValue = document.getElementById('minutesSliderValue');
        this.secondsSliderValue = document.getElementById('secondsSliderValue');

        // Bind event listeners
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());

        // Bind slider event listeners
        this.hoursSlider.addEventListener('input', () => this.updateTimeFromSliders());
        this.minutesSlider.addEventListener('input', () => this.updateTimeFromSliders());
        this.secondsSlider.addEventListener('input', () => this.updateTimeFromSliders());

        // Initialize display
        this.updateDisplay();
        this.updateSliders();
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            
            this.interval = setInterval(() => {
                if (this.seconds > 0) {
                    this.seconds--;
                } else if (this.minutes > 0) {
                    this.minutes--;
                    this.seconds = 59;
                } else if (this.hours > 0) {
                    this.hours--;
                    this.minutes = 59;
                    this.seconds = 59;
                } else {
                    this.stop();
                    return;
                }
                this.updateDisplay();
                this.updateSliders();
            }, 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            clearInterval(this.interval);
        }
    }

    reset() {
        this.pause();
        this.hours = 3;
        this.minutes = 0;
        this.seconds = 0;
        this.updateDisplay();
        this.updateSliders();
        
        // Restore everything when reset is clicked
        document.querySelector('.crash-popup').style.display = 'none';
        document.querySelector('.container').style.opacity = '1';
        document.getElementById('matrix').classList.remove('matrix-stopped');
        document.body.classList.remove('crash-effect');
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            this.isRunning = false;
            this.updateDisplay();
            
            // Play crash sound
            const crashSound = new Audio('crash.mp3');
            crashSound.play();
            
            // Show crash effect
            document.body.classList.add('crash-effect');
            const crashPopup = document.querySelector('.crash-popup');
            crashPopup.style.display = 'block';
            
            // Stop matrix animation and hide timer container
            const matrix = document.getElementById('matrix');
            const container = document.querySelector('.container');
            matrix.classList.add('matrix-stopped');
            container.style.opacity = '0';
            container.style.transition = 'opacity 0.5s ease-out';
            
            // Start the typing animation
            animateCrashMessage();
            
            // Keep the crash state - remove the timeout that would restore everything
            // The reset button will be the only way to restore the timer
        }
    }

    updateDisplay() {
        this.hoursDisplay.textContent = String(this.hours).padStart(2, '0');
        this.minutesDisplay.textContent = String(this.minutes).padStart(2, '0');
        this.secondsDisplay.textContent = String(this.seconds).padStart(2, '0');
    }

    updateSliders() {
        this.hoursSlider.value = this.hours;
        this.minutesSlider.value = this.minutes;
        this.secondsSlider.value = this.seconds;
        this.hoursSliderValue.textContent = `${this.hours}h`;
        this.minutesSliderValue.textContent = `${this.minutes}m`;
        this.secondsSliderValue.textContent = `${this.seconds}s`;
    }

    updateTimeFromSliders() {
        this.hours = parseInt(this.hoursSlider.value);
        this.minutes = parseInt(this.minutesSlider.value);
        this.seconds = parseInt(this.secondsSlider.value);
        this.updateDisplay();
        this.hoursSliderValue.textContent = `${this.hours}h`;
        this.minutesSliderValue.textContent = `${this.minutes}m`;
        this.secondsSliderValue.textContent = `${this.seconds}s`;
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Timer();
}); 