document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const strengthProgress = document.querySelector('.strength-progress');

    passwordInput.addEventListener('input', updatePasswordStrength);

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        clearErrors();

        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            showError('Password must be at least 8 characters');
            return;
        }

        simulateSignup();
    });

    function updatePasswordStrength() {
        const strength = calculatePasswordStrength(passwordInput.value);
        strengthProgress.style.width = `${strength}%`;
        updateStrengthColor(strength);
    }

    function calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        if (password.match(/[^A-Za-z0-9]/)) strength += 25;
        return Math.min(strength, 100);
    }

    function updateStrengthColor(strength) {
        strengthProgress.style.backgroundColor = 
            strength < 50 ? '#dc3545' :
            strength < 75 ? '#ffc107' : '#28a745';
    }

    function showError(message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'auth-error';
        errorEl.textContent = message;
        signupForm.prepend(errorEl);
    }

    function clearErrors() {
        const existingErrors = document.querySelectorAll('.auth-error');
        existingErrors.forEach(error => error.remove());
    }

    function simulateSignup() {
        const submitBtn = signupForm.querySelector('button');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="auth-spinner"></div>';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <span class="btn-text">Create Account</span>
                <i class="fas fa-arrow-right"></i>
            `;
            window.location.href = 'home.html';
        }, 1500);
    }
});