'use client'
import { client } from '@/sanity/lib/client';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'

const page = () => {
    const session = useSession();
    const router = useRouter();
    const [userData, setUser] = useState();
    async function fetchData() {
        const user = await client.fetch(`*[_type=="users" && email == "${session?.data?.user?.email}"]`);
        setUser(user[0]);
        console.log(userData);
    }
    useEffect(() => {
        if (!session?.data?.user || userData) {
            router.push("/home");
        }
        fetchData();
    }, [])

    return (
        <div className='w-screen h-screen flex flex-col items-center gap-5 py-5'>
            <button className='text-orange-400 font-bold text-4xl absolute left-5 top-5' onClick={() => {
                router.back()
            }}>&lt;-</button>
            <h1 className='text-xl text-orange-400 font-bold'>
                Orders
            </h1>
            {
                userData && userData?.orders?.length > 0 && (
                    <div className='text-white'>
                        {
                            userData?.orders?.map((order) => (
                                <div className='text-orange-400 flex flex-row gap-5'>
                                    <p className=' font-semibold text-2xl'>{order.name}</p>
                                    <p className=' font-semibold text-2xl'>{order.price}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default page