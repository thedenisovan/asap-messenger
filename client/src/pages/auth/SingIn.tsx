import AuthFooter from './components/AuthFooter';
import AuthFrom from './components/AuthForm';
import AuthHeader from './components/AuthHeader';

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
