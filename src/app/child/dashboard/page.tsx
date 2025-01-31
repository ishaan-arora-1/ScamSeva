'use client'
import { useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

interface Document {
  id: string
  name: string
  file: string // base64 encoded file
  accessible: boolean
  viewable: boolean
}

export default function ChildDashboard() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem('userRole')

    const storedDocs = JSON.parse(localStorage.getItem('documents') || '[]')
    setDocuments(storedDocs)
  }, [])

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newDocument: Document = {
          id: Date.now().toString(),
          name: file.name,
          file: reader.result as string,
          accessible: false,
          viewable: false
        }

        const updatedDocs = [...documents, newDocument]
        setDocuments(updatedDocs)
        localStorage.setItem('documents', JSON.stringify(updatedDocs))
        localStorage.setItem('pendingRequest', JSON.stringify({ 
          docId: newDocument.id, 
          docName: newDocument.name 
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const openDocument = (doc: Document) => {
    if (doc.accessible && doc.viewable) {
      setSelectedDocument(doc)
    }
  }

  const closeDocument = () => {
    setSelectedDocument(null)
  }

  return (
    <div className="min-h-screen w-full bg-black dark:bg-white bg-grid-white/[0.2] dark:bg-grid-black/[0.2] relative flex ">
  <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <div className="container mx-auto p-4 z-20">
    <div className='flex justify-center items-center text-white text-5xl font-dmSans font-bold mt-8'>Your Documents</div>
      
      <div className="mb-16 mx-auto w-[200px] mt-6">
        <label 
          htmlFor="file-upload" 
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Upload Document
        </label>
        <input 
          id="file-upload"
          type="file" 
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>

      {documents.map(doc => (
        <div 
          key={doc.id} 
          className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
        >
          <span>{doc.name}</span>
          {!doc.accessible && (
            <span className="text-yellow-600">Waiting for parent approval</span>
          )}
          {doc.accessible && doc.viewable && (
            <button 
              onClick={() => openDocument(doc)}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Open
            </button>
          )}
          {doc.accessible && !doc.viewable && (
            <span className="text-blue-600">Awaiting view permission</span>
          )}
        </div>
      ))}

      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedDocument.name}</h2>
              <button 
                onClick={closeDocument}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Close
              </button>
            </div>
            {selectedDocument.file.startsWith('data:application/pdf') ? (
              <iframe 
                src={selectedDocument.file} 
                width="100%" 
                height="600px"
                title={selectedDocument.name}
              />
            ) : (
              <img 
                src={selectedDocument.file} 
                alt={selectedDocument.name} 
                className="max-w-full"
              />
            )}
          </div>
        </div>
        
      )}

<button 
  onClick={() => {
    localStorage.clear()
    window.location.href = '/'
  }}
  className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg hover:bg-red-600"
>
  Clear All Data
</button>
    </div>
    </div>
  )
}