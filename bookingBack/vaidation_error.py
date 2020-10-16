import enum


class ValidationError(enum.Enum):
    def __init__(self, field, description):
        self.description = description
        self.field = field

    LOGIN_INCORRECT = ("loginEmailError", "Account doesn't exist")
    LOGIN_PASSWORD_INCORRECT = ("loginPasswordError", "Password incorrect")

    USERNAME_TAKEN = ("userNameError", "User name is already taken")
    USERNAME_SYNTAX = ("userNameError", "User name can't contains spaces, commas, &, +, =, <, > and dots")
    EMAIL_TAKEN = ("emailError", "Email is already used")
    EMAIL_SYNTAX = ("emailError", "E-mail has to contain '@'")
    PASSWORD_LENGTH = ("passwordError", "Password should contain at least 8 characters")
    PASSWORDS_NOT_SAME = ("confirmError", "Passwords are not the same")
    SESSION_HAS_EXPIRED = ("alert", "session has expired, log in again")
    CANT_DELETE_BOOKING = ("alert", "You are not allowed to delete this booking")




