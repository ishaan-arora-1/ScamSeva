"use client"

import React, { useState } from 'react'

const bankEmails = {
  'Chase Bank': 'support@chase.com',
  'Bank of America': 'customerservice@bofa.com',
  'Wells Fargo': 'support@wellsfargo.com',
  'Citibank': 'customer.service@citi.com',
  'Capital One': 'support@capitalone.com',
  'US Bank': 'customer.service@usbank.com',
  'PNC Bank': 'customer.service@pnc.com',
  'TD Bank': 'customer.service@td.com'
}

const banks = Object.keys(bankEmails)

export default function BankSelectionPage() {
  const [selectedBank, setSelectedBank] = useState(null)

  const handleSendEmail = () => {
    if (selectedBank) {
      const email = bankEmails[selectedBank]
      const subject = encodeURIComponent(`Inquiry regarding ${selectedBank} services`)
      const body = encodeURIComponent(`Dear ${selectedBank} team,\n\nI would like to inquire about...`)
      
      // Open default mail client with pre-filled details
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    } else {
      alert('Please select a bank first')
    }
  }

  return (
    <div className="min-h-screen w-full bg-black dark:bg-white bg-grid-white/[0.2] dark:bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="min-h-screen flex w-[400px] items-center justify-center p-6 z-20">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-6">Select Your Bank</h1>
          
          <div className="space-y-4 mb-6">
            {banks.map((bank) => (
              <div 
                key={bank}
                onClick={() => setSelectedBank(bank)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedBank === bank 
                    ? 'bg-blue-100 border-blue-500' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {bank}
              </div>
            ))}
          </div>

          <button 
            onClick={handleSendEmail}
            disabled={!selectedBank}
            className={`w-full py-3 rounded-lg text-white font-bold ${
              selectedBank
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Send Email
          </button>

          {selectedBank && (
            <p className="mt-4 text-sm text-gray-600">
              Selected Bank: {selectedBank}<br />
              Email: {bankEmails[selectedBank]}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}