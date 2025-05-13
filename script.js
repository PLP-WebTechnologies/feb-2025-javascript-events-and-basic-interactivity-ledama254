// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ==========
    
    // Button click event
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked! 🎉';
        clickOutput.style.color = '#2ecc71';
        
        // Reset after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = 'Button not clicked yet';
            clickOutput.style.color = '';
        }, 2000);
    });
    
    // Hover effects
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Hover detected! ✨';
        hoverOutput.style.color = '#3498db';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Waiting for hover...';
        hoverOutput.style.color = '';
    });
    
    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keydown', function(e) {
        keypressOutput.textContent = `Key pressed: ${e.key} (Code: ${e.code})`;
        keypressOutput.style.color = '#9b59b6';
        
        // Clear after 1.5 seconds
        setTimeout(() => {
            keypressOutput.textContent = 'No key pressed yet';
            keypressOutput.style.color = '';
        }, 1500);
    });
    
    // Secret action (double click or long press)
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    let pressTimer;
    
    // Long press detection
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            secretOutput.textContent = 'You discovered the long press secret! 🕵️‍♂️';
            secretOutput.style.color = '#e67e22';
            resetSecretMessage();
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // Double click detection
    secretBox.addEventListener('dblclick', function() {
        clearTimeout(pressTimer);
        secretOutput.textContent = 'You discovered the double click secret! 👯‍♂️';
        secretOutput.style.color = '#e74c3c';
        resetSecretMessage();
    });
    
    function resetSecretMessage() {
        setTimeout(() => {
            secretOutput.textContent = '🤫';
            secretOutput.style.color = '';
        }, 2000);
    }
    
    // ========== Interactive Elements ==========
    
    // Button that changes text and color
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#e74c3c'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color changed to ${colors[colorIndex]}`;
    });
    
    // Image gallery/slideshow
    const galleryImages = document.querySelectorAll('.image-gallery img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
        currentImageIndex = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(newIndex);
    });
    
    // Auto-advance slideshow every 3 seconds
    setInterval(() => {
        let newIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(newIndex);
    }, 3000);
    
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ========== Form Validation ==========
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const formSuccess = document.getElementById('form-success');
    
    // Password requirement elements
    const lengthRule = document.getElementById('length-rule');
    const uppercaseRule = document.getElementById('uppercase-rule');
    const numberRule = document.getElementById('number-rule');
    
    // Real-time validation for password
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        // Check password rules
        const isLengthValid = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        
        // Update UI for each rule
        lengthRule.classList.toggle('valid', isLengthValid);
        uppercaseRule.classList.toggle('valid', hasUppercase);
        numberRule.classList.toggle('valid', hasNumber);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        } else {
            nameError.textContent = '';
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }
        
        // Password validation
        const password = passwordInput.value;
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            passwordError.textContent = 'Password does not meet all requirements';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }
        
        // If form is valid, show success message
        if (isValid) {
            formSuccess.classList.add('visible');
            form.reset();
            
            // Reset password rules
            lengthRule.classList.remove('valid');
            uppercaseRule.classList.remove('valid');
            numberRule.classList.remove('valid');
            
            // Hide form and show success for 3 seconds
            form.classList.add('hidden');
            setTimeout(() => {
                formSuccess.classList.remove('visible');
                form.classList.remove('hidden');
            }, 3000);
        }
    });
});