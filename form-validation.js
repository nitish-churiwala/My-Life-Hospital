document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("appointmentForm");

    const nameField = document.getElementById("name");
    const usernameField = document.getElementById("username");
    const emailField = document.getElementById("email");
    const phoneField = document.getElementById("phone");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirm-password");
    const dobField = document.getElementById("dob");
    const streetField = document.getElementById("Street");
    const cityField = document.getElementById("City");
    const stateField = document.getElementById("State");
    const pinField = document.getElementById("Pin");
    const doctorField = document.getElementById("doctor");
    const dateField = document.getElementById("date");

    // Helper Functions
    function setSuccess(element) {
        element.classList.remove("input-error");
        element.classList.add("input-success");
        element.nextElementSibling.style.display = "none"; // Error message
        element.nextElementSibling.nextElementSibling.style.display = "block"; // Success icon
    }

    function setError(element, message) {
        element.classList.remove("input-success");
        element.classList.add("input-error");
        element.nextElementSibling.style.display = "block"; // Show error message
        element.nextElementSibling.nextElementSibling.style.display = "none"; // Hide success icon
        element.nextElementSibling.textContent = message;
    }

    function validateName() {
        const name = nameField.value.trim();
        if (name.length >= 3) {
            setSuccess(nameField);
            return true;
        } else {
            setError(nameField, "Full name is required and must be at least 3 characters.");
            return false;
        }
    }

    function validateUsername() {
        const username = usernameField.value.trim();
        if (username.length >= 3) {
            setSuccess(usernameField);
            return true;
        } else {
            setError(usernameField, "Username is required (at least 3 characters).");
            return false;
        }
    }

    function validateEmail() {
        const email = emailField.value.trim();
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailPattern.test(email)) {
            setSuccess(emailField);
            return true;
        } else {
            setError(emailField, "A valid email is required.");
            return false;
        }
    }

    function validatePhone() {
        const phone = phoneField.value.trim();
        const phonePattern = /^\d{10}$/;
        if (phonePattern.test(phone)) {
            setSuccess(phoneField);
            return true;
        } else {
            setError(phoneField, "Phone number is required (10 digits).");
            return false;
        }
    }

    function validatePassword() {
        const password = passwordField.value.trim();
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (passwordPattern.test(password)) {
            setSuccess(passwordField);
            return true;
        } else {
            setError(passwordField, "Password must be at least 8 characters and include letters and numbers.");
            return false;
        }
    }

    function validateConfirmPassword() {
        const password = passwordField.value.trim();
        const confirmPassword = confirmPasswordField.value.trim();
        if (password === confirmPassword) {
            setSuccess(confirmPasswordField);
            return true;
        } else {
            setError(confirmPasswordField, "Passwords do not match.");
            return false;
        }
    }

    function validateDOB() {
        const dob = new Date(dobField.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        const dayDifference = today.getDate() - dob.getDate();

        if (
            (age > 18) ||
            (age === 18 && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)))
        ) {
            setSuccess(dobField);
            return true;
        } else {
            setError(dobField, "You must be at least 18 years old.");
            return false;
        }
    }

    function validateStreet() {
        const street = streetField.value.trim();
        if (street.length > 0) {
            setSuccess(streetField);
            return true;
        } else {
            setError(streetField, "Street address is required.");
            return false;
        }
    }

    function validateCity() {
        const city = cityField.value.trim();
        if (city.length > 0) {
            setSuccess(cityField);
            return true;
        } else {
            setError(cityField, "City is required.");
            return false;
        }
    }

    function validateState() {
        const state = stateField.value.trim();
        if (state.length > 0) {
            setSuccess(stateField);
            return true;
        } else {
            setError(stateField, "State is required.");
            return false;
        }
    }

    function validatePin() {
        const pin = pinField.value.trim();
        const pinPattern = /^\d{6}$/;
        if (pinPattern.test(pin)) {
            setSuccess(pinField);
            return true;
        } else {
            setError(pinField, "Pin code is required (6 digits).");
            return false;
        }
    }

    function validateDoctor() {
        const doctor = doctorField.value;
        if (doctor) {
            setSuccess(doctorField);
            return true;
        } else {
            setError(doctorField, "Selecting a doctor is required.");
            return false;
        }
    }

    function validateDate() {
        const date = dateField.value.trim();
        if (date.length > 0) {
            setSuccess(dateField);
            return true;
        } else {
            setError(dateField, "Preferred date is required.");
            return false;
        }
    }

    // Add both input and blur event listeners
    function addValidationListeners(field, validationFunction) {
        field.addEventListener("input", validationFunction);
        field.addEventListener("blur", validationFunction);
    }

    // Add event listeners for real-time validation and blur validation
    addValidationListeners(nameField, validateName);
    addValidationListeners(usernameField, validateUsername);
    addValidationListeners(emailField, validateEmail);
    addValidationListeners(phoneField, validatePhone);
    addValidationListeners(passwordField, validatePassword);
    addValidationListeners(confirmPasswordField, validateConfirmPassword);
    addValidationListeners(dobField, validateDOB);
    addValidationListeners(streetField, validateStreet);
    addValidationListeners(cityField, validateCity);
    addValidationListeners(stateField, validateState);
    addValidationListeners(pinField, validatePin);
    addValidationListeners(doctorField, validateDoctor);
    addValidationListeners(dateField, validateDate);

    // Validate on form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const isValidName = validateName();
        const isValidUsername = validateUsername();
        const isValidEmail = validateEmail();
        const isValidPhone = validatePhone();
        const isValidPassword = validatePassword();
        const isValidConfirmPassword = validateConfirmPassword();
        const isValidDOB = validateDOB();
        const isValidStreet = validateStreet();
        const isValidCity = validateCity();
        const isValidState = validateState();
        const isValidPin = validatePin();
        const isValidDoctor = validateDoctor();
        const isValidDate = validateDate();

        if (
            isValidName &&
            isValidUsername &&
            isValidEmail &&
            isValidPhone &&
            isValidPassword &&
            isValidConfirmPassword &&
            isValidDOB &&
            isValidStreet &&
            isValidCity &&
            isValidState &&
            isValidPin &&
            isValidDoctor &&
            isValidDate
        ) {
            alert("Form submitted successfully!");
            // You can add further actions such as sending data to a server here.
        } else {
            alert("Please fill in all required fields correctly.");
        }
    });
});
