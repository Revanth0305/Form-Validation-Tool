document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phoneNumber');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const captchaInput = document.getElementById('captcha');
    const termsCheck = document.getElementById('termsCheck');
    const successMessage = document.getElementById('successMessage');
    
    // Get error message elements
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const captchaError = document.getElementById('captchaError');
    const termsError = document.getElementById('termsError');
    
    // Password strength meter
    const strengthMeter = document.getElementById('strengthMeter');
    
    // Password toggle visibility
    const passwordToggle = document.getElementById('passwordToggle');
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
    const passwordInfo = document.getElementById('passwordInfo');
    const passwordTooltip = document.getElementById('passwordTooltip');
    
    // Generate captcha question
    const captchaQuestion = document.getElementById('captchaQuestion');
    let captchaAnswer = generateCaptcha();
    
    // Function to generate a simple math captcha
    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        captchaQuestion.textContent = `What is ${num1} + ${num2}?`;
        return num1 + num2;
    }
    
    // Toggle password visibility
    passwordToggle.addEventListener('click', function() {
        togglePasswordVisibility(passwordInput, passwordToggle);
    });
    
    confirmPasswordToggle.addEventListener('click', function() {
        togglePasswordVisibility(confirmPasswordInput, confirmPasswordToggle);
    });
    
    function togglePasswordVisibility(inputField, toggleIcon) {
        if (inputField.type === 'password') {
            inputField.type = 'text';
            toggleIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                </svg>
            `;
        } else {
            inputField.type = 'password';
            toggleIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>
            `;
        }
    }
    
    // Show password requirements tooltip
    passwordInfo.addEventListener('mouseenter', function() {
        passwordTooltip.style.display = 'block';
    });
    
    passwordInfo.addEventListener('mouseleave', function() {
        passwordTooltip.style.display = 'none';
    });
    
    // Validation functions
    function validateFullName(name) {
        return name.trim().length >= 5;
    }
    
    function validateEmail(email) {
        return email.includes('@');
    }
    
    function validatePhone(phone) {
        // Check if it's a 10-digit number and not 123456789
        return /^\d{10}$/.test(phone) && phone !== '1234567890';
    }
    
    function validatePassword(password, name) {
        // Check if password is at least 8 characters
        if (password.length < 8) {
            passwordError.textContent = "Password must be at least 8 characters long";
            return false;
        }
        
        // Check if password is not 'password'
        if (password.toLowerCase() === 'password') {
            passwordError.textContent = "Password cannot be 'password'";
            return false;
        }
        
        // Check if password is not the same as the name
        if (name && password.toLowerCase() === name.toLowerCase()) {
            passwordError.textContent = "Password cannot be the same as your name";
            return false;
        }
        
        return true;
    }
    
    function validatePasswordMatch(password, confirmPassword) {
        return password === confirmPassword;
    }
    
    function validateCaptcha(answer) {
        return parseInt(answer) === captchaAnswer;
    }
    
    function validateTerms(checked) {
        return checked;
    }
    
    // Function to check password strength
    function checkPasswordStrength(password) {
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 20;
        
        // Contains lowercase letters
        if (/[a-z]/.test(password)) strength += 20;
        
        // Contains uppercase letters
        if (/[A-Z]/.test(password)) strength += 20;
        
        // Contains numbers
        if (/[0-9]/.test(password)) strength += 20;
        
        // Contains special characters
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;
        
        // Update strength meter
        strengthMeter.style.width = strength + '%';
        
        // Set color based on strength
        if (strength <= 20) {
            strengthMeter.style.backgroundColor = '#dc3545'; // Red - Very weak
        } else if (strength <= 40) {
            strengthMeter.style.backgroundColor = '#ffc107'; // Yellow - Weak
        } else if (strength <= 60) {
            strengthMeter.style.backgroundColor = '#fd7e14'; // Orange - Medium
        } else if (strength <= 80) {
            strengthMeter.style.backgroundColor = '#20c997'; // Teal - Strong
        } else {
            strengthMeter.style.backgroundColor = '#198754'; // Green - Very strong
        }
    }
    
    // Function to show error
    function showError(inputElement, errorElement, isValid) {
        if (!isValid) {
            errorElement.style.display = 'block';
            inputElement.classList.add('is-invalid');
            inputElement.classList.remove('is-valid');
            // Add shake animation
            inputElement.classList.add('shake');
            setTimeout(() => {
                inputElement.classList.remove('shake');
            }, 500);
        } else {
            errorElement.style.display = 'none';
            inputElement.classList.remove('is-invalid');
            inputElement.classList.add('is-valid');
        }
        return isValid;
    }
    
    // Event listeners for real-time validation
    fullNameInput.addEventListener('input', function() {
        const isValid = validateFullName(this.value);
        showError(this, fullNameError, isValid);
    });
    
    emailInput.addEventListener('input', function() {
        const isValid = validateEmail(this.value);
        showError(this, emailError, isValid);
    });
    
    phoneInput.addEventListener('input', function() {
        // Remove non-digit characters
        this.value = this.value.replace(/\D/g, '');
        
        const isValid = validatePhone(this.value);
        showError(this, phoneError, isValid);
    });
    
    passwordInput.addEventListener('input', function() {
        const isValid = validatePassword(this.value, fullNameInput.value);
        showError(this, passwordError, isValid);
        
        // Check password strength
        checkPasswordStrength(this.value);
        
        // If confirm password is not empty, validate match
        if (confirmPasswordInput.value) {
            const isMatchValid = validatePasswordMatch(this.value, confirmPasswordInput.value);
            showError(confirmPasswordInput, confirmPasswordError, isMatchValid);
        }
    });
    
    confirmPasswordInput.addEventListener('input', function() {
        const isValid = validatePasswordMatch(passwordInput.value, this.value);
        showError(this, confirmPasswordError, isValid);
    });
    
    captchaInput.addEventListener('input', function() {
        const isValid = validateCaptcha(this.value);
        showError(this, captchaError, isValid);
    });
    
    termsCheck.addEventListener('change', function() {
        const isValid = validateTerms(this.checked);
        showError(this, termsError, isValid);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = showError(fullNameInput, fullNameError, validateFullName(fullNameInput.value));
        const isEmailValid = showError(emailInput, emailError, validateEmail(emailInput.value));
        const isPhoneValid = showError(phoneInput, phoneError, validatePhone(phoneInput.value));
        const isPasswordValid = showError(passwordInput, passwordError, validatePassword(passwordInput.value, fullNameInput.value));
        const isConfirmPasswordValid = showError(confirmPasswordInput, confirmPasswordError, validatePasswordMatch(passwordInput.value, confirmPasswordInput.value));
        const isCaptchaValid = showError(captchaInput, captchaError, validateCaptcha(captchaInput.value));
        const isTermsValid = showError(termsCheck, termsError, validateTerms(termsCheck.checked));
        
        // If all validations pass
        if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid && 
            isConfirmPasswordValid && isCaptchaValid && isTermsValid) {
            
            // Show success message
            successMessage.style.display = 'block';
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Reset form after 3 seconds
            setTimeout(() => {
                form.reset();
                successMessage.style.display = 'none';
                
                // Reset validation classes
                const formInputs = form.querySelectorAll('.form-control');
                formInputs.forEach(input => {
                    input.classList.remove('is-valid');
                });
                
                // Reset strength meter
                strengthMeter.style.width = '0%';
                
                // Generate new captcha
                captchaAnswer = generateCaptcha();
            }, 3000);
        }
    });
});
