document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        if (password.length < 8) {
            showError('Password must be at least 8 characters');
            return;
        }
        
        // Simulate login process
        simulateLogin();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'auth-error';
        errorEl.textContent = message;
        
        const existingError = document.querySelector('.auth-error');
        if (existingError) existingError.remove();
        
        loginForm.prepend(errorEl);
        setTimeout(() => errorEl.remove(), 3000);
    }

    function simulateLogin() {
        const submitBtn = loginForm.querySelector('button');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="auth-spinner"></div>';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="btn-text">Sign In</span><i class="fas fa-arrow-right"></i>';
            window.location.href = 'home.html';
        }, 1500);
    }
});