export default function DarkIcon({
  path,
  width = '24px',
}: {
  path: string;
  width?: string;
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={width}
      viewBox='0 -960 960 960'
      width={width}
      fill='#1e2939'
      className='block! dark:hidden!'
    >
      <path d={path} />
    </svg>
  );
}
