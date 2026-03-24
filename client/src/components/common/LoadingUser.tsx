export default function LoadingUser() {
  return (
    <div className='flex gap-2 max-w-full'>
      <div className='animate-pulse transition-none duration-900 rounded-full bg-neutral-400 dark:bg-white/20 h-13 w-13'></div>
      <div className=' flex flex-col animate-pulse duration-900'>
        <p className='h-5 rounded-2xl w-50 mb-2  bg-neutral-400 dark:bg-white/20'></p>
        <p className='h-5 rounded-2xl w-70  bg-neutral-400 dark:bg-white/20'></p>
      </div>
    </div>
  );
}
