import React, { useEffect, useState } from 'react';
import { getUnsplashImage } from '@/service/GlobalApi'; // Make sure this is correct
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [imageUrl, setImageUrl] = useState('/p1.jpg'); // fallback

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const location = trip?.userSelection?.location?.label;
        if (location) {
          const response = await getUnsplashImage(location);
          const firstImage = response.data.results[0];
          if (firstImage) {
            setImageUrl(firstImage.urls.regular);
          }
        }
      } catch (err) {
        console.error('Error fetching trip image:', err);
      }
    };

    fetchImage();
  }, [trip]);

  return (
    <Link to={`/view-trip/${trip.id}`}>
    <div className='hover:scale-105 transition-all'>
      <img src={imageUrl} className='object-cover rounded-xl  h-[220px]' alt="Trip" />
      <div className='mt-2'>
        <h2 className='font-bold text-lg'>
          {trip?.userSelection?.location?.label}
        </h2>
        <h2 className='text-sm text-gray-500'>
          {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget
        </h2>
      </div>
    </div>
    </Link>
  );
}

export default UserTripCardItem;
