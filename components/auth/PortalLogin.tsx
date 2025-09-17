
import React from 'react';

const KeyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-primary mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
);

interface PortalLoginProps {
    onSelectRole: (role: 'Admin' | 'Investor') => void;
    onDevLogin: () => void;
}

const PortalLogin: React.FC<PortalLoginProps> = ({ onSelectRole, onDevLogin }) => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center font-sans">
            <div className="text-center max-w-xs w-full p-4">
                <div className="flex justify-center">
                    <KeyIcon />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">Investor & Admin Portal</h1>
                <p className="text-gray-500 mt-2 mb-8">Please select your role to proceed.</p>
                <div className="space-y-4">
                    <div>
                        <button
                            onClick={() => onSelectRole('Admin')}
                            className="w-full bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-opacity-50 transition-colors duration-300"
                        >
                            Log in as Admin
                        </button>
                        <button
                            onClick={onDevLogin}
                            className="mt-2 w-full text-center text-xs text-gray-500 py-1 hover:text-gray-800 transition-colors"
                            aria-label="Enter developer dashboard"
                        >
                            (Dev) Enter Dashboard
                        </button>
                    </div>
                    
                    <button
                        onClick={() => onSelectRole('Investor')}
                        className="w-full border border-gray-300 text-slate-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-colors duration-300"
                    >
                        Log in as Investor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PortalLogin;
