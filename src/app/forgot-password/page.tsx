"use client"

import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ForgotPassword() {
  const [user, setUser] = useState({ email: "" })
  const [buttonDisabled, setbuttonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post("/api/users/forgot-password", user)
      console.log("Token sent ", response.data)
      toast.success("Token sent successfully!")
    } catch (error: any) {
      console.log("Forgot password failed", error)
      const errorMessage =
        error.response?.data?.error || error.message || "Forgot password failed"
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.length > 0) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [user])

  return (
    <div className="flex min-h-dvh items-center justify-center px-6 py-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Enter the account email to receive a reset link.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <form onSubmit={onForgotPassword} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-200"
              >
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
                placeholder="name@example.com"
                className="block w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-white placeholder:text-slate-400
                           outline-none ring-0 transition
                           focus:border-indigo-500 focus:bg-white/10
                           hover:border-white/20 disabled:opacity-60"
                
              />
            </div>

            {/* Submit */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={buttonDisabled || loading}
                className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-500 px-4 py-2.5
                           text-sm font-semibold text-white shadow-lg shadow-indigo-500/20
                           transition hover:bg-indigo-400 focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-0
                           active:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending token..." : "Send reset link"}
              </button>

              <div className="text-center">
                <Link
                  className="text-sm font-medium text-emerald-400 transition hover:text-emerald-300 focus:outline-none focus:underline"
                  href="/login"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Having trouble? Contact support if the email doesn’t arrive in a few minutes.
        </p>
      </div>
    </div>
  )
}
