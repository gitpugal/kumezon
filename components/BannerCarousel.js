import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const BannerCarousel = () => {

var items = [1,2,3,4,5];
const scrollCarousel = (e)=> {
  var innerCarousell = document.getElementById('innerCarousell');
  innerCarousell.scrollBy({
    left: ((window.innerWidth+20) * parseInt(e.target.name)),
    behavior: "smooth"
  }) 

}
  const router = useRouter();
  return (
    <div className='relative'>
      <Image alt='left arrow' src={"/assets/arrow.png"}  name={-1} onClick={scrollCarousel} height={50} width={50} className='left-3 shadow-sm border-orange-400 border-4 top-1/3 absolute z-10 rotate-[-90deg] cursor-pointer bg-gray-600 rounded-full p-2 right-5' />

      <div id='innerCarousell' className='w-screen relative flex flex-row gap-5 md:gap-20 overflow-auto no-scrollbar max-h-[30%] min-h-[30%] md:min-h-[45%] bg-white'>
        {
           items.map((id) =>  <Image key={id} alt={id} className='' 
           src={`/assets/carousel_imgs/c${id}.jpg`} width={700} height={20} />)
        }
      </div>
      <Image alt='right arrow' src={"/assets/arrow.png"} name={1} onClick={scrollCarousel} height={50} width={50} className='top-1/3 shadow-sm border-orange-400 border-4 absolute z-10 right-3 rotate-90 cursor-pointer bg-gray-600 rounded-full p-2' />
    </div>
  )
}

export default BannerCarousel