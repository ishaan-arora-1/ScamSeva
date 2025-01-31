export async function transferCall({
    callSid, 
    toNumber 
  }: { 
    callSid: string, 
    toNumber: string 
  }) {
    try {
      const response = await fetch('https://api.exotel.com/v1/Accounts/YOUR_ACCOUNT_SID/Calls/transfer', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from('YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN').toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          CallSid: callSid,
          To: toNumber
        })
      })
  
      if (!response.ok) {
        throw new Error('Call transfer failed')
      }
  
      return await response.json()
    } catch (error) {
      console.error('Call transfer error:', error)
      throw error
    }
  }