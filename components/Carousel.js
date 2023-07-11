import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Carousel = (props) => {
const scrollCarousel = (e)=> {
  var innerCarousel = document.getElementById('innerCarousel');
  innerCarousel.scrollBy({
    left: (200 * parseInt(e.target.name)),
    behavior: "smooth"
  }) 

}
  const router = useRouter();
  return (
    <div className='relative'>
      <Image src={"/assets/arrow.png"}  name={-1} onClick={scrollCarousel} height={50} width={50} className='left-3 shadow-sm border-orange-400 border-4 top-1/3 absolute z-10 rotate-[-90deg] cursor-pointer bg-gray-600 rounded-full p-2 right-5' />

      <div id='innerCarousel' className='w-screen relative flex flex-row gap-5 md:gap-20 overflow-x-scroll  max-h-[28%] min-h-[28%] md:min-h-[45%] bg-white'>
        {
          props.data && props.data.map((product) => (
            <Image alt={product.id} className='py-5 mx-3 rounded-3xl my-auto md:h-full w-full' onClick={
              () => {
                router.push(`/product?id=${product.id}`)
              }
            } src={product.image} width={100} height={20} />
          ))
        }
      </div>
      <Image src={"/assets/arrow.png"} name={1} onClick={scrollCarousel} height={50} width={50} className='top-1/3 shadow-sm border-orange-400 border-4 absolute z-10 right-3 rotate-90 cursor-pointer bg-gray-600 rounded-full p-2' />
    </div>
  )
}

export default Carousel