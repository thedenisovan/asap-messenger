import NavButton from '../../../components/common/NavButton';

export default function CallToAction() {
  return (
    <section className='flex flex-1 flex-col h-full py-10 md:py-20 items-center justify-center'>
      <h4 className='animate-slide-up text-4xl font-bold dark:text-white'>
        Ready to simplify?
      </h4>
      <NavButton
        className='animate-slide-up bg-black px-10 py-3 hover:bg-black/90 dark:hover:bg-gray-100/90 transition-colors text-white dark:bg-white dark:text-black mt-4'
        toPath='/auth/signup'
        content='Start asap. free'
      />
    </section>
  );
}
