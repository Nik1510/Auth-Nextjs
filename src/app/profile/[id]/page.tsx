export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>UserProfile</h1>
            console.log({params});
            <hr />
            <p className="text-4xl">Profile page 
            <span className=" p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
            </p>

            </div>
    )
}

// Example React component for a profile page
// Assumes params.id is available and user data is fetched into `user`

// return (
//   <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
//     <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//       <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
//         <h1 className="text-2xl font-semibold text-amber-900">User Profile</h1>
//         <p className="mt-1 text-gray-700">
//           Profile page
//           <span className="inline-block ml-2 px-2 py-0.5 rounded bg-orange-500 text-black text-sm align-middle">
//             {params.id}
//           </span>
//         </p>
//       </div>

//       <div className="p-6 space-y-6">
//         {/* Top identity row */}
//         <div className="flex items-center gap-4">
//           <div className="h-14 w-14 rounded-full bg-amber-200 flex items-center justify-center text-amber-900 font-bold">
//             {(user?.username?.[0] ?? '?').toUpperCase()}
//           </div>
//           <div>
//             <div className="text-lg font-semibold text-gray-900">{user?.username ?? '—'}</div>
//             <div className="text-sm text-gray-600">{user?.email ?? '—'}</div>
//           </div>
//         </div>

//         {/* Key details grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="rounded-lg border border-gray-100 p-4">
//             <div className="text-xs uppercase tracking-wide text-gray-500">Status</div>
//             <div className="mt-1 text-sm">
//               <span
//                 className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
//                   user?.isVerified
//                     ? 'bg-green-100 text-green-700'
//                     : 'bg-yellow-100 text-yellow-800'
//                 }`}
//               >
//                 {user?.isVerified ? 'Verified' : 'Not verified'}
//               </span>
//             </div>
//           </div>

//           <div className="rounded-lg border border-gray-100 p-4">
//             <div className="text-xs uppercase tracking-wide text-gray-500">User ID</div>
//             <div className="mt-1 text-sm text-gray-900 break-all">{user?._id ?? '—'}</div>
//           </div>

//           <div className="rounded-lg border border-gray-100 p-4">
//             <div className="text-xs uppercase tracking-wide text-gray-500">Created</div>
//             <div className="mt-1 text-sm text-gray-900">
//               {user?.createdAt ? new Date(user.createdAt).toLocaleString() : '—'}
//             </div>
//           </div>

//           <div className="rounded-lg border border-gray-100 p-4">
//             <div className="text-xs uppercase tracking-wide text-gray-500">Updated</div>
//             <div className="mt-1 text-sm text-gray-900">
//               {user?.updatedAt ? new Date(user.updatedAt).toLocaleString() : '—'}
//             </div>
//           </div>
//         </div>

//         {/* Token section */}
//         <div className="rounded-lg border border-gray-100">
//           <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 text-sm font-medium text-gray-700">
//             Security & tokens
//           </div>
//           <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <div className="text-xs uppercase tracking-wide text-gray-500">Verify token</div>
//               <div className="mt-1 text-sm text-gray-900 break-all">
//                 {user?.verifyToken ?? '—'}
//               </div>
//               <div className="text-xs text-gray-500">
//                 Expiry: {user?.verifyTokenExpiry ? new Date(user.verifyTokenExpiry).toLocaleString() : '—'}
//               </div>
//             </div>
//             <div>
//               <div className="text-xs uppercase tracking-wide text-gray-500">Forgot password token</div>
//               <div className="mt-1 text-sm text-gray-900 break-all">
//                 {user?.forgotPasswordToken ?? '—'}
//               </div>
//               <div className="text-xs text-gray-500">
//                 Expiry: {user?.forgotPasswordTokenExpiry ? new Date(user.forgotPasswordTokenExpiry).toLocaleString() : '—'}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex flex-col sm:flex-row gap-3">
//           <button
//             type="button"
//             onClick={getUserDetails}
//             className="flex-1 inline-flex items-center justify-center rounded-lg bg-amber-600 text-white px-4 py-2.5 font-medium hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors"
//           >
//             Refresh details
//           </button>
//           <button
//             type="button"
//             onClick={logout}
//             className="flex-1 inline-flex items-center justify-center rounded-lg bg-gray-900 text-white px-4 py-2.5 font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );
