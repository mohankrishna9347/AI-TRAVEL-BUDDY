import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { FaShare } from "react-icons/fa6";
import { getUnsplashImage } from '@/service/GlobalApi';

function InfoSection({ trip }) {
  const [imageUrl, setImageUrl] = useState('/Placeholder.jpg');

  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      fetchImage(trip.userSelection.location.label);
    }
  }, [trip]);

  const fetchImage = async (query) => {
    try {
      const response = await getUnsplashImage(query);
      const firstImage = response.data.results[0];
      if (firstImage) {
        setImageUrl(firstImage.urls.regular);
      }
    } catch (err) {
      console.error('Unsplash error:', err);
    }
  };

  return (
    <div>
      <img src={imageUrl} alt="location" className='h-[340px] w-full object-cover rounded' />

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              📆 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              💸 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              No. of Travelers: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button><FaShare /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
