// Google Form field IDs - These need to be replaced with actual IDs from your Google Form
const FORM_IDS = {
    fullName: 'entry.1234567890',  // Replace with actual field ID from your Google Form
    phoneNumber: 'entry.0987654321' // Replace with actual field ID from your Google Form
};

class WaitlistForm {
    constructor() {
        this.form = document.getElementById('waitlistForm');
        this.fullNameInput = document.getElementById('fullName');
        this.phoneInput = document.getElementById('phoneNumber');
        this.submitButton = document.getElementById('submitForm');
        this.statusDiv = document.getElementById('formStatus');
        
        this.initializeForm();
    }

    initializeForm() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validatePhoneNumber(phone) {
        // Basic phone number validation
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(phone);
    }

    validateName(name) {
        // Basic name validation
        return name.trim().length >= 2 && /^[a-zA-Z\s'-]+$/.test(name.trim());
    }

    showMessage(message, type = 'info') {
        this.statusDiv.textContent = message;
        this.statusDiv.className = `form-status ${type}`;
        this.statusDiv.style.display = 'block';
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate inputs
        if (!this.validateName(this.fullNameInput.value)) {
            this.showMessage('Please enter a valid name', 'error');
            return;
        }

        if (!this.validatePhoneNumber(this.phoneInput.value)) {
            this.showMessage('Please enter a valid phone number with country code', 'error');
            return;
        }

        // Prepare form data as URL parameters
        const params = new URLSearchParams({
            fullName: this.fullNameInput.value,
            phoneNumber: this.phoneInput.value
        });

        try {
            this.submitButton.disabled = true;
            this.showMessage('Submitting...', 'info');

            // Submit to Google Apps Script using no-cors mode
            const response = await fetch(`https://script.google.com/macros/s/AKfycbxe79WB4BxqGDoan2r7e4X3Dll2lPTI8fwCSKduL8jqxKe2J-AFKbemRezVsexIE8nBaQ/exec?${params.toString()}`, {
                method: 'GET',
                mode: 'no-cors'
            });

            // Since we're using no-cors, we won't get a readable response
            // Instead, we'll assume success if we get here
            this.showMessage('Successfully joined the waitlist!', 'success');
            this.form.reset();
            
        } catch (error) {
            console.error('Submission error:', error);
            this.showMessage('Error submitting form. Please try again.', 'error');
        } finally {
            this.submitButton.disabled = false;
        }
    }
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WaitlistForm();
}); 