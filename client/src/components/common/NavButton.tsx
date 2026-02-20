import { Link } from 'react-router';

export default function NavButton({
  toPath,
  content,
  className,
}: {
  toPath: string;
  content: string;
  className?: string;
}) {
  return (
    <Link
      className={`text-sm rounded-xl px-4 py-0.75 font-medium ${className}`}
      to={toPath}
    >
      {content}
    </Link>
  );
}
