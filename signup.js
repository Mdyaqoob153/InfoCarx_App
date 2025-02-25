document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const strengthBar = document.createElement('div');
    
    strengthBar.className = 'strength-bar';
    strengthBar.innerHTML = '<div class="strength-progress"></div>';
    passwordInput.parentNode.insertBefore(strengthBar, passwordInput.nextSibling);

    passwordInput.addEventListener('input', updatePasswordStrength);

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = passwordInput.value;
        const confirmPassword = document.getElementById('confirmPassword').value;

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
        const progress = strengthBar.querySelector('.strength-progress');
        progress.style.width = `${strength}%`;
    }

    function calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        if (password.match(/[^A-Za-z0-9]/)) strength += 25;
        return strength;
    }

    function showError(message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'auth-error';
        errorEl.textContent = message;
        
        const existingError = document.querySelector('.auth-error');
        if (existingError) existingError.remove();
        
        signupForm.prepend(errorEl);
        setTimeout(() => errorEl.remove(), 3000);
    }

    function simulateSignup() {
        const submitBtn = signupForm.querySelector('button');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="auth-spinner"></div>';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="btn-text">Create Account</span><i class="fas fa-arrow-right"></i>';
            window.location.href = 'home.html';
        }, 1500);
    }
});