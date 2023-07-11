import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonLoader = () => {
  return (
    <div className="text-white border-orange-400 border-2 bg-white 
    p-10 hover:scale-105 
    transition-all ease-in-out  min-h-[45vh] max-h-fit md:min-h-[80vh] w-[100%] md:w-[100%] 
    mx-auto cursor-pointer relative bg-opacity-10 rounded-xl">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton circle={false} height={100} />
            <p className='bottom-0 relative top-10 m-5'>
              <Skeleton count={3} />
            </p>
          </SkeletonTheme>
        </div>

  )
}

export default SkeletonLoader