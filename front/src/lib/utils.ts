import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Username validation: 6 characters or more, must include a number
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^(?=.*\d)(?=.{6,})/;
  return usernameRegex.test(username);
};

// Password validation: 6 characters or more, must include a special character, an uppercase letter, and a number
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d)(?=.{6,})/;
  return passwordRegex.test(password);
};

// Email validation: must include "@"
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /@/;
  return emailRegex.test(email);
};

// When the user submits the form, validate the input ( Login )
export const validateLoginForm = (username: string, password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isValidUsername(username)) {
    errors.push("Username must be at least 6 characters long and include a number.");
  }

  if (!isValidPassword(password)) {
    errors.push("Password must be at least 6 characters long and include a special character, an uppercase letter, and a number.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// When the user submits the form, validate the input ( Register )
export const validateRegisterForm = (username: string, password: string, email: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isValidUsername(username)) {
    errors.push("Username must be at least 6 characters long and include a number.");
  }

  if (!isValidPassword(password)) {
    errors.push("Password must be at least 6 characters long and include a special character, an uppercase letter, and a number.");
  }

  if (!isValidEmail(email)) {
    errors.push("Please enter a valid email address.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// When the user submits the form, validate the input ( Update | Edit )
export interface AuthUpdateFormError {
	isValid: boolean;
	errors: {
			username?: string;
			password?: string;
			email?: string;
	};
}
export const validateUpdateForm = (username: string, password: string, email: string): AuthUpdateFormError => {
  const error: AuthUpdateFormError = {
		isValid: true,
		errors: {
			username: "",
			password: "",
			email: "",
		},
	};

  if (!isValidUsername(username)) {
    error.errors['username'] = "Username must be at least 6 characters long and include a number."
  }

  if (!isValidPassword(password)) {
		error.errors["password"] = "Password must be at least 6 characters long and include a special character, an uppercase letter, and a number."
  }

  if (!isValidEmail(email)) {
		error.errors["email"] = "Please enter a valid email address."
  }

  return error;
};
