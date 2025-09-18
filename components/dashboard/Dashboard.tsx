

import React, { useState, useMemo } from 'react';
import Sidebar from '../Sidebar';
import ProjectCard from './ProjectCard';
import PasskeyGate from '../PasskeyGate';
import { ProjectView, Task, Labor, Material, Invoice, PaymentStatus, TaskStatus } from './ProjectView';
import BlogView, { BlogPost } from './BlogView';


const vinceTasks: Task[] = [
    { id: 1, name: 'trim coco trees', status: 'Done', type: '', dueDate: '2025-09-01', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 2, name: 'run wire in ground', status: 'In Progress', type: '', dueDate: '2025-09-02', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 3, name: 'paint/sand metal', status: 'Done', type: '', dueDate: '2025-08-28', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 4, name: 'paint walls', status: 'In Progress', type: '', dueDate: '2025-09-02', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 5, name: 'paint metal furrings', status: 'In Progress', type: '', dueDate: '2025-09-02', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 6, name: 'paint hardiflex', status: 'In Progress', type: '', dueDate: '2025-09-02', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 7, name: 'install metal furring after paint', status: 'In Progress', type: '', dueDate: '2025-09-02', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 8, name: 'install hardiflex then paint white', status: 'In Progress', type: '', dueDate: '2025-09-02', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 9, name: 'fix leak in roof', status: 'Done', type: '', dueDate: '2025-08-30', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 10, name: 'cover ceiling gaps', status: 'In Progress', type: '', dueDate: '2025-09-02', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 11, name: 'clear clean front property', status: 'Done', type: '', dueDate: '2025-08-30', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 12, name: 'clean metal ceiling', status: 'Done', type: '', dueDate: '2025-08-26', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 13, name: 'living room window seal', status: 'Done', type: '', dueDate: '2025-08-25', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 14, name: 'front door sealant', status: 'Done', type: '', dueDate: '2025-08-29', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 15, name: 'front door padding', status: 'Done', type: '', dueDate: '2025-08-28', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 16, name: 'bedroom window seal', status: 'Done', type: '', dueDate: '2025-08-25', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 17, name: 'back door sealant', status: 'Done', type: '', dueDate: '2025-08-29', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
    { id: 18, name: 'back door padding', status: 'Done', type: '', dueDate: '2025-08-28', cost: 0, paymentStatus: 'Unpaid', notes: '', imageUrl: '' },
];

const vinceLabor: Labor[] = [
  // Unpaid
  { id: 39, name: 'Ramil', description: 'General Laborer', date: '2025-09-17', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 40, name: 'JR', description: 'General Laborer', date: '2025-09-17', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 41, name: 'Leo', description: 'General Laborer', date: '2025-09-17', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 42, name: 'JR', description: 'General Laborer', date: '2025-09-16', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 43, name: 'Leo', description: 'General Laborer', date: '2025-09-16', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 44, name: 'Boyy', description: 'General Laborer', date: '2025-09-16', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 45, name: 'Leo', description: 'General Laborer', date: '2025-09-15', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 46, name: 'JR', description: 'General Laborer', date: '2025-09-15', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 47, name: 'Ramil', description: 'General Laborer', date: '2025-09-15', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 48, name: 'Ramil', description: 'General Laborer', date: '2025-06-09', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 49, name: 'JR', description: 'General Laborer', date: '2025-06-09', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 50, name: 'Leo', description: 'General Laborer', date: '2025-06-09', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 2, name: 'JR', description: 'General Laborer', date: '2025-09-13', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 3, name: 'Leo', description: 'General Laborer', date: '2025-09-13', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 4, name: 'Jerry', description: 'General Laborer', date: '2025-09-13', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 5, name: 'Boyy', description: 'General Laborer', date: '2025-09-12', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 6, name: 'JR', description: 'General Laborer', date: '2025-09-12', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 7, name: 'Leo', description: 'General Laborer', date: '2025-09-12', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 8, name: 'Jerry', description: 'General Laborer', date: '2025-09-12', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 9, name: 'Boyy', description: 'General Laborer', date: '2025-09-11', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 10, name: 'JR', description: 'General Laborer', date: '2025-09-11', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 11, name: 'Leo', description: 'General Laborer', date: '2025-09-11', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 12, name: 'Boyy', description: 'General Laborer', date: '2025-09-10', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 13, name: 'JR', description: 'General Laborer', date: '2025-09-10', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 14, name: 'Leo', description: 'General Laborer', date: '2025-09-10', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 15, name: 'Boyy', description: 'General Laborer', date: '2025-09-09', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 16, name: 'JR', description: 'General Laborer', date: '2025-09-09', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 17, name: 'Boyy', description: 'General Laborer', date: '2025-09-08', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  { id: 18, name: 'JR', description: 'General Laborer', date: '2025-09-08', hours: 8, total: 500, paymentStatus: 'Unpaid' },
  // Paid
  { id: 19, name: 'JR', description: 'General Laborer', date: '2025-09-05', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 20, name: 'Leo', description: 'General Laborer', date: '2025-09-05', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 21, name: 'JR', description: 'General Laborer', date: '2025-09-04', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 22, name: 'Leo', description: 'General Laborer', date: '2025-09-04', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 23, name: 'JR', description: 'General Laborer', date: '2025-09-03', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 24, name: 'Leo', description: 'General Laborer', date: '2025-09-03', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 25, name: 'JR', description: 'General Laborer', date: '2025-09-02', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 26, name: 'Leo', description: 'General Laborer', date: '2025-09-02', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 27, name: 'JR', description: 'General Laborer', date: '2025-09-01', hours: 4, total: 250, paymentStatus: 'Paid' },
  { id: 28, name: 'Leo', description: 'General Laborer', date: '2025-09-01', hours: 0, total: 0, paymentStatus: 'Paid' },
  { id: 29, name: 'JR', description: 'General Laborer', date: '2025-08-30', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 30, name: 'Leo', description: 'General Laborer', date: '2025-08-30', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 31, name: 'JR', description: 'General Laborer', date: '2025-08-29', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 32, name: 'Leo', description: 'General Laborer', date: '2025-08-29', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 33, name: 'JR', description: 'General Laborer', date: '2025-08-28', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 34, name: 'Leo', description: 'General Laborer', date: '2025-08-28', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 35, name: 'JR', description: 'General Laborer', date: '2025-08-27', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 36, name: 'Leo', description: 'General Laborer', date: '2025-08-27', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 37, name: 'JR', description: 'General Laborer', date: '2025-08-26', hours: 8, total: 500, paymentStatus: 'Paid' },
  { id: 38, name: 'Leo', description: 'General Laborer', date: '2025-08-26', hours: 8, total: 500, paymentStatus: 'Paid' },
];

const vinceMaterials: Material[] = [
    { id: 1, item: 'insulation skim coat', supplier: 'RGT Binga Hardware', total: 6044, paymentStatus: 'Unpaid', notes: 'insulation_skim_coat_1758020667766, materials, 1 pcs', imageUrl: 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png' },
    { id: 2, item: 'silicon, brush, sandpaper', supplier: 'RGT Binga Hardware', total: 1350, paymentStatus: 'Unpaid', notes: 'silicon__brush__sandpaper_1758020201531, materials, 1 pcs', imageUrl: '' },
    { id: 3, item: 'primer t wire', supplier: 'RGT Binga Hardware', total: 1085, paymentStatus: 'Unpaid', notes: 'primer_t_wire_1758020040228, hardware, 1 pcs', imageUrl: '' },
];

const vinceInvoices: Invoice[] = [];

interface ProjectData {
    tasks: Task[];
    labor: Labor[];
    materials: Material[];
    invoices: Invoice[];
}

const initialAllProjectData: Record<string, ProjectData> = {
    "Vince's House": {
        tasks: vinceTasks,
        labor: vinceLabor,
        materials: vinceMaterials,
        invoices: vinceInvoices,
    },
    "El Nido": { tasks: [], labor: [], materials: [], invoices: [] },
    "Lumambong Farm": { tasks: [], labor: [], materials: [], invoices: [] },
    "Properties": { tasks: [], labor: [], materials: [], invoices: [] },
    "SEC Checklist": { tasks: [], labor: [], materials: [], invoices: [] },
    "BIR Checklist": { tasks: [], labor: [], materials: [], invoices: [] },
};

interface DashboardProps {
    onSwitchToLanding: () => void;
    blogPosts: BlogPost[];
    onAddBlogPost: (post: Omit<BlogPost, 'id'>) => void;
}

const formatCurrency = (amount: number): string => {
    if (amount >= 1000) {
        return `₱${(amount / 1000).toFixed(1)}k`;
    }
    return `₱${amount.toLocaleString()}`;
};

const LaborIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const MaterialsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>;
const TasksIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;

interface CategoryTotals {
    tasks: { paid: number; unpaid: number };
    labor: { paid: number; unpaid: number };
    materials: { paid: number; unpaid: number };
}

const InvestmentSummary: React.FC<{ totals: CategoryTotals }> = ({ totals }) => {
    const categories = [
        { name: 'Labor', ...totals.labor, icon: <LaborIcon/> },
        { name: 'Materials', ...totals.materials, icon: <MaterialsIcon/> },
        { name: 'Tasks', ...totals.tasks, icon: <TasksIcon/> }
    ];

    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Investment Allocation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map(cat => {
                    const total = cat.paid + cat.unpaid;
                    const paidPercent = total > 0 ? (cat.paid / total) * 100 : 0;
                    return (
                        <div key={cat.name} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center mb-3">
                                {cat.icon}
                                <h4 className="font-semibold text-gray-700 ml-2">{cat.name}</h4>
                            </div>
                            <div className="text-2xl font-bold text-gray-800 mb-3">{formatCurrency(total)}</div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${paidPercent}%` }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <div>
                                    <span className="font-medium text-green-600">Paid:</span> {formatCurrency(cat.paid)}
                                </div>
                                <div>
                                    <span className="font-medium text-red-600">Unpaid:</span> {formatCurrency(cat.unpaid)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ onSwitchToLanding, blogPosts, onAddBlogPost }) => {
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    
    const [allProjectData, setAllProjectData] = useState(initialAllProjectData);

    const updateProjectData = (projectName: string, updatedData: Partial<ProjectData>) => {
        setAllProjectData(prevData => ({
            ...prevData,
            [projectName]: {
                ...prevData[projectName],
                ...updatedData
            }
        }));
    };

    const handleToggleTaskStatus = (projectName: string, id: number) => {
        const project = allProjectData[projectName];
        const updatedTasks = project.tasks.map(t => {
            if (t.id === id) {
                let newStatus: TaskStatus;
                if (t.status === 'Done') {
                    newStatus = 'In Progress';
                } else if (t.status === 'In Progress') {
                    newStatus = 'Done';
                } else { // Backlog
                    newStatus = 'In Progress';
                }
                return { ...t, status: newStatus };
            }
            return t;
        });
        updateProjectData(projectName, { tasks: updatedTasks });
    };

    const handleToggleTaskPaymentStatus = (projectName: string, id: number) => {
        const project = allProjectData[projectName];
        const updatedTasks = project.tasks.map(t => t.id === id ? { ...t, paymentStatus: (t.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid') as PaymentStatus } : t);
        updateProjectData(projectName, { tasks: updatedTasks });
    };

    const handleAddTask = (projectName: string, taskData: Omit<Task, 'id' | 'cost'>) => {
        const project = allProjectData[projectName];
        const newTask: Task = {
            id: Date.now(),
            cost: 0, 
            ...taskData,
        };
        const updatedTasks = [...project.tasks, newTask];
        updateProjectData(projectName, { tasks: updatedTasks });
    };

    const handleDeleteTask = (projectName: string, id: number) => {
        const project = allProjectData[projectName];
        const updatedTasks = project.tasks.filter(t => t.id !== id);
        updateProjectData(projectName, { tasks: updatedTasks });
    };

    const handleToggleLaborPayment = (projectName: string, id: number) => {
        const project = allProjectData[projectName];
        const updatedLabor = project.labor.map(l => l.id === id ? { ...l, paymentStatus: (l.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid') as PaymentStatus } : l);
        updateProjectData(projectName, { labor: updatedLabor });
    };

    const handleAddLabor = (projectName: string, laborData: Omit<Labor, 'id'>) => {
        const project = allProjectData[projectName];
        const newLabor: Labor = {
            id: Date.now(),
            ...laborData,
        };
        const updatedLabor = [...project.labor, newLabor];
        updateProjectData(projectName, { labor: updatedLabor });
    };

    const handleDeleteLabor = (projectName: string, id: number) => {
        const project = allProjectData[projectName];
        const updatedLabor = project.labor.filter(l => l.id !== id);
        updateProjectData(projectName, { labor: updatedLabor });
    };

    const handleUpdateLabor = (projectName: string, updatedItem: Labor) => {
        const project = allProjectData[projectName];
        const updatedLabor = project.labor.map(l => (l.id === updatedItem.id ? updatedItem : l));
        updateProjectData(projectName, { labor: updatedLabor });
    };

    const handleToggleMaterialPayment = (projectName: string, id: number) => {
        const project = allProjectData[projectName];
        const updatedMaterials = project.materials.map(m => m.id === id ? { ...m, paymentStatus: (m.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid') as PaymentStatus } : m);
        updateProjectData(projectName, { materials: updatedMaterials });
    };
    
    const handleAddMaterial = (projectName: string, materialData: Omit<Material, 'id'>) => {
        const project = allProjectData[projectName];
        const newMaterial: Material = {
            id: Date.now(),
            ...materialData,
        };
        const updatedMaterials = [...project.materials, newMaterial];
        updateProjectData(projectName, { materials: updatedMaterials });
    };

    const handleDeleteMaterial = (projectName: string, id: number) => {
        const project = allProjectData[projectName];
        const updatedMaterials = project.materials.filter(m => m.id !== id);
        updateProjectData(projectName, { materials: updatedMaterials });
    };

    const handleUpdateMaterial = (projectName: string, updatedItem: Material) => {
        const project = allProjectData[projectName];
        const updatedMaterials = project.materials.map(m => (m.id === updatedItem.id ? updatedItem : m));
        updateProjectData(projectName, { materials: updatedMaterials });
    };

    const categoryTotals = useMemo(() => {
        const totals: CategoryTotals = {
            tasks: { paid: 0, unpaid: 0 },
            labor: { paid: 0, unpaid: 0 },
            materials: { paid: 0, unpaid: 0 },
        };

        Object.values(allProjectData).forEach(project => {
            project.tasks.forEach(task => {
                if (task.paymentStatus === 'Paid') {
                    totals.tasks.paid += task.cost;
                } else {
                    totals.tasks.unpaid += task.cost;
                }
            });
            project.labor.forEach(item => {
                if (item.paymentStatus === 'Paid') {
                    totals.labor.paid += item.total;
                } else {
                    totals.labor.unpaid += item.total;
                }
            });
            project.materials.forEach(item => {
                if (item.paymentStatus === 'Paid') {
                    totals.materials.paid += item.total;
                } else {
                    totals.materials.unpaid += item.total;
                }
            });
        });

        return totals;
    }, [allProjectData]);
    
    const grandTotals = useMemo(() => {
        const paid = categoryTotals.tasks.paid + categoryTotals.labor.paid + categoryTotals.materials.paid;
        const unpaid = categoryTotals.tasks.unpaid + categoryTotals.labor.unpaid + categoryTotals.materials.unpaid;
        return { paid, unpaid };
    }, [categoryTotals]);
    
    const projectNames = ["Vince's House", "El Nido", "Lumambong Farm", "Properties", "SEC Checklist", "BIR Checklist", "Blog"];

    const currentProjectData = selectedProject ? allProjectData[selectedProject] : null;

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
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500 hover:text-gray-700 mr-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                        {selectedProject && <h1 className="text-xl font-semibold text-gray-800">{selectedProject}</h1>}
                    </div>
                    <div className="flex items-center space-x-6 ml-auto">
                         <div className="text-right">
                            <p className="text-xs text-gray-500">PAID</p>
                            <p className="font-semibold text-green-600">{formatCurrency(grandTotals.paid)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500">UNPAID</p>
                            <p className="font-semibold text-red-600">{formatCurrency(grandTotals.unpaid)}</p>
                        </div>
                        <button onClick={onSwitchToLanding} className="text-gray-400 hover:text-gray-600">
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </header>

                {selectedProject === 'Blog' ? (
                    <BlogView posts={blogPosts} onAddPost={onAddBlogPost} />
                ) : selectedProject && currentProjectData ? (
                    <PasskeyGate>
                        <ProjectView
                            key={selectedProject}
                            projectName={selectedProject}
                            tasks={currentProjectData.tasks}
                            labor={currentProjectData.labor}
                            materials={currentProjectData.materials}
                            invoices={currentProjectData.invoices}
                            onToggleTaskStatus={(id) => handleToggleTaskStatus(selectedProject, id)}
                            onToggleTaskPayment={(id) => handleToggleTaskPaymentStatus(selectedProject, id)}
                            onAddTask={(taskData) => handleAddTask(selectedProject, taskData)}
                            onDeleteTask={(id) => handleDeleteTask(selectedProject, id)}
                            onToggleLaborPayment={(id) => handleToggleLaborPayment(selectedProject, id)}
                            onUpdateLabor={(item) => handleUpdateLabor(selectedProject, item)}
                            onDeleteLabor={(id) => handleDeleteLabor(selectedProject, id)}
                            onAddLabor={(laborData) => handleAddLabor(selectedProject, laborData)}
                            onToggleMaterialPayment={(id) => handleToggleMaterialPayment(selectedProject, id)}
                            onAddMaterial={(materialData) => handleAddMaterial(selectedProject, materialData)}
                            onDeleteMaterial={(id) => handleDeleteMaterial(selectedProject, id)}
                            onUpdateMaterial={(item) => handleUpdateMaterial(selectedProject, item)}
                        />
                    </PasskeyGate>
                ) : (
                    <main className="flex-1 overflow-y-auto p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h2>
                        <p className="text-gray-500 mb-6">Select a project from the sidebar to manage tasks, budgets, and other resources.</p>
                        <InvestmentSummary totals={categoryTotals} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
