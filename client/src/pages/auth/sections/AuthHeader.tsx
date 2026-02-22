export default function AuthHeader({
  header,
  paragraph,
}: {
  header: string;
  paragraph: string;
}) {
  return (
    <>
      <div className='text-center mb-6'>
        <h1 className='text-3xl m-4 font-sans font-bold'>{header}</h1>
        <p className='dark:text-gray-300'>{paragraph}</p>
      </div>
    </>
  );
}
