import { useOutletContext } from 'react-router';

export default function InfoCards() {
  return (
    <section className='grid grid-cols-1  md:grid-cols-3'>
      <Card
        heading='Lightning Fast'
        path='m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z'
      />
      <Card
        heading='Secure by Default'
        path='M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z'
      />
      <Card
        heading='Focus First'
        path='M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z'
      />
    </section>
  );
}

function Card({ path, heading }: { path: string; heading: string }) {
  const { globalTheme } = useOutletContext<{ globalTheme: string }>();

  return (
    <div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height='24px'
        viewBox='0 -960 960 960'
        width='24px'
        fill={globalTheme === 'dark' ? '#fff' : '000'}
      >
        <path d={path} />
      </svg>
      <h3 className='dark:text-white'>{heading}</h3>
    </div>
  );
}
