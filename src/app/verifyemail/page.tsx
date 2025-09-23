"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const verifyUserEmail = async () => {
        try {
            setLoading(true);
            console.log("Sending verification request with token:", token);
               
            const response = await axios.post('/api/users/verifyemail', {token});
            console.log("Verification response:", response.data);
            
            setVerified(true);
            setError(false);
        } catch (error: any) {
            setError(true);
            setVerified(false);
            
            console.log("Verification error:", error.response?.data);
            console.log("Error status:", error.response?.status);
            
            if (error.response?.status === 404) {
                setErrorMessage("API route not found. Please check your file structure.");
            } else {
                setErrorMessage(error.response?.data?.error || "Verification failed");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // javascript docs gave me this 
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        
        console.log("Raw URL:", window.location.href); // full url https://afn...
        console.log("Search params:", window.location.search); // it will give "?token = "
        console.log("Parsed token:", urlToken);
        
        
        const decodedToken = urlToken ? decodeURIComponent(urlToken) : "";
        console.log("Decoded token:", decodedToken);
        
        setToken(decodedToken);
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            console.log("Starting verification with token:", token);
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token ? `Token: ${token.substring(0, 20)}...` : "no token"}
            </h2>

            {loading && (
                <div className="mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-blue-600 mt-2">Verifying your email...</p>
                </div>
            )}

            {verified && (
                <div className="mt-4 text-center">
                    <h2 className="text-2xl text-green-600">✅ Email Verified Successfully!</h2>
                    <Link 
                        href="/login"
                        className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded"
                    >
                        Go to Login
                    </Link>
                </div>
            )}
            
            {error && (
                <div className="mt-4 text-center max-w-md">
                    <h2 className="text-2xl bg-red-500 text-white px-4 py-2 rounded mb-2">
                        ❌ Verification Failed
                    </h2>
                    <p className="text-red-600 mb-4">{errorMessage}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2"
                    >
                        Try Again
                    </button>
                    <Link 
                        href="/signup"
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Back to Signup
                    </Link>
                </div>
            )}
        </div>
    )
}