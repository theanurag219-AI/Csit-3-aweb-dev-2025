/**
 * UI Utilities
 * Handles toasts, loading states, and micro-interactions.
 */

const UI = {
    // Show a toast notification
    showToast: (message, type = 'success') => {
        // Remove existing toasts to prevent stacking overload
        const existing = document.querySelector('.custom-toast');
        if (existing) existing.remove();

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `custom-toast toast-${type}`;
        
        const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';
        
        toast.innerHTML = `
            <i class="bi ${icon} me-2"></i>
            <span>${message}</span>
        `;

        // Styles
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '9999',
            padding: '12px 24px',
            borderRadius: '12px',
            background: 'white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.95rem',
            fontWeight: '600',
            color: type === 'success' ? '#059669' : '#dc2626',
            border: `1px solid ${type === 'success' ? '#a7f3d0' : '#fecaca'}`,
            transform: 'translateY(-20px)',
            opacity: '0',
            transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
        });

        document.body.appendChild(toast);

        // Animate In
        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });

        // Auto dismiss
        setTimeout(() => {
            toast.style.transform = 'translateY(-20px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // Set button loading state
    setLoading: (btn, isLoading, originalText = '') => {
        if (isLoading) {
            btn.dataset.originalText = btn.innerHTML;
            btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processing...`;
            btn.disabled = true;
        } else {
            btn.innerHTML = btn.dataset.originalText || originalText;
            btn.disabled = false;
        }
    },

    // Setup password toggle
    setupPasswordToggle: (toggleId, inputId) => {
        const toggle = document.getElementById(toggleId);
        const input = document.getElementById(inputId);

        if (!toggle || !input) return;

        toggle.addEventListener('click', () => {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            toggle.classList.toggle('bi-eye');
            toggle.classList.toggle('bi-eye-slash');
        });
    }
};

window.UI = UI;
