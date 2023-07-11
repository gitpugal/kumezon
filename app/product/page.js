'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';
import { useSession } from 'next-auth/react';
import {db} from '@/utils/firebase';

async function getProducts(prodId) {
  const products = await client.fetch(`*[_type == "product" && _id=="${prodId}"]`);
  return products;
}

async function getComments(prodId) {
  const comments = await client.fetch(`*[_type == "comment" && post == "${prodId}"]`,
  );
  return comments;
}



export default function Users() {
  const session = useSession();
  const [product, setProduct] = useState();
  const [comments, setComments] = useState();
  const [user, setUser] = useState();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userComment, setuserComment] = useState("");
  const searchParams = useSearchParams();
  const prodId = searchParams.get('id');
  const router = useRouter();
  const [data, setData] = useState();

  const fetchData = async () => {
    const product = await getProducts(prodId);
    const comments = await getComments(prodId);
    setProduct(product[0]);
    setComments(comments);
    setUser(session?.data?.user?.name);
    // db.collection('users').add({
    //   name: "pugal",
    //   email: "pugalarasan2014@gmail.com"
    // })
  }
  useEffect(() => {
    if(session?.data){
      setisLoggedIn(true);
    }else{
      setisLoggedIn(false);
    }
    fetchData();
  }
    , [])

  async function postComments(e) {
    e.preventDefault();
    if(userComment.length > 0){
      if(!isLoggedIn){
        alert("You must login first!");
        router.push("/")
      }
      await client.create({
        _type: "comment",
        user: session?.data?.user?.name,
        description: userComment,
        post: prodId
      }).then(async (res) => {
        setComments((prev) => [...prev, res]);
      })
      setuserComment("");
    }else{
      alert("Enter a valid comment!")
    }    
  }

  async function deleteComment(commentId) {
      
    if(!isLoggedIn){
      alert("You must login first!");
      router.push("/")
    }else{
      await client.delete(commentId).then((res) => {
        setComments((prevComment) => prevComment.filter((commentDat) => commentDat._id != commentId));
      })
    }
  }

  function inputChangeHandler(e) {
    e.preventDefault();
    setuserComment(e.target.value);
  }
  return (
    <div className='text-white  w-screen min-h-screen max-h-fit py-10  mb-10 px-16'>
      <button className='text-orange-400 font-bold text-4xl' onClick={() => {
        router.back()
      }}>&lt;-</button>
      {
        product &&
        <Link href={`/product?id=${product.name}`}>
          <div id={product.name} className='mt-10 p-5 pb-10 text-white w-full h-fit'>
            <p className='text-orange-400 text-3xl font-bold'>{product.name}</p>

            <Image key={Math.random()} src={urlForImage(product.image).url()} className='rounded-3xl bottom-2 mt-20 h-[80%] w-[90%] lg:h-[50%] lg:w-[30%] mx-auto ' height={100} width={100} />
            <p className='text-gray-300 mt-10 text-sm font-semibold' ><span className='text-orange-400'>Features:</span>  {product.description}</p>
            <button className='bg-orange-400 p-2 rounded-2xl text-white text-2xl font-bold w-full mt-10'>Buy Now</button>
          </div>
        </Link>

      }
      <div className='flex flex-col items-center '>
        <h1 className='text-orange-400 text-3xl  my-5 font-bold'>Comments</h1>
        {comments && comments.map((productComment) => (
          <div className='w-[100%] my-2 h-fit bg-white bg-opacity-10 p-5 relative rounded-xl'>
            {productComment.user == user && <button onClick={() => {
              deleteComment(productComment._id)
            }} className='bg-red-600 absolute 
            top-2 right-2 text-white text-xs p-1 rounded-lg '>delete post</button>}
            <p className='pb-1 text-xs text-orange-400'>{productComment.user}</p>
            <p className='text-white text-md'>{productComment.description}</p>

          </div>
        ))}

        <div className='flex border-orange-400 border p-5 rounded-3xl w-[100%]  my-10 gap-5 flex-col items-center'>
          <input type="text" value={userComment} onChange={inputChangeHandler} className='bg-white bg-opacity-10 
          focus:outline-orange-400 w-full outline-none rounded-2xl p-3 border-none border-0 text-white'
            placeholder='Post your comments' />
          <button onClick={postComments} className='bg-orange-400 p-3 rounded-xl text-white'>Post Comment</button>
        </div>
      </div>
    </div>
  );
}