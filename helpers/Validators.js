export const validationPasswordConfirmation = (value, { req }) => {
    const { password } = req.body;

    if (password !== value) {
        throw new Error('Password does not match')
    }

    return true;
}