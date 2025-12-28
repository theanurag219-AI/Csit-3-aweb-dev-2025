/**
 * Validation Logic
 * Centralized validation rules.
 */

const Validation = {
    rules: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        name: /^[a-zA-Z\s]{3,}$/
    },

    isValidEmail: (email) => {
        return Validation.rules.email.test(String(email).toLowerCase());
    },

    isValidName: (name) => {
        return Validation.rules.name.test(String(name));
    },

    // Returns object { score: 0-4, message: string }
    checkPasswordStrength: (password) => {
        let score = 0;
        if (!password) return { score: 0, message: "Required" };

        if (password.length > 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        const messages = {
            0: "Weak",
            1: "Weak",
            2: "Medium",
            3: "Strong",
            4: "Very Strong"
        };

        return { score, message: messages[score] };
    }
};

window.Validation = Validation;
