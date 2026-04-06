import { useState } from 'react';
import clientPassValidator from '../../../utils/clientPassValidator';
import userAuth from '../../../services/api/userAuth';
import { useNavigate } from 'react-router';

export default function AuthFrom({
  isSignUpForm = false,
}: {
  isSignUpForm?: boolean;
}) {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [errMessage, setErrMessage] = useState<string[]>([]);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const validatePassword = () => {
    setErrMessage([]);

    // If user is in sign in page compare pass to pass to
    // prevent error of wrong pass confirmation value
    const validityResult = isSignUpForm
      ? clientPassValidator(password, passwordConfirm)
      : clientPassValidator(password, password);

    if (validityResult !== '') {
      setErrMessage([validityResult]);
    }
  };

  return (
    <form role='form' className='flex flex-col gap-5'>
      <ul
        role='error-container'
        className={`list-dis bg-gray-100 border dark:bg-gray-100/10 dark:border-gray-600 border-gray-300 text-red-500 dark:text-red-400 rounded-lg p-3 text-sm ${errMessage.length ? '' : 'hidden'}`}
      >
        {errMessage.map((err, idx) => (
          <li role='error-element' key={idx} className='list-disc ml-3 mt-1'>
            {err}
          </li>
        ))}
      </ul>
      {isSignUpForm && (
        <div className='flex flex-col gap-2'>
          <label htmlFor='userName'>Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder='johDoe1970'
            type='text'
            id='userName'
            name='userName'
            minLength={6}
            maxLength={16}
            required
          />
        </div>
      )}
      <div className='flex flex-col gap-2'>
        <label htmlFor='userEmail'>Email Address</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoComplete='email'
          placeholder='johDoe@odin.com'
          type='email'
          name='email'
          id='userEmail'
          role='userEmail'
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='userPassword'>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
          placeholder='******'
          type='password'
          name='password'
          id='userPassword'
          role='userPassword'
          pattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{6,}$'
          value={password}
          required
        />
      </div>
      {isSignUpForm && (
        <div className='flex flex-col gap-2'>
          <label htmlFor='passwordConfirmation'>Password Confirmation</label>
          <input
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder='******'
            type='password'
            id='passwordConfirmation'
            value={passwordConfirm}
            pattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{6,}$'
            required
          />
        </div>
      )}

      <button
        role='auth-button'
        onClick={async (e) => {
          e.preventDefault();
          setEmail('');
          setPassword('');
          setPasswordConfirm('');
          setUsername('');
          setIsButtonLoading(true);

          validatePassword();

          // Save return boolean value in result variable, truthy
          // for successful sign(in/up) falsy for unsuccessful
          const result = await userAuth(
            username,
            email,
            password,
            passwordConfirm,
            // If user is in signup page use signup api url else signin
            isSignUpForm ? 'signup' : 'signin',
            setErrMessage,
          );

          setIsButtonLoading(false);

          // If result is true and user is in signup page
          // redirect him to sing in page
          if (result && isSignUpForm) {
            navigate('/auth/signin');
          } else if (result && !isSignUpForm) {
            // Navigate to chat page with uid 0,
            // later it is redirected to page of users uid
            navigate('/dashboard/0');
          }
        }}
        className='bg-blue-500 rounded-lg p-2 text-white hover:bg-blue-500/90 hover:cursor-pointer transition-colors text-lg! font-medium!'
        type='submit'
      >
        {isSignUpForm && !isButtonLoading && 'Create account'}
        {!isSignUpForm && !isButtonLoading && 'Sign In'}
        {isButtonLoading && (
          <span className='flex justify-center animate-spin!'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
              fill='#fff'
            >
              <path d='M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480.5-80Q398-80 325-111.5Z' />
            </svg>
          </span>
        )}
      </button>
    </form>
  );
}
