
import React, { useState, useEffect } from 'react';
import { useAuth } from './auth/AuthContext';

interface HeaderProps {
    onLoginClick: () => void;
    onSignUpClick: () => void;
    onPortalClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onSignUpClick, onPortalClick }) => {
    const [time, setTime] = useState(new Date());
    const { currentUser, logout, loading } = useAuth();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const formattedDate = time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <header className="border-b border-gray-200 relative">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="relative flex justify-between items-center text-sm">
                    {/* Time/Date - Centered on mobile, left on desktop */}
                    <div className="text-center w-full md:w-auto md:text-left">
                        <div className="font-semibold text-lg">{formattedTime.replace(' ', '').toUpperCase()}</div>
                        <div className="text-gray-500">{formattedDate}</div>
                    </div>

                    {/* Centered Navigation for desktop */}
                    <nav aria-label="Primary" className="hidden md:flex items-center space-x-2 text-gray-600 absolute left-1/2 -translate-x-1/2">
                        <a href="#" className="flex items-center px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-800">Blog</span>
                        </a>
                        <button onClick={onPortalClick} className="flex items-center px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-800">Portal</span>
                        </button>
                        <a href="#" className="flex items-center px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-800">GitHub</span>
                        </a>
                        <button className="flex items-center px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-800">PHP</span>
                        </button>
                    </nav>
                    
                    {/* Right-aligned controls for desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        {loading ? (
                            <div className="h-8 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
                        ) : currentUser ? (
                            <>
                                <span className="text-gray-600">Welcome, {currentUser.email.split('@')[0]}</span>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium transition-colors"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={onSignUpClick}
                                    className="px-4 py-2 border border-transparent rounded-lg hover:bg-gray-100 font-medium transition-colors"
                                >
                                    Sign Up
                                </button>
                                <button
                                    onClick={onLoginClick}
                                    className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-5 rounded-lg shadow-sm transition-colors duration-300"
                                >
                                    Log In
                                </button>
                            </>
                        )}
                    </div>

                     {/* Mobile Menu Button */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 md:hidden">
                        <button 
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div id="mobile-menu" className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-20">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button onClick={(e) => { e.preventDefault(); onPortalClick(); setMobileMenuOpen(false); }} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Portal</button>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Blog</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">GitHub</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">PHP</a>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="px-5">
                            {loading ? (
                                <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                            ) : currentUser ? (
                                <>
                                    <p className="text-base font-medium text-gray-800">Welcome, {currentUser.email.split('@')[0]}</p>
                                    <div className="mt-3">
                                        <button
                                            onClick={() => { logout(); setMobileMenuOpen(false); }}
                                            className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <button
                                        onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}
                                        className="w-full text-center bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-5 rounded-lg shadow-sm transition-colors duration-300"
                                    >
                                        Log In
                                    </button>
                                    <button
                                        onClick={() => { onSignUpClick(); setMobileMenuOpen(false); }}
                                        className="w-full text-center block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
