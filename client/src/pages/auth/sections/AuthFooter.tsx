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
      <p className='text-center mt-3'>
        {paragraph} <Link to={toPath}>{toText}</Link>
      </p>
    </footer>
  );
}
