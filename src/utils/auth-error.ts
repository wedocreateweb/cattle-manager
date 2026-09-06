/**
 * Parses raw Clerk API errors into user-friendly, brand-native messaging.
 */
export function formatAuthError(error: any): string {
  if (!error) return 'An unexpected error occurred. Please try again.';

  // If error has a Clerk error payload (errors array)
  const clerkError = error?.errors?.[0];

  if (clerkError) {
    const code = clerkError.code;

    switch (code) {
      case 'form_identifier_not_found':
        return 'No account was found with this email address. Please check your typing or sign up.';
      case 'form_password_incorrect':
        return 'Incorrect password. Please try again or tap "Forgot password?" to reset it.';
      case 'form_identifier_exists':
      case 'form_email_address_exists':
        return 'An account with this email address already exists. Please sign in instead.';
      case 'form_code_incorrect':
        return 'The verification code you entered is incorrect. Please check your email and try again.';
      case 'form_code_expired':
        return 'The verification code has expired. Please request a new verification code.';
      case 'form_password_pwned':
        return 'This password is too common. For your security, please choose a stronger password.';
      case 'form_password_length_too_short':
        return 'Your password must be at least 8 characters long.';
      case 'user_locked':
        return 'Your account is temporarily locked due to multiple failed attempts. Please try again later.';
      case 'form_param_format_invalid':
        return 'Please enter a valid email address.';
      default:
        // Use longMessage or message if available, cleaning any generic references
        const rawMsg = clerkError.longMessage || clerkError.message || 'An error occurred during authentication.';
        return sanitizeErrorMessage(rawMsg);
    }
  }

  if (typeof error === 'string') {
    return sanitizeErrorMessage(error);
  }

  if (error instanceof Error) {
    return sanitizeErrorMessage(error.message);
  }

  return 'An unexpected authentication error occurred. Please try again.';
}

function sanitizeErrorMessage(msg: string): string {
  return msg
    .replace(/clerk/gi, 'Authentication')
    .replace(/clerk\.com/gi, '');
}
