'use client'
import React, { useEffect, useState } from 'react';
import CardList from '@/components/CardList';
import { client } from '@/sanity/lib/client';
import { useRouter, useSearchParams } from 'next/navigation';

 async function getSearchItems(searchTerm){
    const results = await client.fetch(`*[_type=="product" && name match "${searchTerm}"]`);
    return results;
}

const searchResults = () => {
    const [product, setProduct] = useState();
    const searchParams = useSearchParams();
    const router = useRouter();
  const prodId = searchParams.get('searchTerm');

  async function fetchItems(){
    const data = await getSearchItems(prodId);
    setProduct(data);
  }
    useEffect(()=> {
      fetchItems();
    }, [])
  return (
    <div className='w-screen h-screen'>
      <button className='text-orange-400 font-bold text-4xl absolute left-5 top-5 ' onClick={() => {
                router.back()
            }}>&lt;-</button>
        <div className='mt-20 relative'>
        {product && <CardList data={product} />}
        </div>
    </div>
  )
}

export default searchResults