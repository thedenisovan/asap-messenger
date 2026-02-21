import { useOutletContext } from 'react-router';

export default function InfoCards() {
  return (
    <section className='bg-gray-50/70 dark:bg-gray-200/10 px-2 md:px-4 py-10'>
      <div className='max-w-500 mx-auto flex justify-center flex-col md:flex-row'>
        <Card
          heading='Lightning Fast'
          path='m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z'
          paragraph='Built on edge networks for instant message delivery worldwide.'
        />
        <Card
          heading='Secure by Default'
          path='M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z'
          paragraph='End-to-end encryption means only you read your messages.'
        />
        <Card
          heading='Focus First'
          path='M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z'
          paragraph='A minimal interface that keeps you focused on the conversation.'
        />
      </div>
    </section>
  );
}

function Card({
  path,
  heading,
  paragraph,
}: {
  path: string;
  heading: string;
  paragraph: string;
}) {
  const { globalTheme } = useOutletContext<{ globalTheme: string }>();

  return (
    <div className='flex flex-col py-10 px-4 m-4 transition-colors bg-white dark:bg-black rounded-2xl gap-2.5'>
      <div className='bg-gray-100 dark:bg-gray-100/20 p-2 rounded-full max-w-fit'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='30px'
          viewBox='0 -960 960 960'
          width='30px'
          fill={globalTheme === 'dark' ? '#fff' : '000'}
        >
          <path d={path} />
        </svg>
      </div>
      <h3 className='dark:text-white font-bold text-xl'>{heading}</h3>
      <p className='dark:text-gray-200 text-gray-600'>{paragraph}</p>
    </div>
  );
}
