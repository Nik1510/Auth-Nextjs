import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'; 
import axios from 'axios';                   

export default function Home() {
  const router = useRouter();
  
  const checkUserStatus = async () => {
    try {
      await axios.get('/api/users/me');
      router.push('/profile');
    } catch (error) {
      console.error("User not authenticated:", error); 
      router.push('/login');
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);
  return <div>Loading...</div>;
}
