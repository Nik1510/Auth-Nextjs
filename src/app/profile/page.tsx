"use client"
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios' 
import { useRouter } from 'next/navigation'

function Profile() {
  const [data, setData] = useState("nothing");
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const logout = async() => {
    try {
      setIsLoading(true);
      await axios.get('api/users/logout')
      toast.success('Logout successful! Redirecting...', {
        duration: 2000,
        style: {
          background: '#10b981',
          color: '#fff',
        },
      })
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (error: any) {
      console.log("error while logout", error.message);
      toast.error(error.message || 'Logout failed', {
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      })
    } finally {
      setIsLoading(false);
    }
  }

  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      toast.loading('Fetching profile details...', { id: 'profile-fetch' });
      
      const res = await axios.get('/api/users/me')
      console.log(res.data);
      setData(res.data.data._id)
      setUser(res.data.data)
      
      toast.success('Profile details loaded successfully!', { 
        id: 'profile-fetch',
        style: {
          background: '#059669',
          color: '#fff',
        },
      });
    } catch (error: any) {
      console.log("Error fetching profile:", error);
      toast.error('Failed to fetch profile details', { 
        id: 'profile-fetch',
        style: {
          background: '#dc2626',
          color: '#fff',
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  
  const getDaysSinceCreation = (createdAt: string | undefined): number => {
    if (!createdAt) return 0;
    try {
      const createdDate = new Date(createdAt);
      if (isNaN(createdDate.getTime())) return 0;
      return Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    } catch {
      return 0;
    }
  }

  
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return '—';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '—';
      return date.toLocaleDateString();
    } catch {
      return '—';
    }
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Main Profile Card */}
          <div className="bg-white rounded-2xl shadow-2xl border border-amber-100 overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
            
            {/* Header Section */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Profile Dashboard</h1>
                    <p className="text-amber-100 mt-1">Welcome back! Manage your account settings</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Status Card */}
              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-800 font-semibold">Successfully logged in</span>
                </div>
                <p className="text-green-700 mt-2 text-sm">Your session is active and secure</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={getUserDetails}
                  disabled={isLoading}
                  className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Get Profile Information</span>
                      </>
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={logout}
                  disabled={isLoading}
                  className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </div>
                </button>
              </div>

              {/* User Details Section */}
              {user && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Profile Details
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Info Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                      <h4 className="font-semibold text-lg text-blue-900 mb-4 flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        Basic Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-blue-700 font-medium">Username:</span>
                          <span className="text-blue-900">{user.username || '—'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700 font-medium">Email:</span>
                          <span className="text-blue-900 break-all">{user.email || '—'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-700 font-medium">Status:</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.isVerified 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          }`}>
                            {user.isVerified ? '✓ Verified' : ' Not Verified'}
                          </span>
                        </div>
                      </div>
                    </div>

                    
                  
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-8 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-4">Quick Stats</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                        <div className="text-2xl font-bold text-amber-600">1</div>
                        <div className="text-xs text-gray-500">Active Session</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                        <div className="text-2xl font-bold text-green-600">
                          {user.isVerified ? '✓' : '⏳'}
                        </div>
                        <div className="text-xs text-gray-500">Verification</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                        <div className="text-2xl font-bold text-blue-600">
                          {getDaysSinceCreation(user.createdAt)}
                        </div>
                        <div className="text-xs text-gray-500">Days Member</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                        <div className="text-2xl font-bold text-purple-600">🔒</div>
                        <div className="text-xs text-gray-500">Secure</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Display */}
              {data !== "nothing" && (
                <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-2">Current User ID</h4>
                  <code className="block p-3 bg-emerald-100 rounded-lg text-emerald-800 font-mono text-sm break-all">
                    {data}
                  </code>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </>
  );
}

export default Profile