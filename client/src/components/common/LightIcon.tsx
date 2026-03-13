export default function LightIcon({
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
      fill='#e5e7eb'
      className='hidden! dark:block!'
    >
      <path d={path} />
    </svg>
  );
}
