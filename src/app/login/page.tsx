"use client"
import React from 'react'
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login(){
    const[user,setUser]=React.useState({
        password:"",
        email:""
    })

    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    
    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault(); 
        
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user); // passing to the backend
            console.log("Login  success", response.data);
            toast.success("Login successful successfully!");
            // const profile = await axios.post('/api/users/profile',user); // now profile as the data while user logs in 
            // console.log("Data pussed to profile",profile)
            router.push('/profile');
        } catch (error: any) {
            console.log("Login failed", error);
            
            const errorMessage = error.response?.data?.error || error.message || "Signup failed";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }
    
    React.useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <>
            <div className="flex min-h-dvh flex-col justify-center px-6 py-12 lg:px-8 bg-transparent">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
                        Login 
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onLogin} className="space-y-6">
                        
                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                autoComplete="email"
                                className="block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-400
                                         ring-1 ring-inset ring-white/10 hover:ring-white/20
                                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0
                                         sm:text-sm transition-colors"
                                disabled={loading}
                            />
                        </div>


                        
                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                                Password
                                </label>
                                <Link
                                href="/forgot-password"
                                className="text-sm font-medium text-green-400 hover:text-green-300 focus:outline-none focus:underline"
                                >
                                Forgot password?
                                </Link>
                            </div>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-400
                                        ring-1 ring-inset ring-white/10 hover:ring-white/20
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        sm:text-sm transition-colors"
                                disabled={loading}
                            />
                            </div>


                        {/* Submit */}
                        <div>
                            <button
                                type="submit"
                                disabled={buttonDisabled || loading}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-indigo-500 px-3 py-2
                                         text-sm font-semibold text-white shadow-sm hover:bg-indigo-400
                                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                                         focus-visible:ring-offset-0 active:bg-indigo-500/90 transition-colors
                                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-500"
                            >
                                {loading ? "Please wait ..." : "Login"}
                            </button>
                            <div className="mt-4 text-center">
                                <Link
                                    className="text-sm font-medium text-green-400 hover:text-green-300 focus:outline-none focus:underline"
                                    href="/signup"
                                >
                                    Create an Account?
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}