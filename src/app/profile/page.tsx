"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios' 
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

function Profile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
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
      setUser(res.data.data);
      toast.success('Profile data loaded successfully');
    } catch (error: any) {
      console.log("Error fetching user details", error.message);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
          <h1 className="text-2xl font-semibold text-amber-900">User Profile</h1>
          <p className="mt-1 text-gray-700">
            {user ? 'Welcome back! Here\'s your profile information.' : 'Click "Get Profile Information" to load your data.'}
            {user && (
              <span className="inline-block ml-2 px-2 py-0.5 rounded bg-orange-500 text-black text-sm align-middle">
                ID: {user._id.slice(-8)}...
              </span>
            )}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {user ? (
            <>
              {/* Top identity row */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-amber-200 flex items-center justify-center text-amber-900 font-bold">
                  {(user?.username?.[0] ?? '?').toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="text-lg font-semibold text-gray-900">{user?.username ?? '—'}</div>
                  <div className="text-sm text-gray-600">{user?.email ?? '—'}</div>
                </div>
                <Link 
                  href={`/profile/${user._id}`}
                  className="text-sm bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1 rounded-lg transition-colors"
                >
                  View Details →
                </Link>
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
            </>
          ) : (
            /* Placeholder when no user data is loaded */
            <div className="text-center py-12">
              <div className="h-20 w-20 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-2xl font-bold mx-auto mb-6">
                👤
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome to Your Profile</h3>
              <p className="text-gray-500 mb-1">You are successfully logged in!</p>
              <p className="text-sm text-gray-400">Click the button below to load your profile information.</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={getUserDetails}
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-amber-600 text-white px-4 py-2.5 font-medium hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Loading...
                </>
              ) : user ? (
                'Refresh Profile'
              ) : (
                'Get Profile Information'
              )}
            </button>
            <button
              type="button"
              onClick={logout}
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-gray-900 text-white px-4 py-2.5 font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Additional quick actions when user data is loaded */}
          {user && (
            <div className="border-t pt-4 mt-6">
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/profile/${user._id}`}
                  className="inline-flex items-center text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                >
                  📄 Detailed View
                </Link>
                <button className="inline-flex items-center text-sm bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-lg transition-colors">
                  ✏️ Edit Profile
                </button>
                <button className="inline-flex items-center text-sm bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg transition-colors">
                  🔒 Security Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile