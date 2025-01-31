import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
    try {
      const { documentId, childNumber } = await req.json()
  
      // Verify recent call transfer
      const callTransferVerified = verifyRecentCallTransfer(childNumber)
      
      if (callTransferVerified) {
        // Store document request in local storage
        const documentRequest = createDocumentRequest(documentId, childNumber)
  
        return NextResponse.json({ 
          status: 'pending_parent_approval', 
          documentRequest 
        })
      }
  
      return NextResponse.json({ 
        status: 'approval_failed', 
        message: 'Unable to verify call transfer' 
      }, { status: 400 })
    } catch (error) {
      return NextResponse.json({ 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 500 })
    }
  }
  
  // Verify recent call transfer
  function verifyRecentCallTransfer(childNumber: string): boolean {
    const calls = JSON.parse(localStorage.getItem('callDetails') || '[]')
    
    // Check for a call transfer in the last 5 minutes
    const recentCalls = calls.filter((call: CallDetails) => 
      call.childNumber === childNumber && 
      (Date.now() - call.timestamp) < 5 * 60 * 1000
    )
  
    return recentCalls.length > 0
  }
  
  // Create document request
  function createDocumentRequest(documentId: string, childNumber: string) {
    const request = {
      id: `DR-${Date.now()}`,
      documentId,
      childNumber,
      status: 'pending_parent_approval',
      timestamp: Date.now()
    }
  
    const requests = JSON.parse(localStorage.getItem('documentRequests') || '[]')
    requests.push(request)
    localStorage.setItem('documentRequests', JSON.stringify(requests))
  
    return request
  }
  
  // Utility function to set up initial configurations
  export function setupLocalStorage() {
    // Example: Set up child numbers
    localStorage.setItem('childNumbers', JSON.stringify([
      '+91CHILD_NUMBER1',
      '+91CHILD_NUMBER2'
    ]))
  
    // Example: Set up parent-child mappings
    localStorage.setItem('parentMappings', JSON.stringify({
      '+91CHILD_NUMBER1': '+91PARENT_NUMBER1',
      '+91CHILD_NUMBER2': '+91PARENT_NUMBER2'
    }))
  }