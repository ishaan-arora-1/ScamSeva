import { Timestamp } from 'firebase/firestore'

export interface CallDetails {
  id: string
  childNumber: string
  parentNumber: string
  callSid: string
  status: 'initiated' | 'transferred' | 'completed' | 'failed'
  timestamp: Timestamp
  answered: boolean
}