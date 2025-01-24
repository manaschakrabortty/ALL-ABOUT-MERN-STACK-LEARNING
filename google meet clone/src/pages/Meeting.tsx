import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Mic, MicOff, Video as VideoIcon, VideoOff,
  Share2, MessageSquare, Users, MoreVertical,
  PhoneOff, Pencil, Link2
} from 'lucide-react';

const Meeting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Initialize camera when component mounts
    startCamera();
    
    // Clear error message after 5 seconds
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Unable to access camera. Please check your permissions.');
      console.error('Error accessing camera:', err);
    }
  };

  const toggleMic = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isMuted;
      });
    }
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoOff;
      });
    }
    setIsVideoOff(!isVideoOff);
  };

  const startScreenShare = async () => {
    try {
      // If already sharing, stop sharing
      if (isScreenSharing) {
        const stream = screenShareRef.current?.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        screenShareRef.current!.srcObject = null;
        setIsScreenSharing(false);
        return;
      }

      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      
      if (screenShareRef.current) {
        screenShareRef.current.srcObject = screenStream;
      }
      setIsScreenSharing(true);

      // Listen for when user stops screen sharing
      screenStream.getVideoTracks()[0].onended = () => {
        setIsScreenSharing(false);
        if (screenShareRef.current) {
          screenShareRef.current.srcObject = null;
        }
      };
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('Screen sharing permission was denied. Please allow access to share your screen.');
        } else {
          setError('An error occurred while trying to share your screen. Please try again.');
        }
      }
      console.error('Error sharing screen:', err);
    }
  };

  const openExcalidraw = () => {
    window.open('https://excalidraw.com/', '_blank', 'width=800,height=600');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
            {error}
          </div>
        </div>
      )}
      
      <div className="flex-1 relative">
        {/* Main video grid */}
        <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
          {isScreenSharing ? (
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <video
                ref={screenShareRef}
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-white">Participant 1</span>
            </div>
          )}
        </div>

        {/* Chat sidebar */}
        {isChatOpen && (
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-lg">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Meeting Chat</h3>
            </div>
            <div className="p-4">
              {/* Chat messages would go here */}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex space-x-4">
            <button
              onClick={toggleMic}
              className={`p-3 rounded-full ${
                isMuted ? 'bg-red-500' : 'bg-gray-700'
              } text-white hover:bg-opacity-80`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff /> : <Mic />}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                isVideoOff ? 'bg-red-500' : 'bg-gray-700'
              } text-white hover:bg-opacity-80`}
              title={isVideoOff ? 'Start Video' : 'Stop Video'}
            >
              {isVideoOff ? <VideoOff /> : <VideoIcon />}
            </button>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={startScreenShare}
              className={`p-3 rounded-full ${
                isScreenSharing ? 'bg-green-500' : 'bg-gray-700'
              } text-white hover:bg-opacity-80`}
              title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
            >
              <Share2 />
            </button>
            <button
              onClick={openExcalidraw}
              className="p-3 rounded-full bg-gray-700 text-white hover:bg-opacity-80"
              title="Open Whiteboard"
            >
              <Pencil />
            </button>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="p-3 rounded-full bg-gray-700 text-white hover:bg-opacity-80"
              title="Toggle Chat"
            >
              <MessageSquare />
            </button>
            <button 
              className="p-3 rounded-full bg-gray-700 text-white hover:bg-opacity-80"
              title="Participants"
            >
              <Users />
            </button>
            <button 
              className="p-3 rounded-full bg-gray-700 text-white hover:bg-opacity-80"
              title="More Options"
            >
              <MoreVertical />
            </button>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600"
            title="End Call"
          >
            <PhoneOff />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Meeting;