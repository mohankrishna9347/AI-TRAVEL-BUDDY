import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip() {
    const {tripId}=useParams();
    const [trip,setTrip] = useState([]);

    useEffect(()=>{
       tripId && GetTripData();
    },[tripId])

    /*
        USE TO GET TRIP INFORMATION FROM FIREBASE
    **/
    const GetTripData=async()=>{
        const docRef=doc(db,'AITRIPS',tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No Such Document");
            toast('No Trip Found !');
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* INFORMATION SECTION*/}
      <InfoSection trip={trip}/>

       {/* RECOMENDED HOTELS  */}
       <Hotels trip={trip}></Hotels>

        {/* DAILY PLANS */}
        <PlacesToVisit trip={trip}></PlacesToVisit>

         {/* FOOTER */}
         <Footer trip={trip}></Footer>
    </div>
  )
}

export default Viewtrip
