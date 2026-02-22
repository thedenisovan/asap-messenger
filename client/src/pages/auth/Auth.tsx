import { Outlet } from 'react-router';
import { Link } from 'react-router';
import { useOutletContext } from 'react-router';

export default function Auth() {
  const { globalTheme } = useOutletContext<{ globalTheme: string }>();

  return (
    <main className='dark:bg-black h-screen flex justify-center items-center'>
      <div className='max-w-4xl flex justify-center items-center flex-col'>
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
        <div className=' p-5 bg-gray-200 shadow-2xl'>
          {/* Mail svg icon */}
          <div className='bg-blue-500 max-w-fit mx-auto p-2 rounded-xl'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='30px'
              viewBox='0 -960 960 960'
              width='30px'
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
