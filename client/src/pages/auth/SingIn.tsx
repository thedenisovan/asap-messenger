import AuthFooter from './sections/AuthFooter';
import AuthFrom from './sections/AuthForm';
import AuthHeader from './sections/AuthHeader';

export default function Signin() {
  return (
    <>
      <title>asap. | Log in</title>
      <AuthHeader
        header='Welcome Back'
        paragraph='Sign in to continue to Messenger'
      />
      <AuthFrom />
      <AuthFooter
        paragraph='No account? No problem! Just '
        toPath='../signup'
        toText='sign up'
      />
    </>
  );
}
