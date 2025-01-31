'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Link from "next/link";

const page = () => {
  const [role, setRole] = useState<'parent' | 'child' | null>(null)
  const router = useRouter()

  const selectRole = (selectedRole: 'parent' | 'child') => {
    localStorage.setItem('userRole', selectedRole)
    setRole(selectedRole)
    router.push(`/${selectedRole}/dashboard`)
  }

  return (
    <div className="min-h-screen w-full bg-black dark:bg-white bg-grid-white/[0.2] dark:bg-grid-black/[0.2] relative flex items-center justify-center">
     <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <div className="max-w-xs  bg-[#f1f7fe] overflow-hidden rounded-xl text-[#010101] mx-auto z-20">
      <form className="relative flex flex-col p-8 gap-4 text-center">
        <span className="font-bold text-xl">Sign up</span>
        <span className="text-sm text-[#666]">Create a free account with your email.</span>
        <div className="overflow-hidden rounded-md bg-white mt-4 mb-2 w-full">
          <input
            type="text"
            className="bg-none border-0 outline-0 h-10 w-full border-b border-[#eee] text-sm p-2"
            placeholder="Full Name"
          />
          <input
            type="email"
            className="bg-none border-0 outline-0 h-10 w-full border-b border-[#eee] text-sm p-2"
            placeholder="Email"
          />
          <input
            type="password"
            className="bg-none border-0 outline-0 h-10 w-full border-b border-[#eee] text-sm p-2"
            placeholder="Password"
          />
          <div 
            className=" text-black bg-none border-0 outline-0 h-10 w-full border-b border-[#eee] text-sm p-2"
          >Your code - c1D8uiFe
        </div>
        </div>
        <Link href="/guard" className="px-4 py-2 text-white rounded">
        <button onClick={() => selectRole('parent')} className="bg-[#0066ff] text-white rounded-full py-2 px-4 text-lg font-semibold hover:bg-[#005ce6] transition-all duration-300">
          Sign up
        </button>
        </Link>

      </form>
      <div className="p-4 text-sm bg-[#e0ecfb] shadow-md">
        <p>
          Have an account?{' '}
          <a href="#" className="font-bold text-[#0066ff] hover:text-[#005ce6] transition-all duration-300">
            Log in
          </a>
        </p>
      </div>
    </div>
    </div>
  )
}

export default page
