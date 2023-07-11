'use client'
import React, { useEffect, useState } from 'react';
import CardList from '@/components/CardList';
import { client } from '@/sanity/lib/client';
import { useRouter, useSearchParams } from 'next/navigation';

 async function getSearchItems(category){
    const results = await client.fetch(`*[_type=="product" && category match "${category}"]`);
    return results;
}

const page = () => {
    const [product, setProduct] = useState();
    const searchParams = useSearchParams();
  const prodId = searchParams.get('category');
  const router = useRouter();

  async function fetchItems(){
    const data = await getSearchItems(prodId);
    setProduct(data);
  }
    useEffect(()=> {
      fetchItems();
    }, [])
  return (
    <div>
        <button className='text-orange-400 ml-5 mt-5 font-bold text-4xl' onClick={() => {
        router.back()
      }}>&lt;-</button>
        <h1 className='text-3xl text-orange-400 font-bold m-5 text-center'>
            {prodId}
        </h1>
        {product && <CardList data={product} />}
    </div>
  )
}

export default page