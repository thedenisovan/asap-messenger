import NavButton from '../../../components/common/NavButton';

export default function Hero() {
  return (
    <section className='overflow-hidden flex mx-auto flex-col gap-5 justify-center items-center py-10'>
      <HeroHeader />
      <h2 className='animate-slide-up-2 text-[clamp(1.25rem,2vw+2rem,4.5rem)] leading-12 md:leading-13 lg:leading-14 xl:leading-17 2xl:lead`ing-19 ` transition-transform font-bold text-center dark:text-white'>
        Messaging, <span className='block'>stripped back.</span>
      </h2>
      <p className='animate-slide-up-3 dark:text-gray-300 md:text-lg lg:text-xl lg:max-w-2xl text-center px-6 max-w-xl'>
        No clutter. No distractions. Just pure, instant communication designed
        for speed and clarity.
      </p>
      <NavButton
        className='animate-slide-up-4 group hover:bg-black/85 flex gap-2 items-center dark:hover:bg-white/90 transition-colors bg-black px-6 py-2 text-white dark:text-black cursor-pointer dark:bg-white'
        toPath='/auth/signin'
        content='Start Messaging'
        isArrowVisible={true}
      />
    </section>
  );
}

function HeroHeader() {
  return (
    <header className='animate-slide-up-1  flex items-center gap-2 dark:text-white bg-gray-100 dark:bg-white/15 rounded-2xl px-3 border border-gray-300 dark:border-gray-700'>
      <div className='w-2 h-2 bg-black dark:bg-white rounded-full'>
        <span className='block w-2 h-2 bg-black dark:bg-white rounded-full animate-ping'></span>
      </div>
      <p className='text-sm'>v1.0 is now live</p>
    </header>
  );
}
