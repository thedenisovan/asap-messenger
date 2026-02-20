import ThemeButton from '../common/ThemeButton';
import NavButton from '../common/NavButton';

export default function Header() {
  return (
    <header className='dark:bg-black dark:text-white px-2 md:px-10 xl:px-0 shadow-xs dark:shadow-gray-800'>
      <div className='max-w-6xl py-4 m-auto flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>asap.</h1>
        <div className='flex gap-3'>
          <ThemeButton />
          <NavButton
            className='hidden min-[500px]:block'
            toPath='auth/signin'
            content='Sign in'
          />
          <NavButton
            className='bg-black text-white dark:bg-white dark:text-black'
            toPath='auth/signup'
            content='Sign up'
          />
        </div>
      </div>
    </header>
  );
}
