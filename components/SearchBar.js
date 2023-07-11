"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  function changeHandler(e) {
    setSearchTerm(e.target.value);
  }

  function searchHandler(e) {
    e.preventDefault();
    if (searchTerm.length > 0) {
      setSearchTerm('')
    }
  }
  return (
    <div className='mt-2 flex mx-auto '>
      {/* <p className='text-white'>{props.title}</p> */}
      <input value={searchTerm} onChange={changeHandler} type="text" placeholder='find your dream product..' className='py-5 w-full px-8 text-white outline-none rounded-3xl bg-white bg-opacity-20' />
      <Link href={`/searchResults?searchTerm=${searchTerm}`} className='cursor-pointer h-10 w-10 my-auto ml-1'>
        <Image  src={"/assets/find.png"} className='' height={30} width={50} />
      </Link>
    </div>
  )
}

export default SearchBar