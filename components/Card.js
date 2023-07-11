import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { urlForImage } from '@/sanity/lib/image';
import { useRouter } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { useSession } from 'next-auth/react';
import { Tilt } from 'react-tilt';

const Card = (props) => {

  const defaultOptions = {
    reverse: false,  // reverse the tilt direction
    max: 35,     // max tilt rotation (degrees)
    perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
    // scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000,   // Speed of the enter/exit transition
    transition: true,   // Set a transition on enter/exit.
    axis: null,   // What axis should be disabled. Can be X or Y.
    reset: true,    // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
  }
  const router = useRouter();
  const session = useSession();
  const [showModal, setShowModal] = useState(false);

  function showModalBox() {
    setShowModal((prev) => !prev);
  }
  function closeModalBox() {
    setShowModal(false);
  }

  async function addtoCart(prodId) {
    if (!session?.data) {
      alert("You must login first!");
      router.push("/");
    } else {
      const user = await client.fetch(`*[_type=="users" && email == "${session?.data?.user?.email}"]`)
      if (user?.length > 0) {
        if (props.type == "cart") {
          const newArray = user[0]?.cart?.filter((item) => item != prodId);
          client.patch(`${user[0]._id}`)
            .set({ cart: newArray })
            .commit().then((res) => console.log(res))
          props.updateProducts(prodId);
          
        } else {
          let newArray;
          if(user[0]?.cart?.length > 0){
              newArray = [...user[0]?.cart];
              newArray.push(prodId)
          }else{
           newArray = [prodId];
          }
          console.log(newArray);
          client.patch(`${user[0]._id}`)
            .set({
              cart: newArray
            })
            .commit().then((res) => {
              console.log(res);
            })
        }


      }
    }
  }
  return (
    <Tilt options={defaultOptions}>
      <div key={props.product?.name} onMouseLeave={closeModalBox} className='text-white border-orange-400 border-2 bg-white 
      p-10 hover:scale-105 
      transition-all ease-in-out  min-h-[45vh] max-h-fit md:min-h-[80vh] w-[100%] md:w-[100%] 
      mx-auto cursor-pointer relative bg-opacity-10 rounded-xl'>
        <p className='top-0 absolute right-5 text-4xl text-orange-400' onClick={showModalBox}>...</p>
        {showModal && <p className='absolute right-5 bg-orange-400 rounded-xl p-5 top-10'>Add to favorite</p>}
        <div onClick={() => {
          router.push(`/product?id=${props.product?._id}`)
        }} className='items-center justify-center flex flex-col text-left'>
          <Image alt={props.product?.name} src={urlForImage(props.product?.image).url()} className='bottom-2 
      h-[50%] w-[80%] md:h-[30%] md:w-[80%] rounded-3xl mt-4  mx-auto' height={100} width={100} />
          <hr className='mb-2 mt-2 border-none w-[100%] mx-auto bg-orange-400 h-1 rounded-full' />
          <div>
            <p className='text-gray-400 text-sm pb-1'>{props.product?.category}</p>
            <p className='text-white text-lg font-semibold '>{props.product?.name}</p>
            <p className='text-2xl font-extrabold text-orange-400 '>₹{props.product?.price} <span className='text-lg font-semibold text-orange-400 line-through '>{props.product?.price * 2}</span></p>
            <p className='text-gray-300 text-sm'>{props.product?.description?.substring(0, 50)}</p>
          </div>
        </div>
        <button className='bg-orange-400 px-1 py-2 rounded-xl  w-[80%] bottom-5 absolute mx-auto' onClick={() => addtoCart(props.product?._id)}>{props.type == "cart" ? "Remove from cart" : "Add to cart"}</button>

      </div>
    </Tilt>
  )
}

export default Card
