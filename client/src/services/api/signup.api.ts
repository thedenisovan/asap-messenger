async function signupUser(
  username: string,
  email: string,
  password: string,
  passwordConfirmation: string,
) {
  const url = 'http://localhost:8080/signup';

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
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

export default signupUser;
