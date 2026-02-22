import { Link } from 'react-router';

export default function AuthFooter({
  paragraph,
  toPath,
  toText,
}: {
  paragraph: string;
  toPath: string;
  toText: string;
}) {
  return (
    <footer>
      <p className='text-center mt-4'>
        {paragraph}{' '}
        <Link
          className='text-blue-600 dark:text-blue-400 font-medium hover:underline'
          to={toPath}
        >
          {toText}
        </Link>
      </p>
    </footer>
  );
}
