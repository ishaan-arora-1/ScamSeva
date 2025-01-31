import React from 'react'
import Image from 'next/image'

const DocumentVerification = () => {
  return (
    <div className="min-h-screen w-full bg-black dark:bg-white bg-grid-white/[0.2] dark:bg-grid-black/[0.2] relative flex items-center justify-center">
     <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <div className="min-h-screen z-20 flex flex-col">
      <header className="text-4xl font-bold text-center text-white mb-10 py-8">
        Verify Documents
      </header>
      
      {/* Top Section */}
      <div className="container mx-auto px-4 mb-8 flex justify-evenly">
        <div className="w-[400px]">
          <img src="idd.webp" alt="" />
        </div>
        
        <div className="w-full md:w-1/2 pl-4 mt-4 md:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Complete Employee ID</h2>
            <div className='h-[310px]'>An employee ID card should include essential details such as the employee's full name, photograph, job title, department, and employee ID number. It should also feature the company's logo and contact information. Security elements like a barcode, magnetic strip, or RFID chip can be added to ensure secure access to restricted areas.
         </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto px-4 flex justify-evenly mt-10">
        <div className="w-full md:w-1/2 pr-4 mt-4 md:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Employee Domain-Specific Email:</h2>
            <div>
            An employee domain-specific email should have a professional format, typically using the company's domain name (e.g., name@company.com). It ensures secure communication, aligning with the company’s branding. Key details should include clear identification of the employee's role, department, and work-related responsibilities, ensuring clarity and security in internal and external communications.
            </div>
          </div>
        </div>
        
        <div className="w-[400px]">
          <img src="email-domain1.jpeg" alt="" />
        </div>
      </div>
    </div>
    </div>

  )
}

export default DocumentVerification