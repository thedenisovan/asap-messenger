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
        {isSignUpForm ? 'Create account' : 'Sign In'}
      </button>
    </form>
  );
}
