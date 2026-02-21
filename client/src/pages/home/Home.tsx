import Header from '../../components/layout/Header';
import Hero from './sections/Hero';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='dark:bg-black transition-colors flex-1'>
        <Hero />
      </main>
    </div>
  );
}
