'use client'
import { urlForImage } from "@/sanity/lib/image";
import { useSession } from "next-auth/react";
import { createClient } from "next-sanity";
import { use, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'




const page = async () => {
    const session = useSession();
//     useEffect(()=> {
// console.log(session?.data)

//     }, [])
    return (
        <div>
            <p>Hello Universe...</p>
        </div>
    )
}




export default page;