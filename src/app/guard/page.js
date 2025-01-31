"use client"
import React from 'react'
import ButtonContainer from '@/app/components/ButtonContainer';
import Card from "@/app/components/Card";
import Card2 from "@/app/components/Card2";
import EmergencyNotification from "@/app/components/EmergencyNotification";
import Link from 'next/link';
import { useState } from 'react';

const page = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRequest = () => {
    setIsLoading(true)
    // Simulate an async operation
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }
  return (
<>
  <div className="min-h-screen w-full bg-black dark:bg-white bg-grid-white/[0.2] dark:bg-grid-black/[0.2] relative flex items-center justify-center">
  <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <EmergencyNotification />

    <div className='w-screen z-20'>
        <div className='fixed bottom-12 left-1/2 transform -translate-x-1/2'><ButtonContainer /></div>
        <div className='w-screen h-20 flex justify-between'>
            <div className='text-white text-xl font-dmSans font-bold px-6 py-6'>ScamSeva</div>
            <div className='w-28 top-5 translate-x-[-60px] mt-4'>
                <div className="relative inline-block">
                  <button className="primary-button relative z-10 text-white font-bold tracking-wide border border-[#0E1822] px-8 py-3 bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 531.28 200%27%3E%3Cdefs%3E%3Cstyle%3E .shape %7B fill: %23FF4655 %7D %3C/style%3E%3C/defs%3E%3Cg id=%27Layer_2%27 data-name=%27Layer 2%27%3E%3Cg id=%27Layer_1-2%27 data-name=%27Layer 1%27%3E%3Cpolygon class=%27shape%27 points=%27415.81 200 0 200 115.47 0 531.28 0 415.81 200%27 /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-[#0E1822] bg-[200%] bg-no-repeat bg-left transition-all duration-300 ease-in-out hover:bg-[#FF4655] hover:border-[#FF4655]">
                    Emergency
                  </button>
                  <div className="absolute inset-0 border-t border-l border-[#0E1822] h-1/2 -top-1.5 -left-1.5"></div>
                  <div className="absolute inset-0 border-b border-r border-[#0E1822] h-1/2 -bottom-1.5 -right-1.5"></div>
                </div>
              </div>    
        </div>
        <div className='flex justify-center items-center text-white text-5xl font-dmSans font-bold mt-8'>You're Family is Safe With ScamSeva</div>
        <div className='flex justify-center items-center text-gray-300 text-lg font-dmSans mt-3'>You are watching over them</div>


        <div className='flex justify-center items-center text-gray-300 text-5xl font-dmSans mt-24'>Family Members</div>
        <div className="flex flex-col gap-4 items-center justify-center mt-10">
            {/* Red Card */}
            <div className="bg-red-500 flex flex-col items-center justify-center text-center h-32 w-[380px] rounded-lg text-white cursor-pointer transform transition-transform duration-300 hover:scale-110">
                <p className="font-bold text-lg">Ishaan Arora</p>
                <p className="text-sm"></p>
            </div>

            {/* Blue Card */}
            <div className="bg-blue-500 flex flex-col items-center justify-center text-center h-32 w-[380px] rounded-lg text-white cursor-pointer transform transition-transform duration-300 hover:scale-110">
                <p className="font-bold text-lg">Punya Arora</p>
                <p className="text-sm"></p>
            </div>

            {/* Green Card */}
            <div className="bg-green-500 flex flex-col items-center justify-center text-center h-32 w-[380px] rounded-lg text-white cursor-pointer transform transition-transform duration-300 hover:scale-110">
                <p className="font-bold text-lg">Jyoti Arora</p>
                <p className="text-sm"></p>
            </div>
            <div className="bg-yellow-500 flex flex-col items-center justify-center text-center h-32 w-[380px] rounded-lg text-white cursor-pointer transform transition-transform duration-300 hover:scale-110">
                <p className="font-bold text-lg">Pankaj Arora</p>
                <p className="text-sm"></p>
            </div>
        </div>

        <div
      className="flex justify-between font-dmSans border-2 h-[115px] mt-20 w-[1000px] mx-auto border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] backdrop-blur-[12px]"
    >
      <div>
        <h1 className="text-[2em] font-bold">Provide Access To Docs</h1>
        <p className="text-[0.85em]">
          You control which docs are shared
        </p>
      </div>
      <Link href="/parent/dashboard">
      <button
        onClick={handleRequest}
        disabled={isLoading}
        className="h-fit w-fi my-auto px-[1em] py-[0.25em] border-[1px] rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-200 backdrop-blur-[12px]"
      >
        {isLoading ? (
          <div className="animate-spin">
            <svg 
              className="w-6 h-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <>
            <p>Provide</p>
            <svg
              className="w-6 h-6 group-hover:translate-x-[10%] duration-300"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </>
        )}
      </button>
      </Link>
    </div>

        <div></div>

        <div className='mt-20 w-[1000px] mx-auto flex'>
            <div className="w-[400px] h-[220px] rounded-3xl border-black border">
              <img src="police2.png" alt="" className='w-72'/>
            </div>
            <div className='w-[600px]'>
              <div className="text-3xl font-bold text-white p-12">Stay Calm, it's Nothing.</div>
              <div className="text-xl px-12 text-gray-300">Don't worry, the police do not conduct arrests or issue warrants over video calls. Any legal actions, like arrests or warrants, require physical presence and proper procedures. Video calls are only used for things like court hearings or interviews, but rest assured, they cannot make arrests or enforce legal actions this way.</div>
            </div>
        </div>
        <Link href = "/warrant">
        <div className="mx-auto w-[1000px] mt-20">
          <Card />
        </div>
        </Link>

        <div className='mt-14 w-[1000px] mx-auto flex'>
            <div className='w-[600px]'>
              <div className="text-3xl font-bold text-white p-12">Verification is Easy.</div>
              <div className="text-xl px-12 text-gray-300">Don't worry, the police do not conduct arrests or issue warrants over video calls. Any legal actions, like arrests or warrants, require physical presence and proper procedures. Video calls are only used for things like court hearings or interviews, but rest assured, they cannot make arrests or enforce legal actions this way.</div>
            </div>
            <div className="w-[400px] h-[220px] rounded-3xl border-black border">
              <img src="tech.png" alt="" className='w-72 ml-auto'/>
            </div>
        </div>

        <Link href = "/docs">
        <div className="mx-auto w-[1000px] mt-20">
          <Card2 />
        </div>
        </Link>


        <div className='flex justify-center items-center text-white text-5xl font-dmSans font-bold mt-56'>Freeze Your Bank Transfers</div>
        <div className='flex justify-center items-center text-gray-300 text-lg font-dmSans mt-3'>All They Want is Money</div>

        <Link href = "/bank">
        <div className="mt-16 justify-evenly box-border mx-auto w-[1000px] h-[300px] bg-[rgba(217,217,217,0.58)] border border-white shadow-[12px_17px_51px_rgba(0,0,0,0.22)] backdrop-blur-[6px] rounded-[17px] text-center cursor-pointer transition-all duration-500 flex items-center select-none font-bold text-white hover:border-black hover:scale-105 active:scale-95 active:rotate-[1.7deg]">
            <div className='w-[600px] text-2xl text-white'>
              Freezing bank transfers prevents unauthorized or suspicious transactions, protecting account holders and ensuring financial security during reviews.
            </div>
            <div className='w-[230px]'>
              <img src="card.png" alt="" />
            </div>

        </div>
            </Link>

        <div className='flex justify-center items-center text-white text-5xl font-dmSans font-bold mt-56'>Receive Location</div>
        <div className='flex justify-center items-center text-gray-300 text-lg font-dmSans mt-3'>We Are With You</div>

            <Link href = "location">
        <div className="mt-16 justify-evenly box-border mx-auto w-[1000px] h-[300px] bg-[rgba(217,217,217,0.58)] border border-white shadow-[12px_17px_51px_rgba(0,0,0,0.22)] backdrop-blur-[6px] rounded-[17px] text-center cursor-pointer transition-all duration-500 flex items-center select-none font-bold text-white hover:border-black hover:scale-105 active:scale-95 active:rotate-[1.7deg]">
            <div className='w-[600px] text-2xl text-white'>
            Sharing your location enhances safety by allowing trusted contacts to know your whereabouts in real-time.
            </div>
            <div className='w-[230px]'>
              <img src="location.png" alt="" />
            </div>

        </div>
            </Link>

        <div className='flex justify-center items-center text-white text-5xl font-dmSans font-bold mt-56'>We Helped You, You Help Others</div>
        <div class="bg-white w-[1000px] h-64 mx-auto my-16 rounded-lg">
            <div class="flex p-2 gap-1">
              <div class="">
                <span class="bg-blue-500 inline-block center w-3 h-3 rounded-full"></span>
              </div>
              <div class="circle">
                <span class="bg-purple-500 inline-block center w-3 h-3 rounded-full"></span>
              </div>
              <div class="circle">
                <span class="bg-pink-500 box inline-block center w-3 h-3 rounded-full"></span>
              </div>
            </div>
            <div class="card__content">
              <div className='w-[800px] mx-auto my-4 text-2xl text-black font-dmSans font-bold'>
                Report This Number to be Identified as Spam by the Government.
              </div>
              <div className='w-28 mx-auto mt-10'>
                <div className="relative inline-block">
                  <button className="primary-button relative z-10 text-white font-bold tracking-wide border border-[#0E1822] px-8 py-3 bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 531.28 200%27%3E%3Cdefs%3E%3Cstyle%3E .shape %7B fill: %23FF4655 %7D %3C/style%3E%3C/defs%3E%3Cg id=%27Layer_2%27 data-name=%27Layer 2%27%3E%3Cg id=%27Layer_1-2%27 data-name=%27Layer 1%27%3E%3Cpolygon class=%27shape%27 points=%27415.81 200 0 200 115.47 0 531.28 0 415.81 200%27 /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-[#0E1822] bg-[200%] bg-no-repeat bg-left transition-all duration-300 ease-in-out hover:bg-[#FF4655] hover:border-[#FF4655]">
                    Report
                  </button>
                  <div className="absolute inset-0 border-t border-l border-[#0E1822] h-1/2 -top-1.5 -left-1.5"></div>
                  <div className="absolute inset-0 border-b border-r border-[#0E1822] h-1/2 -bottom-1.5 -right-1.5"></div>
                </div>
              </div>
            </div>
          </div>

    </div>
  
      
    </div>

    </>
  )
}

export default page
