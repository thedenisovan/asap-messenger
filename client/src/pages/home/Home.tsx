import Header from '../../components/layout/Header';
import Hero from './sections/Hero';
import InfoCards from './sections/InfoCards';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='dark:bg-black transition-colors flex-1'>
        <Hero />
        <InfoCards />
      </main>
    </div>
  );
}
