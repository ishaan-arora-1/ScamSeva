'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import the component with no SSR
const WebRTCComponent = dynamic(() => Promise.resolve(function WebRTCInner() {
  const [webcamActive, setWebcamActive] = useState(false);
  const [pc, setPc] = useState(null);
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const callInputRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);

  useEffect(() => {
    const initFirebaseAndWebRTC = async () => {
      try {
        const { initializeApp } = await import('firebase/app');
        const { getFirestore } = await import('firebase/firestore');

        const firebaseConfig = {
          apiKey: "AIzaSyBznFtWcr92rQxHeRt7Ruci7jhvR9pAmHQ",
          authDomain: "devhaven-b41ac.firebaseapp.com",
          projectId: "devhaven-b41ac",
          storageBucket: "devhaven-b41ac.firebasestorage.app",
          messagingSenderId: "764792931875",
          appId: "1:764792931875:web:42253732f243eb9bead396",
          measurementId: "G-QF12PMZCP2"
        };

        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);
        setDb(firestore);

        const servers = {
          iceServers: [
            {
              urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
              ],
            },
          ],
        };

        const peerConnection = new RTCPeerConnection(servers);
        setPc(peerConnection);
        setIsInitialized(true);
      } catch (err) {
        console.error('Error initializing:', err);
        setError('Failed to initialize video call system');
      }
    };

    initFirebaseAndWebRTC();

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (pc) {
        pc.close();
      }
    };
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      localStreamRef.current = stream;
      remoteStreamRef.current = new MediaStream();

      if (pc) {
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteStreamRef.current.addTrack(track);
          });
        };
      }

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStreamRef.current;
      }

      setWebcamActive(true);
      setError(null);
    } catch (err) {
      console.error('Error accessing webcam:', err);
      setError('Failed to access webcam');
    }
  };

  const createCall = async () => {
    try {
      if (!db || !pc) {
        throw new Error('System not initialized');
      }

      const { collection, doc, setDoc, onSnapshot } = await import('firebase/firestore');

      const callDoc = doc(collection(db, "calls"));
      const offerCandidates = collection(callDoc, "offerCandidates");
      const answerCandidates = collection(callDoc, "answerCandidates");

      if (callInputRef.current) {
        callInputRef.current.value = callDoc.id;
      }

      pc.onicecandidate = async (event) => {
        if (event.candidate) {
          await setDoc(doc(offerCandidates), event.candidate.toJSON());
        }
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      await setDoc(callDoc, {
        offer: {
          sdp: offerDescription.sdp,
          type: offerDescription.type,
        }
      });

      onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });

      console.log('Call created successfully with ID:', callDoc.id);
      setError(null);
    } catch (err) {
      console.error('Error creating call:', err);
      setError(`Failed to create call: ${err.message}`);
    }
  };

  const answerCall = async () => {
    try {
      if (!db || !pc || !callInputRef.current?.value) {
        throw new Error('Please ensure webcam is started and call ID is entered');
      }

      const { collection, doc, getDoc, updateDoc, onSnapshot } = await import('firebase/firestore');

      const callId = callInputRef.current.value;
      const callDoc = doc(db, "calls", callId);
      const callData = await getDoc(callDoc);

      if (!callData.exists()) {
        throw new Error('Call not found');
      }

      const answerCandidates = collection(callDoc, "answerCandidates");
      const offerCandidates = collection(callDoc, "offerCandidates");

      pc.onicecandidate = async (event) => {
        if (event.candidate) {
          await updateDoc(doc(answerCandidates), event.candidate.toJSON());
        }
      };

      const offerDescription = callData.data().offer;
      await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      await updateDoc(callDoc, {
        answer: {
          type: answerDescription.type,
          sdp: answerDescription.sdp,
        }
      });

      onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });

      console.log('Call answered successfully');
      setError(null);
    } catch (err) {
      console.error('Error answering call:', err);
      setError(`Failed to answer call: ${err.message}`);
    }
  };

  return (
    <>
    <Link href = "/main">
    <button className='fixed top-5 right-5 p-3 rounded-lg bg-black text-white font-dmSans font-bold hover:bg-gray-700'>Home</button>
    </Link>
    <div className="flex flex-col items-center p-4">
      {error && (
        <div className="w-full max-w-md mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <h2 className="text-xl font-bold mb-4">1. Start your Webcam</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Local Stream</h3>
          <video ref={localVideoRef} autoPlay playsInline className="w-full border rounded-lg shadow-md" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">Remote Stream</h3>
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full border rounded-lg shadow-md" />
        </div>
      </div>
      <button 
        onClick={startWebcam} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400" 
        disabled={webcamActive || !isInitialized}
      >
        Start Webcam
      </button>

      <h2 className="text-xl font-bold mt-6">2. Create a New Call</h2>
      <button 
        onClick={createCall} 
        className="px-4 py-2 bg-green-600 text-white rounded-lg mt-2"
        disabled={!webcamActive}
      >
        Create Call
      </button>

      <h2 className="text-xl font-bold mt-6">3. Join a Call</h2>
      <input 
        ref={callInputRef} 
        className="border p-2 rounded-lg mt-2 w-64"
        placeholder="Enter call ID" 
      />
      <button 
        onClick={answerCall} 
        className="px-4 py-2 bg-yellow-500 text-white rounded-lg mt-2"
        disabled={!webcamActive}
      >
        Answer
      </button>
    </div>
    </>
  );
}), { ssr: false });

// Main component that renders the dynamic component
export default function WebRTCPage() {
  return <WebRTCComponent />;
  
}