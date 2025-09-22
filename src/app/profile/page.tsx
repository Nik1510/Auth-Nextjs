"use client"
import React, { useState } from 'react'

import toast from 'react-hot-toast'
import axios from 'axios' 
import { useRouter } from 'next/navigation'

function Profile() {
  const [data,setData] = useState("");
  const router = useRouter();

  const logout = async()=>{
    try {
      await axios.get('api/users/logout')
      toast.success('Logout succsseful')
      router.push('/login')
    } catch (error:any) {
      console.log("error while logout",error.message);
      toast.error(error.message)
    }
  }
   const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg bg-white transform transition duration-300 hover:scale-105 border border-amber-100">
      <div className="px-6 py-5">
        <h2 className="font-bold text-2xl mb-1 text-amber-900">Profile</h2>
        <p className="text-gray-700 text-base">You are successfully logged in.</p>
      </div>

      <div className="px-6 py-3">
        <button
          type="button"
          onClick={getUserDetails}
          className="w-full mb-3 inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
        >
          Get all profile information
        </button>

        <button
          type="button"
          onClick={logout}
          className="w-full inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
);

}

export default Profile