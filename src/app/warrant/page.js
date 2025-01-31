import React from 'react'
import Image from 'next/image'
import { div } from 'motion/react-client'


const page = () => {
  return (
    <div className="min-h-screen w-full bg-black dark:bg-white bg-grid-white/[0.2] dark:bg-grid-black/[0.2] relative flex items-center justify-center">
     <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

    <div className="min-h-screen flex flex-col z-20">
      <header className="text-4xl font-bold text-center text-white py-8">
        Official Warrant
      </header>
      
      <main className="container mx-auto px-4 flex-grow flex justify-evenly w-screen h-screen">
        <div className='w-[650px]'>

            <img src="arrestwarrant.webp" alt="" className='w-full h-full object-cover rounded-lg shadow-xl'/>
        </div>

        
        <div className="w-full md:w-1/2 pl-4 mt-4 md:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Spot Differences</h2>
            <div>
  <p>1. Official Seal & Signature:<br />
     A real arrest warrant will have an official court seal and an authentic judge's or magistrate's signature.<br />
     Fake ones often have poorly reproduced or absent seals and signatures.</p>

  <p>2. Court Information:<br />
     Verify the court's name, address, and contact details.<br />
     Real warrants will contain precise and verifiable court details; fake ones may use generic or non-existent addresses.</p>

  <p>3. Case Number & Details:<br />
     Real warrants include a unique case number and detailed information about the alleged crime.<br />
     Fake warrants might lack a case number or have vague descriptions of the charges.</p>

  <p>4. Date of Issuance:<br />
     The issuance date should be recent and properly formatted.<br />
     Fake warrants may have outdated or inconsistent dates.</p>

  <p>5. Personal Information Accuracy:<br />
     Ensure the details about the individual are accurate (name, address, etc.).<br />
     Fake warrants may have small errors in personal information.</p>

  <p>6. Language & Grammar:<br />
     Check for grammatical errors, inconsistent language, or unusual phrasing.<br />
     Real warrants are typically professionally written, while fake ones may contain mistakes.</p>

  <p>7. Authority & Law Enforcement Info:<br />
     Real warrants are issued by courts, while fake ones might be signed by unauthorized or made-up authorities.<br />
     Ensure the law enforcement agency listed is legitimate.</p>

  <p>8. Official Contact Details:<br />
     A real warrant will include clear instructions for contacting authorities.<br />
     Fake warrants may contain suspicious phone numbers or unprofessional contact methods.</p>

  <p>9. Instructions & Validity Period:<br />
     A real warrant will include clear instructions for the individual and the law enforcement agents.<br />
     Fake warrants may have vague or incomplete instructions.</p>

  <p>10. Verification:<br />
     Always verify the warrant with the court or law enforcement agency that issued it, especially if anything seems suspicious.</p>
            </div>

          </div>
        </div>
      </main>
    </div>
    </div>
  )
}

export default page
