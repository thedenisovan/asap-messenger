import AuthFrom from './components/AuthForm';
import AuthHeader from './components/AuthHeader';
import AuthFooter from './components/AuthFooter';

export default function SingUp() {
  return (
    <>
      <title>asap. | Register</title>
      <AuthHeader
        header='Create Account'
        paragraph='Get started with your free account'
      />
      <AuthFrom isSignUpForm={true} />
      <AuthFooter
        paragraph='Already have an account? '
        toPath='../signin'
        toText='Sign in'
      />
    </>
  );
}
