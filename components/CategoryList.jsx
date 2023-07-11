import Link from 'next/link';
import React from 'react';

const CategoryList = () => {
    const categories = ['electronics', 'gadgets', 'food', 'clothing', 'toys'];
  return (
    <div className='w-full px-5 mt-3 grid grid-flow-row grid-cols-3 md:grid-cols-5  items-center justify-center '>
        {categories.map((category) => <Link href={`/category?category=${category}`} key={category} className="no-scrollbar min-w-[10%] my-1 text-xs text-center font-bold bg-orange-400 rounded-3xl mx-2 py-2 text-white" >{category}  x</Link>)}
    </div>
  )
}

export default CategoryList