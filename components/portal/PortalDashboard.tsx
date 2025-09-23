
import React, { useState, ReactNode } from 'react';
import TasksView from './TasksView';
import MaterialsView from './MaterialsView';
import LaborView from './LaborView';

type PortalView = 'tasks' | 'materials' | 'labor';

const TaskIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
);
const MaterialIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
);
const LaborIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.28-1.25-1.45-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.28-1.25 1.45-1.857M12 12a3 3 0 100-6 3 3 0 000 6z" /></svg>
);

const NavItem: React.FC<{ icon: ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
            isActive ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
        {icon}
        <span className="ml-3">{label}</span>
    </button>
);

const PortalDashboard: React.FC = () => {
    const [activeView, setActiveView] = useState<PortalView>('tasks');

    const renderView = () => {
        switch (activeView) {
            case 'tasks': return <TasksView />;
            case 'materials': return <MaterialsView />;
            case 'labor': return <LaborView />;
            default: return <TasksView />;
        }
    };
    
    return (
        <div className="flex h-[calc(100vh-65px)] bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 p-4 flex flex-col">
                <div className="flex items-center mb-8 px-2">
                    <span className="font-semibold text-lg text-gray-800">Project Portal</span>
                </div>
                <nav className="space-y-2">
                    <NavItem icon={<TaskIcon />} label="Tasks" isActive={activeView === 'tasks'} onClick={() => setActiveView('tasks')} />
                    <NavItem icon={<MaterialIcon />} label="Materials" isActive={activeView === 'materials'} onClick={() => setActiveView('materials')} />
                    <NavItem icon={<LaborIcon />} label="Labor" isActive={activeView === 'labor'} onClick={() => setActiveView('labor')} />
                </nav>
            </aside>
            
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8">
                {renderView()}
            </main>
        </div>
    );
};

export default PortalDashboard;