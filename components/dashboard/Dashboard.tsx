

import React, { useState, useMemo } from 'react';
import Sidebar from '../Sidebar';
import ProjectCard from './ProjectCard';
import { ProjectView, Task, Labor, Material, Invoice } from './ProjectView';

const initialTasks: Task[] = [
    { id: 1, name: 'trim coco trees', completionStatus: 'Done', dueDate: '2025-09-01', cost: 500, paymentStatus: 'Paid' },
    { id: 2, name: 'run wire in ground', completionStatus: 'In Progress', dueDate: '2025-09-02', cost: 2500, paymentStatus: 'Unpaid' },
    { id: 3, name: 'paint/sand metal', completionStatus: 'Done', dueDate: '2025-08-28', cost: 1200, paymentStatus: 'Paid' },
    { id: 4, name: 'paint walls', completionStatus: 'In Progress', dueDate: '2025-09-02', cost: 3000, paymentStatus: 'Unpaid' },
    { id: 5, name: 'paint metal furrings', completionStatus: 'In Progress', dueDate: '2025-09-02', cost: 800, paymentStatus: 'Unpaid' },
    { id: 6, name: 'install hardiflex then paint white', completionStatus: 'In Progress', dueDate: '2025-09-02', cost: 4500, paymentStatus: 'Unpaid' },
    { id: 7, name: 'fix leak in roof', completionStatus: 'Done', dueDate: '2025-08-30', cost: 1500, paymentStatus: 'Paid' },
];

const initialLabor: Labor[] = [
  { id: 1, name: 'JR', description: 'General Labor', date: '2025-09-13', hours: 8, total: 625, status: 'Unpaid' },
  { id: 2, name: 'Leo', description: 'General Labor', date: '2025-09-13', hours: 8, total: 625, status: 'Unpaid' },
  { id: 3, name: 'Jery', description: 'General Labor', date: '2025-09-13', hours: 8, total: 625, status: 'Unpaid' },
  { id: 4, name: 'Ramil', description: 'General Labor', date: '2025-09-12', hours: 8, total: 625, status: 'Unpaid' },
  { id: 5, name: 'JR', description: 'General Labor', date: '2025-09-06', hours: 8, total: 625, status: 'Paid' },
  { id: 6, name: 'Leo', description: 'General Labor', date: '2025-09-06', hours: 8, total: 625, status: 'Paid' },
  { id: 7, name: 'JR', description: 'General Labor', date: '2025-09-05', hours: 8, total: 625, status: 'Paid' },
  { id: 8, name: 'Leo', description: 'General Labor', date: '2025-09-05', hours: 8, total: 625, status: 'Paid' },
];

const initialMaterials: Material[] = [
    { id: 1, item: 'White Wall Paint', supplier: 'Local Hardware', total: 700, status: 'Unpaid', notes: '' },
    { id: 2, item: 'Roll Brush #2', supplier: 'Local Hardware', total: 330, status: 'Unpaid', notes: '' },
    { id: 3, item: 'Primer Epoxy Paint set', supplier: 'Local Hardware', total: 900, status: 'Unpaid', notes: '' },
    { id: 4, item: 'Solar Panel Kit', supplier: 'SolarTech Solutions', total: 35000, status: 'Paid', notes: 'Receipt: https://drive.google.com/file/d/placeholder' },
];

const initialInvoices: Invoice[] = [
    { id: 1, invoiceNumber: 'INV-001', supplier: 'Local Hardware', total: 5430, dueDate: '2025-09-20', status: 'Unpaid', link: 'https://drive.google.com/file/d/placeholder' },
    { id: 2, invoiceNumber: 'INV-002', supplier: 'SolarTech Solutions', total: 35000, dueDate: '2025-08-15', status: 'Paid' },
    { id: 3, invoiceNumber: 'INV-003', supplier: 'Construction Co.', total: 12500, dueDate: '2025-09-25', status: 'Unpaid' },
];

