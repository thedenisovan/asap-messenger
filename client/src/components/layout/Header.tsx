import ThemeButton from '../common/ThemeButton';

export default function Header() {
  return (
    <header className='dark:bg-black dark:text-white shadow-xs dark:shadow-gray-800'>
      <div className='max-w-6xl py-4 m-auto flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>asap.</h1>
        <div>
          <ThemeButton />
        </div>
      </div>
    </header>
  );
}
