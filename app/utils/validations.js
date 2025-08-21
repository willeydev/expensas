function validateEmail(email) {
    // Expressão regular para validar um endereço de e-mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

module.exports = {
    validateEmail
}