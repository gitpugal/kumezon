'use client'
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import CardList from '@/components/CardList';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import BannerCarousel from '@/components/BannerCarousel';
import 'react-loading-skeleton/dist/skeleton.css';
import { client } from '@/sanity/lib/client';
import CategoryList from '@/components/CategoryList';

async function getProducts() {

  const products = await client.fetch(`*[_type == "product"]`);
  return products;
}

export default function Home() {




  const session = useSession();
  const router = useRouter();

  const [data, setData] = useState([]);

  const fetchData = async () => {
    if (session) {
      if (session?.status == 'authenticated') {
        const users = await client.fetch(`*[_type == "users" && email == "${session?.data?.user?.email}"]`);
        if (users?.length <= 0) {
          await client.create({
            _type: "users",
            username: session?.data?.user?.name,
            email: session?.data?.user?.email,
            favorites: [],
            cart: []
          })
        }
      }
    }
    const response = await getProducts();
    setData(response);
  }


  function signOutt() {
    const logout = confirm("Are you sure to sign out?");
    if (logout == true) {
      signOut();
      router.push("/");
    }
  }

  function sortBy(param) {
    var sortedData;
    if (param != 'price') {
      sortedData = [...data].sort((a, b) => {
        const categoryB = b[param] || '';
        const categoryA = a[param] || '';
        return categoryA.localeCompare(categoryB);
      });
    } else {
      sortedData = [...data].sort((a, b) => a[param] - b[param]);
    }
    setData(sortedData);
  }

  function applyFilters(filterParams){
    const filteredData = [...data].filter((item) => {
      if(item['category']){
        if(filterParams.includes(item['category'])){
          return item;
        }
      }
    });

    setData(filteredData);
  }

  useEffect(() => {
    if (data.length == 0) {
      fetchData();
    }

  }
    , []);


  return (
    <div className="w-screen   flex flex-col gap-2 h-fit overflow-x-hidden">
      <Navbar signOutt={signOutt} applyFilters={applyFilters} sortBy={sortBy} session={session || {}} />
      <BannerCarousel />
      <SearchBar />
      {/* <Carousel data={data} /> */}
      <CategoryList />
      <CardList data={data} />
      <ScrollToTopButton />
    </div>
  )
}
