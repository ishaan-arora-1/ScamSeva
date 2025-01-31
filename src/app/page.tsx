'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const [role, setRole] = useState<'parent' | 'child' | null>(null)
  const router = useRouter()

  return (
    <div className="min-h-screen w-full bg-black dark:bg-white bg-grid-white/[0.2] dark:bg-grid-black/[0.2] relative flex">
      <div className="z-20 absolute pointer-events-none inset-0 flex bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <div className="font-dmSans text-white font-bold text-[200px] z-40">ScamSeva</div>
        <div className="text-[30px] text-gray-400 mx-auto translate-y-[-60px]">Your one stop Scam Protection</div> 
        <div className='flex z-30 gap-12'>
            <div className="w-[300px] h-[400px] bg-[#3405a3] rounded-[15px] shadow-[1px_5px_60px_0px_#100a886b] p-4">
                <div className="w-[60%] h-[3%] bg-[#6b64f3] mx-auto rounded-b-[15px]"></div>
                <div className="w-[200px] h-[200px] bg-[#6b64f3] rounded-[15px] mx-auto mt-6"><img src="young.png" className='pt-4 px-4' alt="" /></div>
                <span className="font-bold text-white text-center block pt-2 text-[25px]">
                  Guard
                </span>
                <Link href = "/loginguard">
                <button className="px-6 py-2 block mx-auto rounded-lg border-none mt-6 bg-[#6b64f3] text-white font-semibold hover:bg-[#534bf3]">
                  Enter
                </button>
                </Link>
            </div>
            <div className="w-[300px] h-[400px] bg-[#3405a3] rounded-[15px] shadow-[1px_5px_60px_0px_#100a886b] p-4">
                <div className="w-[60%] h-[3%] bg-[#6b64f3] mx-auto rounded-b-[15px]"></div>
                <div className="w-[200px] h-[200px] bg-[#6b64f3] rounded-[15px] mx-auto mt-6"><img src="old.png" className='pt-4 px-4' alt="" /></div>
                <span className="font-bold text-white text-center block pt-2 text-[25px]">
                  Member
                </span>
                <Link href="/loginchild">
                <button className="px-6 py-2 block mx-auto rounded-lg border-none mt-6 bg-[#6b64f3] text-white font-semibold hover:bg-[#534bf3]">
                  Enter
                </button>
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
