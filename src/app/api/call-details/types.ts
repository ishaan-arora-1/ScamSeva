export interface CallDetails {
    id: string
    childNumber: string
    parentNumber: string
    callSid: string
    status: 'initiated' | 'transferred' | 'completed' | 'failed'
    timestamp: number
    duration?: number
  }
  
  export class CallService {
    static storeCallDetails(details: CallDetails): void {
      console.log('Call details stored:', details)
      // In a real app, replace with actual storage mechanism
    }
  
    static verifyRecentCallTransfer(childNumber: string): boolean {
      console.log(`Verifying call transfer for ${childNumber}`)
      return true
    }
  
    static getCallDetailsByChildNumber(childNumber: string): CallDetails | null {
      console.log(`Retrieving call details for ${childNumber}`)
      return null
    }
  }