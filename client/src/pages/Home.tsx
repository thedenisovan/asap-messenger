import Header from '../components/layout/Header';

export default function Home() {
  return (
    <div className='flex flex-col min-h-full'>
      <Header />
      <main className='dark:bg-black -z-1 flex-1'></main>
    </div>
  );
}
