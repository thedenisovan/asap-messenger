import AuthFrom from './sections/AuthForm';
import { Link } from 'react-router';

export default function Signin() {
  return (
    <>
      <div className='text-center'>
        <h1>Welcome Back</h1>
        <p>Sign in continue to Messenger</p>
      </div>
      <AuthFrom />
      <p>
        No account? No problem! Just <Link to='../signup'>sign up</Link>
      </p>
    </>
  );
}
