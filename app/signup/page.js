import React from 'react';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

const Login = () => {
    return (
        <div className="w-screen gap-20 flex flex-col text-white items-center h-screen overflow-x-hidden">
            <Image src={"/assets/logo.png"} className='h-10 left-10 top-5 absolute w-20 ' height={200} width={200} />
            <div className='top-20 md:top-2 relative mx-auto text-center'>
                <h1 className='text-xl'>Welcome to <span className='font-semibold text-orange-400'>kumezon</span>.</h1>
                <p className='text-5xl text-orange-300 font-bold'>Login Now</p>
                <form action="" className='h-[80%]  md:h-[70%] w-[90%] mt-10 text-left flex flex-col 
                justify-center items-start gap-2 p-6 md:p-12 mx-auto  border-orange-300 border  rounded-xl'>
                    <label className="mt-10  text-orange-300 font-bold text-xl relative left-2" htmlFor="">Email</label>
                    <SearchBar />
                    <label className="mt-10  text-orange-300 font-bold text-xl relative left-2" htmlFor="">Password</label>
                    <SearchBar />
                    <Link href={"/home"} className='bg-orange-300 text-black font-semibold rounded-2xl hover:border-orange-300 hover:border hover:bg-black hover:text-orange-300  text-xl mt-4 px-6 py-4'>signup</Link>
                    <a href="/login" className='block text-sm text-orange-300 underline'>Already have an account? login.</a>
                </form>
            </div>
        </div>
    )
}

export default Login