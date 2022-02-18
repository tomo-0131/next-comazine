function Footer() {
  return (
    <footer className='fixed max-w-6xl mt-2 bottom-0 bg-white flex -mt-12 h-10 w-full items-center justify-center border-t p-4 md:p-3'>
      <a
        className='flex text-gray-600 text-xs'
        href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
      >
        ©2021 COMAZINE /
        <img src='/vercel.svg' alt='Vercel Logo' className='h-4 ml-1 bg-white rounded-md p-1' />
      </a>
    </footer>
  );
}

export default Footer;