interface DashboardProps {
    onSwitchToLanding: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSwitchToLanding }) => {
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    
    const [tasks, setTasks] = useState(initialTasks);
    const [labor, setLabor] = useState(initialLabor);
    const [materials, setMaterials] = useState(initialMaterials);
    const [invoices, setInvoices] = useState(initialInvoices);

    const handleToggleTaskPaymentStatus = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, paymentStatus: t.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid' } : t));
    };

    const handleToggleTaskCompletionStatus = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completionStatus: t.completionStatus === 'Done' ? 'In Progress' : 'Done' } : t));
    };

    const handleToggleLaborStatus = (id: number) => {
        setLabor(labor.map(l => l.id === id ? { ...l, status: l.status === 'Paid' ? 'Unpaid' : 'Paid' } : l));
    };

    const handleToggleMaterialStatus = (id: number) => {
        setMaterials(materials.map(m => m.id === id ? { ...m, status: m.status === 'Paid' ? 'Unpaid' : 'Paid' } : m));
    };
    
    const handleToggleInvoiceStatus = (id: number) => {
        setInvoices(invoices.map(i => i.id === id ? { ...i, status: i.status === 'Paid' ? 'Unpaid' : 'Paid' } : i));
    };

    const projectTotals = useMemo(() => {
        // In a real app, you might filter data based on selectedProject
        // For this demo, we assume the loaded data is for the selected project
        if (!selectedProject) {
            // In a real app, you'd calculate totals for all projects or show nothing
            return { paid: 0, unpaid: 0 };
        }
        
        let paid = 0;
        let unpaid = 0;

        tasks.forEach(task => {
            if (task.paymentStatus === 'Paid') paid += task.cost;
            else unpaid += task.cost;
        });

        labor.forEach(item => {
            if (item.status === 'Paid') paid += item.total;
            else unpaid += item.total;
        });

        materials.forEach(item => {
            if (item.status === 'Paid') paid += item.total;
            else unpaid += item.total;
        });

        invoices.forEach(item => {
            if (item.status === 'Paid') paid += item.total;
            else unpaid += item.total;
        });

        return { paid, unpaid };
    }, [tasks, labor, materials, invoices, selectedProject]);
    
    const projectNames = ['Binga Beach Main House', 'Phase 1 Eco-Villas', 'Restaurant & Bar', 'Staff Housing'];

    return (
        <div className="h-screen w-screen flex bg-gray-50 font-sans">
            <Sidebar
                projects={projectNames}
                selectedProject={selectedProject}
                onSelectProject={setSelectedProject}
                onShowDashboard={() => setSelectedProject(null)}
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onSwitchToLanding={onSwitchToLanding}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center flex-shrink-0">
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">{selectedProject || 'Projects Dashboard'}</h1>
                    <div className="flex items-center space-x-4">
                        {selectedProject && (
                            <>
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-green-600">₱{projectTotals.paid.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">Paid</p>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-red-600">₱{projectTotals.unpaid.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">Unpaid</p>
                                </div>
                            </>
                        )}
                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        </button>
                    </div>
                </header>

                {selectedProject ? (
                    <ProjectView
                        key={selectedProject}
                        projectName={selectedProject}
                        tasks={tasks}
                        labor={labor}
                        materials={materials}
                        invoices={invoices}
                        onToggleTaskPayment={handleToggleTaskPaymentStatus}
                        onToggleTaskCompletion={handleToggleTaskCompletionStatus}
                        onToggleLaborPayment={handleToggleLaborStatus}
                        onToggleMaterialPayment={handleToggleMaterialStatus}
                        onToggleInvoicePayment={handleToggleInvoiceStatus}
                    />
                ) : (
                    <main className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {projectNames.map(name => (
                                <ProjectCard key={name} name={name} onSelect={() => setSelectedProject(name)} />
                            ))}
                        </div>
                    </main>
                )}
            </div>
        </div>
    );
};

export default Dashboard;