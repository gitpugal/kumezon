'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { TiThMenu } from 'react-icons/ti';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
import Link from 'next/link';

const Navbar = (props) => {
    const sortParameters = ['price', 'name', 'popularity', 'category'];
    const categories = ['toys', 'electronics', 'food', 'clothing', 'gadgets']
    const router = useRouter();
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    function applyFilters() {
        var inputs = document.getElementsByTagName('input');
        var inputDoc = [];
        for (let index = 0; index < inputs.length; index++) {
            if (inputs[index].checked) {
                inputDoc.push(inputs[index].name);
            }
        }
        console.log('====================================');
        console.log(inputDoc);
        console.log('====================================');
        props.applyFilters(inputDoc);
    }

    function handleCart() {
        if (!props.session?.data) {
            alert("you must login first!");
            router.push("/");
        } else {
            router.push(`/cart?user=${props.session?.data?.user?.email}`);
        }
    }



    function toggleMenu() {
        setIsMenuVisible((prev) => !prev);
    }

    useEffect(() => {
        const menuDiv = document.getElementById('menu');
        if (isMenuVisible) {
            menuDiv.style.left = "0%";
        } else {
            menuDiv.style.left = "-100%";
        }
    }, [isMenuVisible])

    return (
        <div className='flex flex-col mt-14 gap-2 pb-5'>
            <div className='top-0 bg-black z-50 fixed flex items-center flex-row  w-full mx-auto
     py-5 pl-4 pr-2 border-b-[1px] border-gray-700 justify-between text-white'>

                {/* menu */}
                <div id='menu' className='h-screen flex flex-col items-center justify-start py-5 md:py-0 top-0 left-[-100%] w-3/4 md:w-1/3 transition-all ease-in-out .9s z-50 bg-orange-400 absolute'>
                    <div onClick={toggleMenu} className='cursor-pointer flex flex-col items-center relative lg:absolute lg:top-8 lg:right-10'>
                        <AiOutlineCloseCircle color='red' size={40} />
                        <p className='text-red-600 text-xl'>close</p>
                    </div>
                    <div className='my-5 '>
                        <VscAccount className='mx-auto' size={50} />
                        {props.session?.data && <p className='text-2xl font-bold'>{props.session?.data?.user?.name}</p>}
                    </div>
                    <Link className='bg-white bg-opacity-20 rounded-xl px-3 py-2 text-white my-3 w-1/2 text-md font-bold text-center'  href={"/orders"}>orders</Link>
                    <div className='flex flex-col  items-center justify-center'>
                        <h1 className='mb-2 font-semibold text-xl'>Sort by</h1>
                        <div className='grid grid-cols-2 gap-2 items-center'>
                            {sortParameters.map((param) => (
                                <button onClick={() => props.sortBy(param)} className='border-white px-3  w-fit py-1 my-1 mx-2 border text-white rounded-2xl'>{param}</button>
                            ))}
                        </div>
                    </div>
                    <div className='flex mt-5 flex-col items-center justify-center'>
                        <h1 className='mb-2 font-semibold text-xl md:text-md'>Filter by</h1>
                        <div className='grid items-centergrid grid-cols-2 gap-2 items-center'>
                            {categories.map((param) => (
                                <div key={param} className='bg-white bg-opacity-30 rounded-2xl  px-4 py-2 my-1'>
                                    <input type='checkbox' name={param} className='mr-2' />
                                    <label htmlFor={param}>{param}</label>
                                </div>
                            ))}
                        </div>
                        <button onClick={applyFilters} className='bg-blue-500 mt-3 px-3 py-2 rounded-2xl'>apply filters</button>
                    </div>
                </div>
                <div className='flex my-auto items-center w-fit gap-2 flex-row justify-center'>
                    <TiThMenu size={20} className='text-orange-400 cursor-pointer' onClick={toggleMenu} />
                    <Image src="/assets/logo.png" className='mt-2' width={100} height={100} />
                </div>
                <div className='flex flex-row gap-2 w-fit items-center'>
                    <button className='text-sm bg-orange-400 px-4  py-2   rounded-3xl' onClick={props.session.data ? props.signOutt : () => {
                        router.push("/")
                    }}>{props.session.data ? "logout" : "login"}</button>
                    <p onClick={handleCart} className='text-sm cursor-pointer border-orange-300 border rounded-3xl  px-4 py-2'>Cart</p>
                    {props.session &&
                        <div>
                            {props.session.data?.user?.image.length > 0 && <Image src={props.session.data?.user?.image} height={35} width={35} className='rounded-full' />}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar