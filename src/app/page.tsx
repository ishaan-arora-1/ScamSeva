'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [role, setRole] = useState<'parent' | 'child' | null>(null)
  const router = useRouter()

  const selectRole = (selectedRole: 'parent' | 'child') => {
    localStorage.setItem('userRole', selectedRole)
    setRole(selectedRole)
    router.push(`/${selectedRole}/dashboard`)
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Select User Role</h1>
      <div className="space-x-4">
        <button 
          onClick={() => selectRole('parent')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Parent
        </button>
        <button 
          onClick={() => selectRole('child')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Child
        </button>
      </div>
    </div>
  )
}
