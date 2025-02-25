// BMW Model Configurator
class BMWConfigurator {
    constructor() {
        this.selectedModel = null;
        this.initColorPicker();
        this.initEngineSelector();
    }

    initColorPicker() {
        const colorSwatches = document.querySelectorAll('.color-swatch');
        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                this.updateCarColor(swatch.dataset.color);
            });
        });
    }

    updateCarColor(colorCode) {
        document.documentElement.style.setProperty('--selected-color', colorCode);
    }
}

// Initialize Interactive Features
document.addEventListener('DOMContentLoaded', () => {
    const configurator = new BMWConfigurator();
    
    // Dynamic Performance Stats Calculator
    document.querySelectorAll('.engine-option').forEach(option => {
        option.addEventListener('click', () => {
            const stats = JSON.parse(option.dataset.stats);
            this.updatePerformanceDisplay(stats);
        });
    });
});