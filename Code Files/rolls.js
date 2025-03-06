// Rolls-Royce Virtual Showroom
class RollsShowroom {
    constructor() {
        this.init360Viewer();
        this.initCustomization();
    }

    init360Viewer() {
        const rotationContainer = document.querySelector('#car-rotation');
        let rotation = 0;
        
        rotationContainer.addEventListener('mousemove', (e) => {
            const rect = rotationContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            rotation = (x / rect.width) * 360;
            rotationContainer.style.transform = `rotateY(${rotation}deg)`;
        });
    }

    initCustomization() {
        document.querySelectorAll('.material-option').forEach(option => {
            option.addEventListener('click', () => {
                this.updateInteriorMaterial(option.dataset.material);
            });
        });
    }
}

// Initialize Luxury Experience
document.addEventListener('DOMContentLoaded', () => {
    const showroom = new RollsShowroom();
    
    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelector('.rolls-hero').style.backgroundPositionY = 
            `${scrolled * 0.5}px`;
    });
});