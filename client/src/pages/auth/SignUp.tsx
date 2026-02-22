import AuthFrom from './sections/AuthForm';
import AuthHeader from './sections/AuthHeader';
import AuthFooter from './sections/AuthFooter';

export default function SingUp() {
  return (
    <>
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
