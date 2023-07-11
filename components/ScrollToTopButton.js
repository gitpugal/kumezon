import { useEffect, useState } from 'react';
import Image from 'next/image';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop > 300); // Show the button after scrolling 300 pixels
  };
  

  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`scroll-to-top transition-all ease-in-out ${isVisible ? 'visible' : 'hidden'}`}
      onClick={scrollToTop}
    >
      <Image  src={"/assets/arrow.png"} height={50} width={50} className='fixed cursor-pointer bottom-10 bg-gray-600 rounded-full p-2 right-5' />

    </button>
  );
};

export default ScrollToTopButton;
