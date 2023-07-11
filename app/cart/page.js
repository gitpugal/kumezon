'use client'
import { client } from '@/sanity/lib/client';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { use, useEffect, useMemo, useState } from 'react';
import CardList from '@/components/CardList';
import Card from '@/components/Card';
import { useRouter } from 'next/navigation';



const getUser = async (email) => {
  const user = await client.fetch(`*[_type=="users" && email == "${email}"]`);
  return user;
}

const getCartItems = async (items) => {
  const products = await client.fetch(`*[_type=="product" && _id in [${items}]]`);
  return products;
}
const page = () => {
  const session = useSession();
  const [totalBill, settotalBill] = useState(0);
  const searchParams = useSearchParams();
  const userMail = searchParams.get('user');
  const router = useRouter();
  // const session =  useSession();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  async function fetchCart() {
    const user = await getUser(userMail);
    const items = [];

    user[0]?.cart?.map((item) => {
      items.push(`"${item}"`);
    })
    setCartItems(items.toString())
  }

  async function setCart() {
    const cartProducts = await getCartItems(cartItems);
    cartProducts.map((item) => {
      settotalBill((prev) => prev + item.price)
    })
    setProducts(cartProducts);

  }

  function updateProducts(prodId) {
    // window.location.reload(false);
    setProducts((items) => items.map((item) => item._id != prodId));
    console.log(products);
  }


  async function placeOrder() {
    const userResponse = confirm("Confirm your order?");

    if (userResponse) {
      const user = await client.fetch(`*[_type=="users" && email == "${session?.data?.user?.email}"]`)
      if (user?.length > 0) {
        if (products.length > 0) {
          console.log('====================================');
          console.log(user);
          console.log('====================================');
          const orders = user[0]?.orders || [];
          products.map((product) => {
            orders.push({
              "productId": product._id,
              "price": product.price,
              "quantity": 1,
              "delivered": true,
              "name": product.name
            })
          });
          console.log(orders);
          client.patch(`${user[0]._id}`)
            .set(
              { 
                cart: [] 
              },
              {
                orders : orders
              }
              )
            .commit().then((res) => console.log(res));
            setProducts([]);
        }
      }
    }
  }

  useEffect(() => {

    fetchCart();
  }, []);

  useEffect(() => {
    setCart();
  }, [cartItems])
  return (
    <div className='w-screen flex flex-col  gap-10 justify-center items-center h-fit'>
      <button className='text-orange-400 top-5  absolute left-4 font-bold text-4xl' onClick={() => {
        router.back()
      }}>&lt;-</button>
      <h1 className='text-4xl  font-bold absolute top-20 text-orange-400  '>Welcome to your cart</h1>
      <div className='w-[100%] mt-32 flex flex-col gap-10'>

        {
          products && products.length > 0 &&
          <CardList updateProducts={updateProducts} cardType={'cart'} data={products} />
        }
      </div>
      <div>
        <h1 className='text-orange-400 font-bold text-xl'>Orders</h1>
        <div>
          {
            products && products.length > 0 &&
            products.map((product) => (
              <div className='text-white flex flex-row gap-5'>
                <p className=' font-semibold'>{product.name}</p>
                <p className=' font-semibold'>{product.price}</p>
              </div>
            ))
          }
        </div>  
        <div className='text-white flex flex-row gap-5'>
          <p className='text-orange-400 font-semibold text-xl'>Total</p>
          <p className='text-orange-400 font-semibold text-xl'>{totalBill}</p>
        </div>
        <button onClick={() => placeOrder()} className='bg-orange-400 px-3 py-2 text-xl text-center my-3 text-white font-bold rounded-2xl'>Place Order</button>
      </div>
    </div>
  )
}

export default page