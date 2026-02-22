export default function Footer() {
  return (
    <footer className='dark:bg-black/95 py-10 px-5 dark:text-white border-t border-gray-200 dark:border-gray-800'>
      <div className='flex justify-between max-w-400 mx-auto'>
        <h6 className='font-bold text-xl'>asap.</h6>
        <ul className='flex flex-col md:flex-row md:gap-3 dark:text-gray-300'>
          <li className='hover:underline'>
            <a href='#'>Privacy</a>
          </li>
          <li className='hover:underline'>
            <a
              target='blank'
              href='https://www.linkedin.com/in/dainis-dilevka-961a332b4/'
            >
              LinkedIn
            </a>
          </li>
          <li className='hover:underline'>
            <a
              target='blank'
              href='https://github.com/thedenisovan?tab=overview&from=2026-02-01&to=2026-02-21'
            >
              GitHub
            </a>
          </li>
        </ul>
        <p className='dark:text-gray-300'>© 2026 asap.</p>
      </div>
    </footer>
  );
}
