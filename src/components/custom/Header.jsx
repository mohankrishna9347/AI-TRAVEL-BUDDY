import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'sonner';
import axios from 'axios';


function Header() {
    const [openDialog, setOpenDialog] = useState(false);
  const user  = JSON.parse(localStorage.getItem('user'));
  

  useEffect(() => { 
    console.log(user);
  }, []);

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
      window.location.reload();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast("Login failed. Please try again.");
    }
  };

  return (
    <div className="p-5 shadow-md flex justify-between items-center relative">
      {/* Logo Styling */}
      <h1 className="font-bold text-3xl">AI TRAVEL BUDDY</h1>
      
      {/* Button Styling */}
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
      {user ?
      <div className='flex items-center gap-3'>
        <a href='/create-trip'>
        <Button variant="outline" className="rounded-full">+ Create Trip</Button>
        </a>
        <a href='/my-trips'>
        <Button variant="outline" className="rounded-full">My Trips</Button>
        </a>
        <Popover>
        <PopoverTrigger>
        <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
        </PopoverTrigger>
        <PopoverContent>
          <h2 className='cursor-pointer' onClick={()=>{
            googleLogout();
            localStorage.clear();
            window.location.reload();
          }}>Logout</h2></PopoverContent>
      </Popover>

        </div>
        :
        <Button onClick={()=>setOpenDialog(true)} className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">
          Sign In
        </Button> 
        }
        
      </div>
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

export default Header;
