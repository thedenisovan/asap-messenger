import ThemeButton from '../common/ThemeButton';
import NavButton from '../common/NavButton';

export default function Header() {
  return (
    <header className='dark:bg-black z-2 transition-colors dark:text-white px-2 md:px-10 xl:px-0 border-b border-gray-200 dark:border-gray-800'>
      <div className='max-w-420 py-4 m-auto flex items-center justify-between'>
        <h1 className='text-3xl font-bold cursor-alias'>asap.</h1>
        <div className='flex gap-3'>
          <ThemeButton />
          <NavButton
            className='hidden min-[500px]:block'
            toPath='auth/signin'
            content='Sign in'
          />
          <NavButton
            className='bg-black hover:bg-black/85 dark:hover:bg-white/90 transition-colors text-white dark:bg-white dark:text-black'
            toPath='auth/signup'
            content='Sign up'
          />
        </div>
      </div>
    </header>
  );
}
