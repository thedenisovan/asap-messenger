export default function clientPassValidator(
  password: string,
  passwordConfirmation: string,
) {
  const passRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-#?!@$%^&*]).{6,}$/;

  if (!passRegex.test(password))
    return 'Password must be 6+ chars, with at least one uppercase, lowercase, number and symbol.';
  else if (password !== passwordConfirmation) return 'Passwords did not match.';

  return '';
}
