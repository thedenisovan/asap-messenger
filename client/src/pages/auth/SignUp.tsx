import AuthFrom from './sections/AuthForm';
import { Link } from 'react-router';

export default function SingUp() {
  return (
    <>
      <div className='text-center'>
        <h1>Create Account</h1>
        <p>Get started with your free account</p>
      </div>
      <AuthFrom isSignUpForm={true} />
      <p>
        Already have an account? <Link to='../signin'>Sign in</Link>
      </p>
    </>
  );
}
