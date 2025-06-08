import { Button } from "@/components/ui/button";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


function Index() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();

  // Handle form input changes
  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Updated Form Data:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Google Login Success:", codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      toast("Google login failed. Please try again.");
    },
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.noOfDays || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill in all the details.");
      return;
    }
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location?.label)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    console.log("Final AI Prompt:", FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripResponse = await result.response.text();
      
      console.log("AI Trip Response:", tripResponse);
      setLoading(false);
      SaveAiTrip(tripResponse);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Failed to generate trip. Please try again.");
    }
  };

  const SaveAiTrip = async (TripData) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("User not logged in");

      const docId = Date.now().toString();
      await setDoc(doc(db, "AITRIPS", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId,
      });
      setLoading(false);

      toast("Trip saved successfully!");
      navigate('/view-trip/'+docId)
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("Failed to save trip.");
    }
  };

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("User Profile:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast("Login failed. Please try again.");
    }
  };

  // Fetch OpenStreetMap (Nominatim) places
  const loadOptions = async (inputValue) => {
    if (!inputValue) return { options: [] };

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`
      );

      return {
        options: response.data.map((place) => ({
          value: place.place_id,
          label: place.display_name,
          lat: place.lat,
          lon: place.lon,
        })),
      };
    } catch (error) {
      console.error("Error fetching locations:", error);
      return { options: [] };
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h1 className="font-bold text-3xl">Tell us your travel preferences</h1>
      <p className="mt-3 text-gray-500 text-xl">
        Provide some basic information, and our AI will generate a customized itinerary.
      </p>

      <div className="mt-20">
        {/* Destination Input (Using OpenStreetMap Autocomplete) */}
        <div>
          <h2 className="text-xl my-3 font-medium">Your Destination</h2>
          <AsyncPaginate
            value={place}
            loadOptions={loadOptions}
            onChange={(selectedOption) => {
              setPlace(selectedOption);
              handleInputChange("location", selectedOption);
            }}
            placeholder="Search for a location"
          />
        </div>

        {/* Number of Days Input */}
        <div className="mt-20 flex flex-col gap-7">
          <h2 className="text-xl my-3 font-medium">Trip Duration (Days)</h2>
          <input
            type="number"
            placeholder="Enter number of days"
            className="w-full px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      {/* Budget Options */}
      <div>
        <h2 className="text-xl my-3 font-medium">Select Your Budget</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                formData.budget === item.title ? "shadow-lg border-black" : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

       {/* Traveler Info */}
       <div>
        <h2 className="text-xl my-3 font-medium">Who Are You Traveling With?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                formData.traveler === item.people ? "shadow-lg border-black" : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>


      {/* Submit Button */}
      <div className="my-10 justify-end flex">
      <Button onClick={OnGenerateTrip} disabled={loading}>
  {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
</Button>

      </div>

      {/* Google Sign In Dialog */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Secure Google Authentication</p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Index;
