export default function AuthFrom({
  isSignUpForm = false,
}: {
  isSignUpForm?: boolean;
}) {
  return (
    <form className='flex flex-col gap-5'>
      {isSignUpForm && (
        <div className='flex flex-col gap-2'>
          <label htmlFor='userName'>Username</label>
          <input
            placeholder='johDoe1970'
            type='text'
            id='userName'
            name='userName'
            required
          />
        </div>
      )}
      <div className='flex flex-col gap-2'>
        <label htmlFor='userEmail'>Email Address</label>
        <input
          placeholder='johDoe@odin.com'
          type='email'
          name='email'
          id='userEmail'
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='userPassword'>Password</label>
        <input
          placeholder='******'
          type='password'
          name='password'
          id='userPassword'
          required
        />
      </div>
      {isSignUpForm && (
        <div className='flex flex-col gap-2'>
          <label htmlFor='passwordConfirmation'>Password Confirmation</label>
          <input
            placeholder='******'
            type='password'
            id='passwordConfirmation'
          />
        </div>
      )}

      <button
        className='bg-blue-500 rounded-lg p-2 text-white hover:bg-blue-500/90 hover:cursor-pointer transition-colors text-lg! font-medium!'
        onClick={(e) => e.preventDefault()}
        type='submit'
      >
        {isSignUpForm ? 'Create account' : 'Sign In'}
      </button>
    </form>
  );
}
