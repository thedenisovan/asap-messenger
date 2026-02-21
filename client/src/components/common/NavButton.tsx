import { Link } from 'react-router';

export default function NavButton({
  toPath,
  content,
  className,
  isArrowVisible = false,
}: {
  toPath: string;
  content: string;
  className?: string;
  isArrowVisible?: boolean;
}) {
  return (
    <Link
      className={`${className} px-4 py-0.75 text-sm rounded-full font-medium`}
      to={toPath}
    >
      {content}
      {isArrowVisible && (
        <div className='group-hover:translate-x-2 duration-200'>
          <div className='hidden dark:inline'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
              fill='#000'
            >
              <path d='m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z' />
            </svg>
          </div>
          <div className='inline dark:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
              fill='#fff'
            >
              <path d='m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z' />
            </svg>
          </div>
        </div>
      )}
    </Link>
  );
}
