import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Video, Users, Share2, Calendar, Layout,
  Pencil, BookMarked, Star, Code, Coffee,
  Laptop, Clock, Shield, Zap, Headphones,
  MessageSquare, Settings, Smile
} from 'lucide-react';
import TaskManager from '../components/TaskManager';
import { useStore } from '../store/useStore';

const Home = () => {
  const [meetingCode, setMeetingCode] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const { darkMode } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const createMeeting = () => {
    const meetingId = Math.random().toString(36).substring(2, 12);
    navigate(`/meeting/${meetingId}`);
  };

  const joinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (meetingCode.trim()) {
      navigate(`/meeting/${meetingCode}`);
    }
  };

  const quickLinks = [
    {
      title: 'Excalidraw Whiteboard',
      url: 'https://excalidraw.com/',
      icon: <Pencil className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Google Drive',
      url: 'https://drive.google.com/',
      icon: <BookMarked className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Google Docs',
      url: 'https://docs.google.com/',
      icon: <Star className="h-6 w-6" />,
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  const productivityTools = [
    {
      title: 'Notion',
      url: 'https://www.notion.so/',
      icon: <Coffee className="h-6 w-6" />,
      color: 'bg-gray-100 text-gray-600'
    },
    {
      title: 'Figma',
      url: 'https://www.figma.com/',
      icon: <Laptop className="h-6 w-6" />,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Chatgpt',
      url: 'https://www.chatgpt.com/',
      icon: <Laptop className="h-6 w-6" />,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Ask Ai',
      url: 'https://www.Askai.com/',
      icon: <Laptop className="h-6 w-6" />,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Time Display */}
      <div className={`fixed top-0 right-0 p-4 z-50 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span className="font-medium">
            {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Existing content remains the same until the features section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h1 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Premium video meetings. Now free for everyone.
            </h1>
            <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We re-engineered the service for secure business meetings and made it
              free for everyone to use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={createMeeting}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                <Video className="h-5 w-5 mr-2" />
                New Meeting
              </button>
              <form onSubmit={joinMeeting} className="flex-1 flex">
                <input
                  type="text"
                  value={meetingCode}
                  onChange={(e) => setMeetingCode(e.target.value)}
                  placeholder="Enter meeting code"
                  className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border ${darkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Video conference"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Quick Access and Tools sections remain the same */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="md:col-span-2">
            {/* Quick Access Links */}
            <div className={`p-6 rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } mb-8`}>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Access
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center p-4 rounded-lg ${link.color} hover:opacity-90 transition-opacity`}
                  >
                    {link.icon}
                    <span className="ml-3 font-medium">{link.title}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Productivity Tools */}
            <div className={`p-6 rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Productivity Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {productivityTools.map((tool, index) => (
                  <a
                    key={index}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center p-4 rounded-lg ${tool.color} hover:opacity-90 transition-opacity`}
                  >
                    {tool.icon}
                    <span className="ml-3 font-medium">{tool.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <TaskManager />
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="mt-20">
          <h2 className={`text-2xl font-semibold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Premium Features for Everyone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Enterprise Security"
              description="End-to-end encryption for all meetings"
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Low Latency"
              description="Crystal clear audio and video quality"
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<Headphones className="h-6 w-6" />}
              title="Noise Cancellation"
              description="AI-powered background noise reduction"
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="Live Chat"
              description="Real-time messaging during meetings"
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<Settings className="h-6 w-6" />}
              title="Custom Controls"
              description="Personalize your meeting experience"
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Large Meetings"
              description="Host up to 100 participants"
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<Share2 className="h-6 w-6" />}
              title="Screen Sharing"
              description="Share your screen with one click"
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<Smile className="h-6 w-6" />}
              title="Virtual Background"
              description="Custom backgrounds and blur effects"
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
  darkMode
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  darkMode: boolean;
}) => (
  <div className={`p-6 rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
    <div className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-4`}>{icon}</div>
    <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{description}</p>
  </div>
);

export default Home;