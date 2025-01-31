import { NextRequest, NextResponse } from 'next/server'

interface CallDetails {
  childNumber: string
  parentNumber: string
  callSid: string
  timestamp: number
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json()
    
    // Check if call is to child's temporary number
    if (isChildNumber(payload.To)) {
      // Get parent number from local storage configuration
      const parentNumber = getParentNumber(payload.To)
      
      // Store call details in local storage
      storeCallDetails({
        childNumber: payload.To,
        parentNumber,
        callSid: payload.CallSid,
        timestamp: Date.now()
      })

      // Transfer call to parent (simulated)
      await transferCallToParent(payload.CallSid, parentNumber)

      return NextResponse.json({ 
        status: 'call_transferred', 
        parentNumber 
      })
    }

    return NextResponse.json({ status: 'no_action' })
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

// Validate child's number
function isChildNumber(number: string): boolean {
  // In local storage, maintain a list of child numbers
  const childNumbers = JSON.parse(localStorage.getItem('childNumbers') || '[]')
  return childNumbers.includes(number)
}

// Retrieve parent number for a child number
function getParentNumber(childNumber: string): string {
  // Store parent-child mappings in local storage
  const parentMappings = JSON.parse(localStorage.getItem('parentMappings') || '{}')
  return parentMappings[childNumber] || ''
}

// Store call details
function storeCallDetails(details: CallDetails) {
  const calls = JSON.parse(localStorage.getItem('callDetails') || '[]')
  calls.push(details)
  localStorage.setItem('callDetails', JSON.stringify(calls))
}

// Transfer call to parent (mock implementation)
async function transferCallToParent(callSid: string, parentNumber: string) {
  // Simulated Exotel API call
  console.log(`Transferring call ${callSid} to ${parentNumber}`)
}