'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ParentDashboard() {
  const [documents, setDocuments] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem('userRole')

    const storedDocs = JSON.parse(localStorage.getItem('documents') || '[]')
    setDocuments(storedDocs)
  }, [])

  const handleDocumentAccess = (docId: string, approve: boolean) => {
    const updatedDocs = documents.map(doc => 
      doc.id === docId 
        ? { ...doc, accessible: approve } 
        : doc
    )

    localStorage.setItem('documents', JSON.stringify(updatedDocs))
    setDocuments(updatedDocs)
  }

  const handleDocumentView = (docId: string, approve: boolean) => {
    const updatedDocs = documents.map(doc => 
      doc.id === docId 
        ? { ...doc, viewable: approve } 
        : doc
    )

    localStorage.setItem('documents', JSON.stringify(updatedDocs))
    setDocuments(updatedDocs)
  }

  const unapprovedDocs = documents.filter(doc => !doc.accessible)
  const viewRequestDocs = documents.filter(doc => doc.accessible && !doc.viewable)

  return (
    <div className="min-h-screen w-full bg-black dark:bg-white bg-grid-white/[0.2] dark:bg-grid-black/[0.2] relative flex ">
  <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <div className="container mx-auto p-4 z-20">
    <div className='flex justify-center items-center text-white text-5xl font-dmSans font-bold mt-8'>Document Approval</div>
      
      <h2 className="text-xl font-semibold mb-2">Pending Document Approvals</h2>
      {unapprovedDocs.length === 0 ? (
        <p className="text-gray-500">No pending documents</p>
      ) : (
        unapprovedDocs.map(doc => (
          <div 
            key={doc.id} 
            className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
          >
            <div>
              <span className="font-medium">{doc.name}</span>
            </div>
            <div className="space-x-2">
              <button 
                onClick={() => handleDocumentAccess(doc.id, true)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Approve
              </button>
              <button 
                onClick={() => handleDocumentAccess(doc.id, false)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Deny
              </button>
            </div>
          </div>
        ))
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">Pending View Permissions</h2>
      {viewRequestDocs.length === 0 ? (
        <p className="text-gray-500">No pending view requests</p>
      ) : (
        viewRequestDocs.map(doc => (
          <div 
            key={doc.id} 
            className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
          >
            <div>
              <span className="font-medium">{doc.name}</span>
            </div>
            <div className="space-x-2">
              <button 
                onClick={() => handleDocumentView(doc.id, true)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Allow View
              </button>
              <button 
                onClick={() => handleDocumentView(doc.id, false)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Deny View
              </button>
            </div>
          </div>
        ))
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">All Documents</h2>
      {documents.map(doc => (
        <div 
          key={doc.id} 
          className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
        >
          <span>{doc.name}</span>
          <div className="flex space-x-2">
            <span className={
              doc.accessible 
                ? "text-green-600" 
                : "text-yellow-600"
            }>
              {doc.accessible ? 'Approved' : 'Restricted'}
            </span>
            <span className={
              doc.viewable 
                ? "text-green-600" 
                : "text-yellow-600"
            }>
              {doc.viewable ? 'Viewable' : 'View Restricted'}
            </span>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}