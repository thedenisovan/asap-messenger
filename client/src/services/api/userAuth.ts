import type ValidationResult from '../../types/error';
import type { Dispatch, SetStateAction } from 'react';

async function userAuth(
  username: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  url: string,
  setResultArray?: Dispatch<SetStateAction<string[]>>,
) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, passwordConfirmation }),
    });

    if (!response.ok) throw new Error(`response status: ${response.status}`);

    const result = await response.json();

    console.log(result.errors);

    if (result.errors && setResultArray) {
      result.errors.forEach((err: ValidationResult) => {
        const allowedErrors = [
          'User with give email does not exist.',
          'Invalid password.',
          'E-mail already in use.',
          'Email is required.',
          'Username must be 6-16 characters long.',
          'Username is required.',
          'Email must be of email type.',
        ];

        if (allowedErrors.includes(err.msg)) {
          setResultArray((prev) => [...prev, err.msg]);
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
}

export default userAuth;
