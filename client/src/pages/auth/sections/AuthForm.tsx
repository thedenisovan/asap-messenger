export default function AuthFrom({
  isSignUpForm = false,
}: {
  isSignUpForm?: boolean;
}) {
  return (
    <form>
      {isSignUpForm && (
        <div>
          <label htmlFor='userName'>Username</label>
          <input type='text' id='userName' name='userName' required />
        </div>
      )}
      <div>
        <label htmlFor='userEmail'>Email Address</label>
        <input type='email' name='email' id='userEmail' required />
      </div>
      <div>
        <label htmlFor='userPassword'>Password</label>
        <input type='password' name='password' id='userPassword' required />
      </div>

      <button onClick={(e) => e.preventDefault()} type='submit'>
        {isSignUpForm ? 'Sign Up' : 'Sign In'}
      </button>
      {isSignUpForm && (
        <div>
          <label htmlFor='passwordConfirmation'>Password Confirmation</label>
          <input type='password' id='passwordConfirmation' />
        </div>
      )}
    </form>
  );
}
