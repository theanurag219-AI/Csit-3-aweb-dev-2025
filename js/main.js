/**
 * Main Application Logic
 * Orchestrates page-specific initiations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize common components
    // (Future: Theme toggle logic can go here)
});

// --- Page Specific Initializers ---

// 1. Register Page
window.initRegister = () => {
    // Setup Password Toggle
    UI.setupPasswordToggle('togglePassword', 'password');

    const form = document.getElementById('registerForm');
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirmPassword');
    const strengthBar = document.querySelector('#passwordStrengthBar .progress-bar');
    const strengthBarContainer = document.getElementById('passwordStrengthBar');
    const btn = document.getElementById('submitBtn');

    // Real-time Strength Check
    passInput.addEventListener('input', (e) => {
        const val = e.target.value;
        const result = Validation.checkPasswordStrength(val);

        strengthBarContainer.style.display = 'flex';
        const width = (result.score / 4) * 100;
        strengthBar.style.width = `${width}%`;

        // Color coding
        if (result.score <= 1) strengthBar.className = 'progress-bar bg-danger';
        else if (result.score === 2) strengthBar.className = 'progress-bar bg-warning';
        else strengthBar.className = 'progress-bar bg-success';
    });

    // Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset Validation States
        form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        let isValid = true;

        // Name
        if (!Validation.isValidName(nameInput.value)) {
            nameInput.classList.add('is-invalid');
            isValid = false;
        }

        // Email
        if (!Validation.isValidEmail(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        }

        // Password Match
        if (passInput.value !== confirmInput.value || passInput.value === '') {
            confirmInput.classList.add('is-invalid');
            isValid = false;
        }

        if (!isValid) {
            UI.showToast('Please fix errors in the form.', 'error');
            return;
        }

        // Simulate API
        UI.setLoading(btn, true);
        setTimeout(() => {
            UI.setLoading(btn, false);
            UI.showToast('Registration successful! Redirecting...', 'success');
            setTimeout(() => window.location.href = 'login.html', 1500);
        }, 1500);
    });
};

// 2. Login Page
window.initLogin = () => {
    UI.setupPasswordToggle('togglePassword', 'password');

    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');
    const btn = document.getElementById('submitBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        let isValid = true;

        if (!Validation.isValidEmail(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        }

        if (!passInput.value) {
            passInput.classList.add('is-invalid');
            isValid = false;
        }

        if (!isValid) return;

        UI.setLoading(btn, true);
        setTimeout(() => {
            UI.setLoading(btn, false);
            // Mock Login Logic
            if (emailInput.value === "admin@example.com") { // Just for demo
                UI.showToast('Welcome back, Anurag!', 'success');
                setTimeout(() => window.location.href = '../index.html', 1500);
            } else {
                UI.showToast('Login successful!', 'success');
                setTimeout(() => window.location.href = '../index.html', 1500);
            }
        }, 1500);
    });
};

// 3. Reset Page
window.initReset = () => {
    const form = document.getElementById('resetForm');
    const emailInput = document.getElementById('email');
    const btn = document.getElementById('submitBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        emailInput.classList.remove('is-invalid');

        if (!Validation.isValidEmail(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            return;
        }

        UI.setLoading(btn, true);
        setTimeout(() => {
            UI.setLoading(btn, false);
            UI.showToast('Reset link sent to your email!', 'success');
            form.reset();
        }, 1500);
    });
};
