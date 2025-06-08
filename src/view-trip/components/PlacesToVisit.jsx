import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

      <div>
        {trip?.tripData?.dailyPlan?.map((item, index) => (
            <div>
            <h2 className="font-medium text-lg">Day {item.day}</h2>
            <div className='grid md:grid-cols-2 gap-5'>
            {item.activities?.map((activity, idx) => (
              <div key={idx} className="">
                {/* <h3 className="text-gray-700 font-semibold"></h3> */}
                <p className="text-sm text-orange-500">⏰ Best Time: {activity.bestTimeToVisit || "Not specified"}</p>
                <PlaceCardItem activity={activity}></PlaceCardItem>
              </div>
             
            ))}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
