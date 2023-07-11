'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Card from './Card';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonLoader from './SkeletonLoader';

const CardList = (props) => {
  const [products, setProducts] = useState(props.data);
  useEffect(()=>{
    setProducts(props.data)
    // console.log(props.data);
  }, [props]);


  function updateProducts(prodId){
    setProducts((items) => items.filter((item) => item._id != prodId));
    console.log(products);
    alert("Item added to cart!")
  }
  return (
    <div className=' w-full  mt-10 h-fit justify-center flex'>

      {
        products &&
          products.length > 0 ?
          <div className='justify-center text-black pb-10 items-center grid grid-cols-1 md:grid-cols-4 px-10 md:px-3 h-fit w-screen gap-10'>
            {products && products.map((product) => (
              <Card updateProducts={updateProducts} type={props.cardType || 'display'} key={product.name} product={product} />
            ))
            }
          </div>
          :
          <div className='px-10 justify-center pb-10 items-center grid grid-cols-1 md:grid-cols-4  md:px-3  w-screen gap-10'>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>

      }

    </div>
  )
}

export default CardList