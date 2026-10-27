export const STATIC_CREDENTIALS = [
    { userId: "admin", password: "admin123" },
];

export const validateSignIn = (values) => {
    const errors = {};

    const userId = values.userId?.trim() || "";
    const password = values.password?.trim() || "";

    // 1. Validate empty fields
    if (!userId) {
        errors.userId = "User ID is required";
    }

    if (!password) {
        errors.password = "Password is required";
    }

    // If both are empty, return early with required errors
    if (!userId && !password) {
        return errors;
    }

    // Check credentials against static credentials
    const matchedAccount = STATIC_CREDENTIALS.find(
        (cred) => cred.userId.toLowerCase() === userId.toLowerCase()
    );

    const isPasswordValidForAny = STATIC_CREDENTIALS.some(
        (cred) => cred.password === password
    );

    // If User ID is entered but does not match any user
    if (userId && !matchedAccount) {
        errors.userId = "User ID not recognized. Please try again";
    }

    // If Password is entered
    if (password) {
        if (matchedAccount) {
            // User ID was correct, check if password matches this user
            if (matchedAccount.password !== password) {
                errors.password = "Incorrect password. Please try again";
            }
        } else {
            // User ID was wrong, check if password is also wrong
            if (!isPasswordValidForAny) {
                errors.password = "Incorrect password. Please try again";
            }
        }
    }

    return errors;
};

export default validateSignIn;