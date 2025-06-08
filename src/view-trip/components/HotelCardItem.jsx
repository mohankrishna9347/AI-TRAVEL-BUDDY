import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HotelCardItem({ hotel }) {
  const [hotelImage, setHotelImage] = useState('/p1.jpg'); // fallback

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query: hotel.hotelName + ' hotel',
              per_page: 1,
              orientation: 'landscape',
            },
            headers: {
              Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
            },
          }
        );

        const photoUrl = res.data.results[0]?.urls?.regular;
        if (photoUrl) setHotelImage(photoUrl);
      } catch (error) {
        console.error('Unsplash fetch error:', error);
        // Keep fallback image
      }
    };

    fetchImage();
  }, [hotel.hotelName]);

  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotel.hotelAddress)}
      target="_blank"
      className='hover:scale-105 transition-all cursor-pointer'
    >
      <div className='border p-4 rounded-lg shadow-lg'>
        <img 
          src={hotelImage}
          alt="Hotel"
          className="rounded-lg w-full h-40 object-cover"
        />
        <div className='my-2'>
          <h2 className='font-medium text-lg'>{hotel.hotelName}</h2>
          <p className="text-sm text-gray-600">{hotel.hotelAddress}</p>
          <p className="text-sm font-semibold text-blue-600">{hotel.price || "Price not available"}</p>
          <p className="text-sm text-yellow-500">⭐ {hotel.rating || "No rating available"}</p>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
