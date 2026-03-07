import type ValidationResult from '../../types/error';
import type { Dispatch, SetStateAction } from 'react';

async function userAuth(
  username: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  path: string,
  setResultArray: Dispatch<SetStateAction<string[]>>,
) {
  try {
    const response = await fetch('http://localhost:8080/' + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, passwordConfirmation }),
    });

    if (!response.ok) throw new Error(`response status: ${response.status}`);

    const result = await response.json();

    if (result.errors) {
      const allowedErrors = [
        'User with give email does not exist.',
        'Invalid password.',
        'E-mail already in use.',
        'Email is required.',
        'Username must be 6-16 characters long.',
        'Username is required.',
        'Email must be of email type.',
      ];

      result.errors.forEach((err: ValidationResult) => {
        if (allowedErrors.includes(err.msg)) {
          setResultArray((prev) => [...prev, err.msg]);
        }
      });

      return false;
    }

    localStorage.setItem('token', result.token);
    return true;
  } catch (err) {
    console.error(err);
  }
}

export default userAuth;
