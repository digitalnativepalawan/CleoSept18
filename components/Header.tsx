
import React, { useState, useEffect } from 'react';

interface HeaderProps {
    onBlogClick: () => void;
    onHomeClick: () => void;
    onPortalClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBlogClick, onHomeClick, onPortalClick }) => {
    const [time, setTime] = useState(new Date());
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
                        <button onClick={onHomeClick} className="text-left focus:outline-none focus:ring-2 focus:ring-primary rounded-md">
                            <div className="font-semibold text-lg">{formattedTime.replace(' ', '').toUpperCase()}</div>
                            <div className="text-gray-500">{formattedDate}</div>
                        </button>
                    </div>

                    {/* Centered Navigation for desktop */}
                    <nav aria-label="Primary" className="hidden md:flex items-center space-x-2 text-gray-600">
                        <button onClick={onBlogClick} className="flex items-center px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-800">Blog</span>
                        </button>
                        <button onClick={onPortalClick} className="flex items-center px-3 py-1.5 bg-primary text-white border border-primary rounded-full hover:bg-primary-hover transition-colors">
                            <span className="font-medium">Portal</span>
                        </button>
                    </nav>
                    
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
                        <button onClick={(e) => { e.preventDefault(); onBlogClick(); setMobileMenuOpen(false); }} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Blog</button>
                        <button onClick={(e) => { e.preventDefault(); onPortalClick(); setMobileMenuOpen(false); }} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Portal</button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
