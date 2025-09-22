"use client"
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios' 
import { useRouter } from 'next/navigation'

interface UserData {
  _id: string;
  username: string;
  email: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  verifyToken?: string;
  verifyTokenExpiry?: string;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: string;
}

export default function UserProfile({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout successful')
      router.push('/login')
    } catch (error: any) {
      console.log("Error while logout", error.message);
      toast.error(error.message)
    }
  }

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/users/me')
      console.log(res.data);
      
      // Check if the current user's ID matches the requested ID
      if (res.data.data._id === params.id) {
        setUser(res.data.data);
        setError(null);
        toast.success('Profile data refreshed');
      } else {
        setError('Unauthorized: You can only view your own profile');
        setUser(null);
      }
    } catch (error: any) {
      console.log("Error fetching user details", error.message);
      setError('Failed to load profile data');
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-red-200 overflow-hidden">
          <div className="p-6 text-center">
            <div className="h-14 w-14 rounded-full bg-red-200 flex items-center justify-center text-red-600 font-bold mx-auto mb-4">
              ⚠
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
            <p className="text-red-700 mb-4">{error}</p>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/profile')}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Back to Profile
              </button>
              <button
                onClick={getUserDetails}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">No user data found</p>
          <button
            onClick={() => router.push('/profile')}
            className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
          <h1 className="text-2xl font-semibold text-amber-900">User Profile</h1>
          <p className="mt-1 text-gray-700">
            Profile page
            <span className="inline-block ml-2 px-2 py-0.5 rounded bg-orange-500 text-black text-sm align-middle">
              {params.id}
            </span>
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Top identity row */}
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-amber-200 flex items-center justify-center text-amber-900 font-bold">
              {(user?.username?.[0] ?? '?').toUpperCase()}
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">{user?.username ?? '—'}</div>
              <div className="text-sm text-gray-600">{user?.email ?? '—'}</div>
            </div>
          </div>

          {/* Key details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-100 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-500">Status</div>
              <div className="mt-1 text-sm">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    user?.isVerified
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {user?.isVerified ? 'Verified' : 'Not verified'}
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-500">User ID</div>
              <div className="mt-1 text-sm text-gray-900 break-all">{user?._id ?? '—'}</div>
            </div>

            <div className="rounded-lg border border-gray-100 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-500">Created</div>
              <div className="mt-1 text-sm text-gray-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleString() : '—'}
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-500">Updated</div>
              <div className="mt-1 text-sm text-gray-900">
                {user?.updatedAt ? new Date(user.updatedAt).toLocaleString() : '—'}
              </div>
            </div>
          </div>

          {/* Token section */}
          <div className="rounded-lg border border-gray-100">
            <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 text-sm font-medium text-gray-700">
              Security & tokens
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500">Verify token</div>
                <div className="mt-1 text-sm text-gray-900 break-all">
                  {user?.verifyToken ?? '—'}
                </div>
                <div className="text-xs text-gray-500">
                  Expiry: {user?.verifyTokenExpiry ? new Date(user.verifyTokenExpiry).toLocaleString() : '—'}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500">Forgot password token</div>
                <div className="mt-1 text-sm text-gray-900 break-all">
                  {user?.forgotPasswordToken ?? '—'}
                </div>
                <div className="text-xs text-gray-500">
                  Expiry: {user?.forgotPasswordTokenExpiry ? new Date(user.forgotPasswordTokenExpiry).toLocaleString() : '—'}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={getUserDetails}
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-amber-600 text-white px-4 py-2.5 font-medium hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh details'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/profile')}
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-4 py-2.5 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
            >
              Back to Profile
            </button>
            <button
              type="button"
              onClick={logout}
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-gray-900 text-white px-4 py-2.5 font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}