'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { SessionProvider, getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from "framer-motion";


export default function Home() {

  const session = useSession();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [providers, setProviders] = useState([]);

  const fetchData = async () => {
    const provider = await getProviders();
    setProviders(provider);
  }
  useEffect(() => {
    fetchData();
  }
    , [])
    useEffect(()=>{
     if(session?.status == 'authenticated'){
      router.push("/home")
     }

    }, [session?.status])
  return (

    <main className="w-screen  flex flex-col text-white items-center justify-center h-full m-auto absolute overflow-x-hidden">
      
      <Image alt='kumezon logo' src={"/assets/cart.png"} className='h-30 w-70 ' height={100} width={100} />
      <Image alt='kumezon logo' src={"/assets/logo.png"} className='h-50 w-80 ' height={270} width={270} />
      
      <p>your <span className='text-orange-400'>window shopping</span> partner.</p>
      {session.status != 'authenticated' ? 
      <div className='flex mt-16 flex-row gap-5 items-center justify-center h-fit w-[45%]'>
        {providers && Object.values(providers).map((provider) =>
          <button key={Math.random() * 1000} className='bg-orange-400 flex-1 text-black font-semibold rounded-md 
            hover:border-orange-400 hover:border hover:bg-black hover:text-orange-400  text-xl px-9 py-4'
            onClick={
              (e) => {
                e.preventDefault();
                signIn('google', {
                  callbackUrl: '/home',
                })
              }
            }>{provider.name}</button>
        )
        }
        <Link href={"/home"} className='border-orange-400 block flex-1 border font-semibold text-orange-400 hover:bg-orange-400 hover:text-black rounded-md text-xl px-9 py-4 text-center'>Guest</Link>

      </div>
        : <p>You're logged in {session?.data?.user?.name}</p>
      }
    </main>
  )
}

