"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import toast,{Toaster} from "react-hot-toast"

function UpdatePassword() {
  const [token, setToken] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState<boolean | null>(null) // null = not checked yet
  const [error, setError] = useState("")
  
 const router =useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlToken = params.get("token")
    const decoded = urlToken ? decodeURIComponent(urlToken) : ""
    setToken(decoded)
  }, [])


  useEffect(() => {
    if (token.length === 0) {
      setVerified(false)
      setError("Missing or invalid token.")
    } else {
      setVerified(true) 
    }
  }, [token])

  const canSubmit = useMemo(() => {
    return (
      verified === true &&
      password.length >0 &&
      password === confirm
    )
  }, [verified, password, confirm])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || loading) return
    try {
      setLoading(true)
      const res = await axios.post("/api/users/updatePassword", {
        token,
        newPassword: password,
      })
      setError("")
      
      setVerified(true)
      
      router.push("/login")
      toast.success(res.data?.message || "Password updated successfully.")
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.error || "Failed to update password."
      setError(msg)
      setVerified(false)
    } finally {
      setLoading(false)
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
    <div className="flex min-h-dvh items-center justify-center px-6 py-12 bg-slate-950">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6 text-white">
        <h1 className="text-2xl font-semibold">Set a new password</h1>
        <p className="mt-2 text-sm text-slate-300">
          Enter a strong password and confirm it to complete the reset. The token in the link will be validated on submit. 
        </p>

        {error && (
          <div className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm text-slate-200" htmlFor="password">
              New password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-white placeholder:text-slate-400 outline-none transition focus:border-indigo-500"
              placeholder="At least 8 characters"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-200" htmlFor="confirm">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-white placeholder:text-slate-400 outline-none transition focus:border-indigo-500"
              placeholder="Retype the password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update password"}
          </button>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              Back to sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default UpdatePassword
