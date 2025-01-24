import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Video, Calendar, Menu, User, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { useStore } from '../store/useStore';

const Navbar = () => {
  const { user, darkMode, toggleDarkMode, setUser } = useStore();

  return (
    <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Video className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`ml-2 text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ProMeet
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`border-transparent ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                } hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                to="/calendar"
                className={`border-transparent ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                } hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <Calendar className="h-5 w-5 mr-1" />
                Calendar
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button className={`bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700`}>
              Start Meeting
            </button>

            <HeadlessMenu as="div" className="relative">
              <HeadlessMenu.Button className={`p-2 rounded-full ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-600'
              }`}>
                {user ? (
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <User className="h-6 w-6" />
                )}
              </HeadlessMenu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <HeadlessMenu.Items className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                } ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                  {!user ? (
                    <>
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          >
                            Sign in
                          </a>
                        )}
                      </HeadlessMenu.Item>
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          >
                            Sign up
                          </a>
                        )}
                      </HeadlessMenu.Item>
                    </>
                  ) : (
                    <>
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          >
                            <Settings className="h-4 w-4 inline mr-2" />
                            Settings
                          </a>
                        )}
                      </HeadlessMenu.Item>
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setUser(null)}
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          >
                            <LogOut className="h-4 w-4 inline mr-2" />
                            Sign out
                          </button>
                        )}
                      </HeadlessMenu.Item>
                    </>
                  )}
                </HeadlessMenu.Items>
              </Transition>
            </HeadlessMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;