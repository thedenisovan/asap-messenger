import Header from '../../components/layout/Header';
import Hero from './sections/Hero';
import InfoCards from './sections/InfoCards';
import CallToAction from './sections/CallToAction';
import Footer from '../../components/layout/Footer';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='dark:bg-black/95 transition-colors flex flex-col flex-1'>
        <Hero />
        <InfoCards />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
