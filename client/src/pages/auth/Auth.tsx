import { Outlet } from 'react-router';
import { Link } from 'react-router';
import { useOutletContext } from 'react-router';

export default function Auth() {
  const { globalTheme } = useOutletContext<{ globalTheme: string }>();

  return (
    <main className='p-5 dark:bg-black/90 dark:text-white min-h-screen flex justify-center'>
      <div className='w-lg flex gap-3 justify-center flex-col'>
        {/* Back to home page button */}
        <Link className='self-end' to='..'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
            fill={globalTheme === 'dark' ? '#fff' : '#000'}
          >
            <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
          </svg>
        </Link>
        <div className='p-8 bg-gray-50 dark:bg-gray-100/3 rounded-2xl border dark:border-gray-800 border-gray-200 shadow-2xl'>
          {/* Mail svg icon */}
          <div className='bg-blue-500 max-w-fit mx-auto p-4 rounded-xl'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='40px'
              viewBox='0 -960 960 960'
              width='40px'
              fill='#fff'
            >
              <path d='M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z' />
            </svg>
          </div>
          <Outlet />
        </div>
      </div>
    </main>
  );
}
