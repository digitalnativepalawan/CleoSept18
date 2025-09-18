import React from 'react';
import { useAuth } from './auth/AuthContext';
import { usePinGate } from '../hooks/usePinGate';

const NavItem: React.FC<{ label: string, isActive: boolean, onClick: () => void }> = ({ label, onClick, isActive }) => {
    const activeClasses = 'bg-blue-50 text-primary font-semibold';
    const inactiveClasses = 'text-gray-600 hover:bg-gray-100';

    const ChevronIcon = isActive ? (
        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
    ) : (
        <svg className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
    );

    return (
         <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} className={`flex items-center py-1.5 px-2 rounded-md text-sm group ${isActive ? activeClasses : inactiveClasses}`}>
            {ChevronIcon}
            <span>{label}</span>
         </a>
    );
}

interface SidebarProps {
    projects: string[];
    selectedProject: string | null;
    onSelectProject: (projectName: string) => void;
    onShowDashboard: () => void;
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLanding: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ projects, selectedProject, onSelectProject, onShowDashboard, isOpen, onClose, onSwitchToLanding }) => {
    const { currentUser, logout: authLogout } = useAuth();
    const { gateEnabled, logout: pinLogout } = usePinGate();
    const isProjectView = selectedProject !== null;

    const sidebarClasses = `
        w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0
        fixed inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        md:static md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `;

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={onClose} aria-hidden="true"></div>}
            
            <aside className={sidebarClasses}>
                <div className="p-4 border-b">
                    <button 
                        onClick={onSwitchToLanding} 
                        className="w-full flex items-center text-gray-600 hover:bg-gray-100 py-2 px-3 rounded-md text-sm mb-4"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3V16a1 1 0 011-1h2a1 1 0 011 1v5h3a1 1 0 001-1V10" />
                        </svg>
                        <span>Back to Home</span>
                    </button>
                    <div className="flex justify-between items-center">
                        <button onClick={isProjectView ? onShowDashboard : undefined} className={`text-lg font-semibold text-gray-800 flex items-center w-full text-left ${isProjectView ? 'cursor-pointer hover:bg-gray-50 rounded-md -m-1 p-1' : 'cursor-default'}`}>
                            {isProjectView && <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>}
                            {!isProjectView && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>}
                            Projects
                        </button>
                        <button onClick={onClose} className="md:hidden p-1 text-gray-500 hover:text-gray-700" aria-label="Close sidebar">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </div>
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-1">
                        {projects.map(name => (
                             <li key={name}><NavItem label={name} isActive={selectedProject === name} onClick={() => onSelectProject(name)} /></li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">{currentUser?.role}</p>
                            <p className="text-sm text-gray-500">Logged In</p>
                        </div>
                    </div>
                    {gateEnabled && (
                        <button
                            onClick={pinLogout}
                            className="w-full text-left text-xs text-red-600 hover:bg-red-50 py-1.5 px-3 rounded-md mb-2 transition-colors"
                        >
                            Log Out (Staging)
                        </button>
                    )}
                    <button
                        onClick={authLogout}
                        className="w-full flex items-center text-gray-600 hover:bg-gray-100 py-2 px-3 rounded-md text-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;