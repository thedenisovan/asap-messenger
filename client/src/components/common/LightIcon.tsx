export default function LightIcon({ path }: { path: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24px'
      viewBox='0 -960 960 960'
      width='24px'
      fill='#e5e7eb'
      className='hidden! dark:block!'
    >
      <path d={path} />
    </svg>
  );
}
