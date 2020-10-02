import enum


class ValidationError(enum.Enum):
    def __init__(self, field, description):
        self.description = description
        self.field = field

    LOGIN_INCORRECT = ("loginEmailError", "Account doesn't exist")
    LOGIN_PASSWORD_INCORRECT = ("loginPasswordError", "Password incorrect")
    USERNAME_TAKEN = ("userNameError", "User name is already taken")
    EMAIL_TAKEN = ("emailError", "Email is already used")


