function responseErrors(mapped) {
    const errors = {};
    for(let name in mapped) {
        errors[name] = mapped[name]['msg'];
    }
    return errors;
}

module.exports = responseErrors;