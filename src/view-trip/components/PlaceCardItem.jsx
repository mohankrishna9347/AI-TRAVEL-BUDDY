import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';

function PlaceCardItem({ activity }) {
  const [placeImage, setPlaceImage] = useState('/p1.jpg'); // fallback image

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: activity.activityName + ' tourist place',
            per_page: 1,
            orientation: 'landscape',
          },
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
          },
        });

        const photoUrl = res.data.results[0]?.urls?.regular;
        if (photoUrl) {
          setPlaceImage(photoUrl);
        }
      } catch (error) {
        console.error('Error fetching Unsplash image:', error);
        // Keeps fallback image
      }
    };

    if (activity?.activityName) {
      fetchImage();
    }
  }, [activity?.activityName]);

  return (
    <Link 
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.activityName)}`} 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <div className='border p-3 mt-2 rounded-xl flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={placeImage} className='w-[130px] h-[130px] rounded-xl object-cover' alt={activity.activityName} />
        <div> 
          <h2 className='font-bold text-lg'>{activity.activityName}</h2>
          <p className="text-sm text-gray-600">{activity.description}</p>
          <p className="text-sm text-gray-500">🚗 Travel Time: {activity.timeTravelFromHotel || "Varies"}</p>
          <Button><FaMapLocationDot /></Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
