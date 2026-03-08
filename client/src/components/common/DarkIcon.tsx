export default function DarkIcon({ path }: { path: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24px'
      viewBox='0 -960 960 960'
      width='24px'
      fill='#1e2939'
      className='block! dark:hidden!'
    >
      <path d={path} />
    </svg>
  );
}
