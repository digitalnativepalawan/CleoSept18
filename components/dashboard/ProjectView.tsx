

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Modal from '../common/Modal';

export type PaymentStatus = 'Paid' | 'Unpaid';
export type TaskStatus = 'Backlog' | 'In Progress' | 'Done';

export interface Task {
    id: number;
    name: string;
    status: TaskStatus;
    type: string;
    dueDate: string;
    cost: number;
    paymentStatus: PaymentStatus;
    notes: string;
    imageUrl: string;
}
export interface Labor {
    id: number;
    name: string;
    description: string;
    date: string;
    hours: number;
    total: number;
    paymentStatus: PaymentStatus;
}
export interface Material {
    id: number;
    item: string;
    supplier: string;
    total: number;
    paymentStatus: PaymentStatus;
    notes: string;
    imageUrl?: string;
}

export interface Invoice {
    id: number;
    invoiceNumber: string;
    supplier: string;
    total: number;
    dueDate: string;
    status: PaymentStatus;
    link?: string;
}

const StatusBadge: React.FC<{ status: TaskStatus | PaymentStatus, onClick?: () => void }> = ({ status, onClick }) => {
    const statusClasses = {
        'Done': 'bg-green-100 text-green-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'Backlog': 'bg-gray-100 text-gray-800',
        'Paid': 'bg-green-100 text-green-800',
        'Unpaid': 'bg-red-100 text-red-800',
    };
    const commonClasses = 'px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap';
    
    if (onClick) {
        return (
            <button onClick={onClick} className={`${commonClasses} ${statusClasses[status]} transition-transform transform hover:scale-105`}>
                {status}
            </button>
        )
    }

    return (
        <span className={`${commonClasses} ${statusClasses[status]}`}>
            {status}
        </span>
    );
};

// Sorting Hook
type SortDirection = 'ascending' | 'descending';
type SortConfig<T> = { key: keyof T | null; direction: SortDirection };

const useSortableData = <T extends object>(
    items: T[], 
    config: SortConfig<T> = { key: null, direction: 'ascending' }
) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key!];
                const bValue = b[sortConfig.key!];

                let aComparable: string | number | Date;
                let bComparable: string | number | Date;

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    if (!isNaN(Date.parse(aValue)) && !isNaN(Date.parse(bValue))) {
                        aComparable = new Date(aValue);
                        bComparable = new Date(bValue);
                    } else {
                        aComparable = aValue.toLowerCase();
                        bComparable = bValue.toLowerCase();
                    }
                } else {
                    aComparable = aValue as number;
                    bComparable = bValue as number;
                }

                if (aComparable < bComparable) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aComparable > bComparable) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key: keyof T) => {
        let direction: SortDirection = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const SortIndicator: React.FC<{
  sortConfig: SortConfig<any>;
  sortKey: string;
}> = ({ sortConfig, sortKey }) => {
  const iconClasses = "ml-1 text-xs";
  if (sortConfig.key !== sortKey) {
    return <span className={`${iconClasses} text-gray-400 opacity-0 group-hover:opacity-50 transition-opacity`}>↕</span>;
  }
  return (
    <span className={`${iconClasses} text-gray-800`}>
      {sortConfig.direction === 'ascending' ? '▲' : '▼'}
    </span>
  );
};

interface TasksViewProps {
    tasks: Task[];
    onTogglePayment: (id: number) => void;
    onDelete: (id: number) => void;
    onToggleStatus: (id: number) => void;
}

const TasksView: React.FC<TasksViewProps> = ({ tasks, onTogglePayment, onDelete, onToggleStatus }) => {
    const { items: sortedTasks, requestSort, sortConfig } = useSortableData<Task>(tasks, { key: 'dueDate', direction: 'ascending' });

    return (
        <>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3 p-4 bg-gray-50 sm:bg-transparent sm:p-0">
                {sortedTasks.map((task) => (
                    <div key={task.id} className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm relative ${task.status === 'Done' ? 'opacity-70' : ''}`}>
                        <div className="absolute top-2 right-2">
                            <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors" aria-label="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                        <div className="flex items-start justify-between mb-3 pr-8">
                            <p className={`font-medium text-gray-800 truncate ${task.status === 'Done' ? 'line-through text-gray-500' : ''}`}>{task.name}</p>
                        </div>
                        <div className="space-y-2 text-sm border-t pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Status</span>
                                <StatusBadge status={task.status} onClick={() => onToggleStatus(task.id)} />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Payment</span>
                                <StatusBadge status={task.paymentStatus} onClick={() => onTogglePayment(task.id)} />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Due Date</span>
                                <span className="text-gray-700">{task.dueDate}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Cost</span>
                                <span className="text-gray-800 font-semibold">₱{task.cost.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th className="p-3 font-medium">
                                <button onClick={() => requestSort('name')} className="flex items-center group">Task <SortIndicator sortConfig={sortConfig} sortKey="name" /></button>
                            </th>
                            <th className="p-3 font-medium">
                                <button onClick={() => requestSort('status')} className="flex items-center group">Status <SortIndicator sortConfig={sortConfig} sortKey="status" /></button>
                            </th>
                             <th className="p-3 font-medium">
                                <button onClick={() => requestSort('paymentStatus')} className="flex items-center group">Payment <SortIndicator sortConfig={sortConfig} sortKey="paymentStatus" /></button>
                            </th>
                            <th className="p-3 font-medium">
                                <button onClick={() => requestSort('dueDate')} className="flex items-center group">Due Date <SortIndicator sortConfig={sortConfig} sortKey="dueDate" /></button>
                            </th>
                            <th className="p-3 font-medium text-right">
                                <button onClick={() => requestSort('cost')} className="flex items-center ml-auto group">Cost <SortIndicator sortConfig={sortConfig} sortKey="cost" /></button>
                            </th>
                            <th className="p-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.map((task) => (
                            <tr key={task.id} className={`border-b border-gray-200 bg-white transition-all ${task.status === 'Done' ? 'opacity-60' : ''}`}>
                                <td className={`p-3 text-gray-800 font-medium transition-colors ${task.status === 'Done' ? 'line-through text-gray-500' : ''}`}>{task.name}</td>
                                <td className="p-3"><StatusBadge status={task.status} onClick={() => onToggleStatus(task.id)} /></td>
                                <td className="p-3"><StatusBadge status={task.paymentStatus} onClick={() => onTogglePayment(task.id)} /></td>
                                <td className="p-3 text-gray-600">{task.dueDate}</td>
                                <td className="p-3 text-gray-600 text-right">₱{task.cost.toLocaleString()}</td>
                                <td className="p-3 text-right">
                                    <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors" aria-label="Delete">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

interface LaborViewProps {
    labor: Labor[];
    onTogglePayment: (id: number) => void;
    onEdit: (item: Labor) => void;
    onDelete: (id: number) => void;
}

const LaborView: React.FC<LaborViewProps> = ({ labor, onTogglePayment, onEdit, onDelete }) => {
    const { items: sortedLabor, requestSort, sortConfig } = useSortableData<Labor>(labor, { key: 'date', direction: 'descending' });
    return (
        <>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3 p-4 bg-gray-50 sm:bg-transparent sm:p-0">
                {sortedLabor.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm relative">
                        <div className="absolute top-2 right-2 flex items-center space-x-1">
                            <button onClick={() => onEdit(item)} className="text-gray-400 hover:text-primary p-1 rounded-full transition-colors" aria-label="Edit">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L13.196 5.196a2.5 2.5 0 012.036-.536z" /></svg>
                            </button>
                            <button onClick={() => onDelete(item.id)} className="text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors" aria-label="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                        <div className="mb-3 pr-16">
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                        <div className="space-y-2 text-sm border-t pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Date</span>
                                <span className="text-gray-700">{item.date}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Hours</span>
                                <span className="text-gray-700">{item.hours}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Total</span>
                                <span className="text-gray-800 font-semibold">₱{item.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Status</span>
                                <StatusBadge status={item.paymentStatus} onClick={() => onTogglePayment(item.id)}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th className="p-3 font-medium">
                                 <button onClick={() => requestSort('name')} className="flex items-center group">Name <SortIndicator sortConfig={sortConfig} sortKey="name" /></button>
                            </th>
                            <th className="p-3 font-medium">
                                <button onClick={() => requestSort('date')} className="flex items-center group">Date <SortIndicator sortConfig={sortConfig} sortKey="date" /></button>
                            </th>
                            <th className="p-3 font-medium text-right">
                                 <button onClick={() => requestSort('hours')} className="flex items-center ml-auto group">Hours <SortIndicator sortConfig={sortConfig} sortKey="hours" /></button>
                            </th>
                            <th className="p-3 font-medium text-right">
                                 <button onClick={() => requestSort('total')} className="flex items-center ml-auto group">Total (₱) <SortIndicator sortConfig={sortConfig} sortKey="total" /></button>
                            </th>
                            <th className="p-3 font-medium">
                                 <button onClick={() => requestSort('paymentStatus')} className="flex items-center group">Status <SortIndicator sortConfig={sortConfig} sortKey="paymentStatus" /></button>
                            </th>
                            <th className="p-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedLabor.map((item) => (
                            <tr key={item.id} className="border-b border-gray-200 bg-white">
                                <td className="p-3 text-gray-800 font-medium">{item.name}</td>
                                <td className="p-3 text-gray-600">{item.date}</td>
                                <td className="p-3 text-gray-600 text-right">{item.hours}</td>
                                <td className="p-3 text-gray-600 text-right">{item.total.toLocaleString()}</td>
                                <td className="p-3"><StatusBadge status={item.paymentStatus} onClick={() => onTogglePayment(item.id)} /></td>
                                <td className="p-3 text-right">
                                    <div className="flex items-center justify-end space-x-1">
                                        <button onClick={() => onEdit(item)} className="text-gray-400 hover:text-primary p-1 rounded-full transition-colors" aria-label="Edit">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L13.196 5.196a2.5 2.5 0 012.036-.536z" /></svg>
                                        </button>
                                        <button onClick={() => onDelete(item.id)} className="text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors" aria-label="Delete">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

interface MaterialsViewProps {
    materials: Material[];
    onTogglePayment: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (item: Material) => void;
    onViewImage: (url: string) => void;
}

const MaterialsView: React.FC<MaterialsViewProps> = ({ materials, onTogglePayment, onDelete, onEdit, onViewImage }) => {
    const { items: sortedMaterials, requestSort, sortConfig } = useSortableData<Material>(materials, { key: 'item', direction: 'ascending' });

    return (
        <>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3 p-4 bg-gray-50 sm:bg-transparent sm:p-0">
                {sortedMaterials.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm relative">
                        <div className="absolute top-2 right-2 flex items-center space-x-1">
                             <button onClick={() => onEdit(item)} className="text-gray-400 hover:text-primary p-1 rounded-full transition-colors" aria-label="Edit">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L13.196 5.196a2.5 2.5 0 012.036-.536z" /></svg>
                            </button>
                             <button onClick={() => onDelete(item.id)} className="text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors" aria-label="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                        <div className="mb-3 pr-16">
                            <div className="flex items-center">
                                <p className="font-medium text-gray-800">{item.item}</p>
                                {item.imageUrl && (
                                    <button onClick={() => onViewImage(item.imageUrl!)} className="ml-2 text-primary hover:text-primary-hover" aria-label="View Image">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">{item.supplier}</p>
                        </div>
                        <div className="space-y-2 text-sm border-t pt-3">
                             <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Total</span>
                                <span className="text-gray-800 font-semibold">₱{item.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Status</span>
                                <StatusBadge status={item.paymentStatus} onClick={() => onTogglePayment(item.id)}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th className="p-3 font-medium"><button onClick={() => requestSort('item')} className="flex items-center group">Item <SortIndicator sortConfig={sortConfig} sortKey="item" /></button></th>
                            <th className="p-3 font-medium"><button onClick={() => requestSort('supplier')} className="flex items-center group">Supplier <SortIndicator sortConfig={sortConfig} sortKey="supplier" /></button></th>
                            <th className="p-3 font-medium text-right"><button onClick={() => requestSort('total')} className="flex items-center ml-auto group">Total (₱) <SortIndicator sortConfig={sortConfig} sortKey="total" /></button></th>
                            <th className="p-3 font-medium"><button onClick={() => requestSort('paymentStatus')} className="flex items-center group">Status <SortIndicator sortConfig={sortConfig} sortKey="paymentStatus" /></button></th>
                            <th className="p-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedMaterials.map((item) => (
                            <tr key={item.id} className="border-b border-gray-200 bg-white">
                                <td className="p-3 text-gray-800 font-medium">
                                    <div className="flex items-center">
                                        <span>{item.item}</span>
                                        {item.imageUrl && (
                                            <button onClick={() => onViewImage(item.imageUrl!)} className="ml-2 text-primary hover:text-primary-hover" aria-label="View Image">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                            </button>
                                        )}
                                    </div>
                                </td>
                                <td className="p-3 text-gray-600">{item.supplier}</td>
                                <td className="p-3 text-gray-600 text-right">{item.total.toLocaleString()}</td>
                                <td className="p-3"><StatusBadge status={item.paymentStatus} onClick={() => onTogglePayment(item.id)} /></td>
                                <td className="p-3 text-right">
                                    <div className="flex items-center justify-end space-x-1">
                                        <button onClick={() => onEdit(item)} className="text-gray-400 hover:text-primary p-1 rounded-full transition-colors" aria-label="Edit">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L13.196 5.196a2.5 2.5 0 012.036-.536z" /></svg>
                                        </button>
                                        <button onClick={() => onDelete(item.id)} className="text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors" aria-label="Delete">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

interface InvoicesViewProps {
    tasks: Task[];
    labor: Labor[];
    materials: Material[];
    onToggleTaskPayment: (id: number) => void;
    onToggleLaborPayment: (id: number) => void;
    onToggleMaterialPayment: (id: number) => void;
}

interface ConsolidatedLabor {
    name: string;
    totalAmount: number;
    daysWorked: number;
    dateRange: string;
    entryIds: number[];
}

const InvoicesView: React.FC<InvoicesViewProps> = ({
    tasks,
    labor,
    materials,
    onToggleTaskPayment,
    onToggleLaborPayment,
    onToggleMaterialPayment,
}) => {
    const unpaidTasks = useMemo(() => tasks.filter(t => t.paymentStatus === 'Unpaid' && t.cost > 0), [tasks]);
    const unpaidMaterials = useMemo(() => materials.filter(m => m.paymentStatus === 'Unpaid' && m.total > 0), [materials]);

    const consolidatedLabor = useMemo(() => {
        const unpaid = labor.filter(l => l.paymentStatus === 'Unpaid' && l.total > 0);
        const groupedByName: { [key: string]: Labor[] } = unpaid.reduce((acc, item) => {
            if (!acc[item.name]) acc[item.name] = [];
            acc[item.name].push(item);
            return acc;
        }, {});

        const result: ConsolidatedLabor[] = Object.entries(groupedByName).map(([name, entries]) => {
            if (entries.length === 0) return null;
            const sortedEntries = entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            const totalAmount = sortedEntries.reduce((sum, entry) => sum + entry.total, 0);
            const daysWorked = sortedEntries.length;
            const startDate = sortedEntries[0]?.date;
            const endDate = sortedEntries[sortedEntries.length - 1]?.date;
            const dateRange = startDate === endDate ? startDate : `${startDate} to ${endDate}`;
            const entryIds = sortedEntries.map(e => e.id);
            return { name, totalAmount, daysWorked, dateRange, entryIds };
        }).filter((item): item is ConsolidatedLabor => item !== null);

        return result.sort((a, b) => b.totalAmount - a.totalAmount);
    }, [labor]);

    const totalUnpaid = useMemo(() => {
        const taskTotal = unpaidTasks.reduce((sum, t) => sum + t.cost, 0);
        const laborTotal = consolidatedLabor.reduce((sum, l) => sum + l.totalAmount, 0);
        const materialTotal = unpaidMaterials.reduce((sum, m) => sum + m.total, 0);
        return taskTotal + laborTotal + materialTotal;
    }, [unpaidTasks, consolidatedLabor, unpaidMaterials]);

    const handleToggleConsolidatedLabor = (entryIds: number[]) => {
        entryIds.forEach(id => onToggleLaborPayment(id));
    };

    const hasUnpaidItems = unpaidTasks.length > 0 || consolidatedLabor.length > 0 || unpaidMaterials.length > 0;

    return (
        <div className="p-4 sm:p-6 bg-gray-50">
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <p className="text-sm text-gray-500">Total Unpaid Balance</p>
                    <p className="text-2xl font-bold text-red-600">₱{totalUnpaid.toLocaleString()}</p>
                </div>
                <a
                    href="https://docs.google.com/spreadsheets/create"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-300 text-sm flex items-center justify-center w-full sm:w-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Generate Google Invoice
                </a>
            </div>

            {!hasUnpaidItems ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No unpaid items to invoice.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {consolidatedLabor.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Consolidated Unpaid Labor</h3>
                             {/* Mobile Card View */}
                            <div className="md:hidden space-y-3">
                                {consolidatedLabor.map(item => (
                                    <div key={item.name} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <p className="font-medium text-gray-800">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.dateRange}</p>
                                            </div>
                                            <StatusBadge status="Unpaid" onClick={() => handleToggleConsolidatedLabor(item.entryIds)} />
                                        </div>
                                        <div className="space-y-2 text-sm border-t pt-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Days Worked</span>
                                                <span>{item.daysWorked}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Total Due</span>
                                                <span className="font-semibold text-gray-800">₱{item.totalAmount.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Desktop Table View */}
                            <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto hidden md:block">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-gray-500 bg-gray-50">
                                            <th className="p-3 font-medium">Name</th>
                                            <th className="p-3 font-medium">Date Range</th>
                                            <th className="p-3 font-medium text-center">Days</th>
                                            <th className="p-3 font-medium text-right">Total Due</th>
                                            <th className="p-3 font-medium text-center">Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {consolidatedLabor.map(item => (
                                            <tr key={item.name} className="border-b border-gray-200 last:border-b-0">
                                                <td className="p-3 font-medium text-gray-800">{item.name}</td>
                                                <td className="p-3 text-gray-600">{item.dateRange}</td>
                                                <td className="p-3 text-gray-600 text-center">{item.daysWorked}</td>
                                                <td className="p-3 text-gray-600 text-right">₱{item.totalAmount.toLocaleString()}</td>
                                                <td className="p-3 text-center">
                                                    <StatusBadge status="Unpaid" onClick={() => handleToggleConsolidatedLabor(item.entryIds)} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {unpaidMaterials.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Unpaid Materials</h3>
                             {/* Mobile Card View */}
                            <div className="md:hidden space-y-3">
                                {unpaidMaterials.map(item => (
                                    <div key={`material-card-${item.id}`} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <p className="font-medium text-gray-800">{item.item}</p>
                                                <p className="text-xs text-gray-500">{item.supplier}</p>
                                            </div>
                                            <StatusBadge status={item.paymentStatus} onClick={() => onToggleMaterialPayment(item.id)} />
                                        </div>
                                        <div className="space-y-2 text-sm border-t pt-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Total</span>
                                                <span className="font-semibold text-gray-800">₱{item.total.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Desktop Table View */}
                            <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto hidden md:block">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-gray-500 bg-gray-50">
                                            <th className="p-3 font-medium">Item</th>
                                            <th className="p-3 font-medium">Supplier</th>
                                            <th className="p-3 font-medium text-right">Total</th>
                                            <th className="p-3 font-medium text-center">Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {unpaidMaterials.map(item => (
                                            <tr key={`material-${item.id}`} className="border-b border-gray-200 last:border-b-0">
                                                <td className="p-3 font-medium text-gray-800">
                                                    <div className="flex items-center">
                                                        <span>{item.item}</span>
                                                        {item.imageUrl && (
                                                            <button onClick={() => onToggleMaterialPayment(item.id)} className="ml-2 text-primary hover:text-primary-hover" aria-label="View Image">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-3 text-gray-600">{item.supplier}</td>
                                                <td className="p-3 text-gray-600 text-right">₱{item.total.toLocaleString()}</td>
                                                <td className="p-3 text-center"><StatusBadge status={item.paymentStatus} onClick={() => onToggleMaterialPayment(item.id)} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                     {unpaidTasks.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Unpaid Tasks</h3>
                            {/* Mobile Card View */}
                            <div className="md:hidden space-y-3">
                                {unpaidTasks.map(task => (
                                    <div key={`task-card-${task.id}`} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <p className="font-medium text-gray-800">{task.name}</p>
                                                <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                                            </div>
                                            <StatusBadge status={task.paymentStatus} onClick={() => onToggleTaskPayment(task.id)} />
                                        </div>
                                        <div className="space-y-2 text-sm border-t pt-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Cost</span>
                                                <span className="font-semibold text-gray-800">₱{task.cost.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                             {/* Desktop Table View */}
                            <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto hidden md:block">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-gray-500 bg-gray-50">
                                            <th className="p-3 font-medium">Task</th>
                                            <th className="p-3 font-medium">Due Date</th>
                                            <th className="p-3 font-medium text-right">Cost</th>
                                            <th className="p-3 font-medium text-center">Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {unpaidTasks.map(task => (
                                            <tr key={`task-${task.id}`} className="border-b border-gray-200 last:border-b-0">
                                                <td className="p-3 font-medium text-gray-800">{task.name}</td>
                                                <td className="p-3 text-gray-600">{task.dueDate}</td>
                                                <td className="p-3 text-gray-600 text-right">₱{task.cost.toLocaleString()}</td>
                                                <td className="p-3 text-center"><StatusBadge status={task.paymentStatus} onClick={() => onToggleTaskPayment(task.id)} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const banks = [
    "Asia United Bank Corporation (AUB)",
    "Bank of the Philippine Islands (BPI)",
    "BDO Unibank, Inc.",
    "Cebuana Lhuillier Rural Bank",
    "China Banking Corporation",
    "GoTyme Bank Corporation",
    "Land Bank of The Philippines",
    "Metropolitan Bank and Trust Company (MetroBank)",
    "Philippine National Bank (PNB)",
    "Rizal Commercial Banking Corporation (RCBC)",
    "Security Bank Corporation",
    "Union Bank of the Philippines (UBP)"
];

const wallets = [
    "Coins.ph",
    "GCash (G-Xchange, Inc.)",
    "GrabPay (Gpay Network PH, Inc.)",
    "Maya Philippines, Inc.",
    "PalawanPay (PPS-PEPP Financial Services Corporation)",
    "ShopeePay Philippines, Inc.",
    "Starpay Corporation",
    "USSC Money Services, Inc."
];

const PaymentListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-center text-gray-600">
        <svg className="w-4 h-4 text-primary mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
        <span>{children}</span>
    </li>
);

const CopyableDetail: React.FC<{ label: string; value: string }> = ({ label, value }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div>
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-sm text-gray-900 flex items-center justify-between">
                <span className="font-mono break-all">{value}</span>
                <button
                    onClick={handleCopy}
                    className="ml-2 text-gray-400 hover:text-primary transition-colors p-1 rounded-md flex-shrink-0"
                    aria-label={`Copy ${label}`}
                >
                    {copied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    )}
                </button>
            </dd>
        </div>
    );
};

const DashboardPaymentsView: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 bg-gray-50">
             <div className="grid lg:grid-cols-3 gap-8 md:gap-12 bg-white p-6 rounded-lg border border-gray-200">
                <div className="lg:col-span-1 text-center flex flex-col items-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Scan to Pay Binga Beach</h3>
                    <div className="bg-white p-4 border rounded-lg shadow-sm inline-block">
                         <img 
                            src="https://id-preview--6747c8dc-fab2-4413-8d2e-7d099ccefffb.lovable.app/assets/qr-payment-BlfmHU0J.png" 
                            alt="Binga Beach QR Ph Code" 
                            className="w-64 h-auto mx-auto"
                        />
                    </div>
                    <p className="mt-4 text-gray-500 text-sm">
                        Use our QR Ph code for seamless payments from your preferred bank or e-wallet.
                    </p>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold text-lg text-gray-800 mb-4 pb-2 border-b">
                            Supported Banks
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {banks.map(bank => <PaymentListItem key={bank}>{bank}</PaymentListItem>)}
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg text-gray-800 mb-4 pb-2 border-b">
                            Supported E-Wallets
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {wallets.map(wallet => <PaymentListItem key={wallet}>{wallet}</PaymentListItem>)}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b">Wire Transfer / Direct Deposit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                        <h4 className="font-semibold text-lg text-gray-800 mb-4">Beneficiary Information</h4>
                        <dl className="space-y-4">
                            <CopyableDetail label="Beneficiary Name" value="DAVID LE SMITH" />
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Beneficiary Address</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    LOT 3947E, BRGY OF BINGA SAN VICENTE, PALAWAN, PHILIPPINES
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg text-gray-800 mb-4">Bank Information</h4>
                        <dl className="space-y-4">
                            <CopyableDetail label="Account Number" value="200033527291" />
                            <CopyableDetail label="Bank Name" value="EAST WEST BANKING CORPORATION" />
                            <CopyableDetail label="SWIFT Code" value="EWBCPHMM" />
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Bank Address</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    5TH AVE CNR, 23RD ST, BONIFACIO GLO TAGUIG CITY LUZ 1634, PHILIPPINES
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Pay with PayPal</h3>
                <p className="text-sm text-gray-500 mb-6">Click the button below to pay securely with your PayPal account or a credit/debit card.</p>
                <a
                    href="https://paypal.me/bingabeachbrothers?locale.x=en_US&country.x=PH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-[#00457C] hover:bg-[#003057] text-white font-semibold py-3 px-6 rounded-lg shadow-sm transition-colors duration-300"
                    aria-label="Pay with PayPal"
                >
                    Pay with PayPal
                </a>
            </div>
        </div>
    )
};


interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (taskData: Omit<Task, 'id' | 'cost'>) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState<TaskStatus>('Backlog');
    const [type, setType] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [notes, setNotes] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = () => {
        if (!name || !dueDate) {
            alert('Task name and due date are required.');
            return;
        }
        onAddTask({ name, status, type, dueDate, notes, imageUrl, paymentStatus: 'Unpaid' });
        // Reset and close
        setName('');
        setStatus('Backlog');
        setType('');
        setDueDate('');
        setNotes('');
        setImageUrl('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
            <div className="space-y-4 text-sm">
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Task Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Status</label>
                        <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-primary focus:border-primary text-gray-900">
                            <option>Backlog</option>
                            <option>In Progress</option>
                            <option>Done</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Due Date</label>
                        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                </div>
                <div>
                     <label className="block font-medium text-gray-700 mb-1">Type/Category</label>
                    <input type="text" value={type} onChange={e => setType(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Notes</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                <div className="flex justify-end items-center space-x-3 pt-4 border-t mt-6">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSubmit} className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover">Add Task</button>
                </div>
            </div>
        </Modal>
    )
};

interface AddLaborModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddLabor: (laborData: Omit<Labor, 'id'>) => void;
}

const AddLaborModal: React.FC<AddLaborModalProps> = ({ isOpen, onClose, onAddLabor }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [hours, setHours] = useState(0);
    const [total, setTotal] = useState(0);

    const handleSubmit = () => {
        if (!name || !date || total <= 0) {
            alert('Name, date, and a valid total are required.');
            return;
        }
        onAddLabor({ name, description, date, hours, total, paymentStatus: 'Unpaid' });
        // Reset and close
        setName('');
        setDescription('');
        setDate('');
        setHours(0);
        setTotal(0);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Labor Entry">
            <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                </div>
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Description</label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Hours Worked</label>
                        <input type="number" value={hours} onChange={e => setHours(Number(e.target.value))} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Total Pay (₱)</label>
                        <input type="number" value={total} onChange={e => setTotal(Number(e.target.value))} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                </div>
                <div className="flex justify-end items-center space-x-3 pt-4 border-t mt-6">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSubmit} className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover">Add Labor</button>
                </div>
            </div>
        </Modal>
    );
};

interface AddMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMaterial: (materialData: Omit<Material, 'id'>) => void;
}

const AddMaterialModal: React.FC<AddMaterialModalProps> = ({ isOpen, onClose, onAddMaterial }) => {
    const [item, setItem] = useState('');
    const [supplier, setSupplier] = useState('');
    const [total, setTotal] = useState(0);
    const [notes, setNotes] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = () => {
        if (!item || total <= 0) {
            alert('Item name and a valid total are required.');
            return;
        }
        onAddMaterial({ item, supplier, total, paymentStatus: 'Unpaid', notes, imageUrl });
        // Reset and close
        setItem('');
        setSupplier('');
        setTotal(0);
        setNotes('');
        setImageUrl('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Material Entry">
            <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Item Name</label>
                        <input type="text" value={item} onChange={e => setItem(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Supplier</label>
                        <input type="text" value={supplier} onChange={e => setSupplier(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                </div>
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Total Cost (₱)</label>
                    <input type="number" value={total} onChange={e => setTotal(Number(e.target.value))} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                 <div>
                    <label className="block font-medium text-gray-700 mb-1">Google Images URL (Optional)</label>
                    <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Notes</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                <div className="flex justify-end items-center space-x-3 pt-4 border-t mt-6">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSubmit} className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover">Add Material</button>
                </div>
            </div>
        </Modal>
    );
};


interface EditLaborModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (item: Labor) => void;
    laborItem: Labor | null;
}

const EditLaborModal: React.FC<EditLaborModalProps> = ({ isOpen, onClose, onUpdate, laborItem }) => {
    const [item, setItem] = useState<Labor | null>(laborItem);
    
    useEffect(() => {
        setItem(laborItem);
    }, [laborItem]);

    if (!isOpen || !item) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setItem(prev => prev ? { ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value } : null);
    };

    const handleSubmit = () => {
        if(item) {
            onUpdate(item);
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Edit Labor: ${item.name}`}>
            <div className="space-y-4 text-sm">
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" name="date" value={item.date} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                         <label className="block font-medium text-gray-700 mb-1">Hours</label>
                        <input type="number" name="hours" value={item.hours} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                    <div>
                         <label className="block font-medium text-gray-700 mb-1">Total Pay (₱)</label>
                        <input type="number" name="total" value={item.total} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                </div>
                 <div className="flex justify-end items-center space-x-3 pt-4 border-t mt-6">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSubmit} className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover">Save Changes</button>
                </div>
            </div>
        </Modal>
    );
};

interface EditMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (item: Material) => void;
    materialItem: Material | null;
}

const EditMaterialModal: React.FC<EditMaterialModalProps> = ({ isOpen, onClose, onUpdate, materialItem }) => {
    const [item, setItem] = useState<Material | null>(materialItem);
    
    useEffect(() => {
        setItem(materialItem);
    }, [materialItem]);

    if (!isOpen || !item) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const isNumber = e.target.type === 'number';
        setItem(prev => prev ? { ...prev, [name]: isNumber ? parseFloat(value) || 0 : value } : null);
    };

    const handleSubmit = () => {
        if(item) {
            onUpdate(item);
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Edit Material: ${item.item}`}>
             <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Item Name</label>
                        <input type="text" name="item" value={item.item} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Supplier</label>
                        <input type="text" name="supplier" value={item.supplier} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                </div>
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Total Cost (₱)</label>
                    <input type="number" name="total" value={item.total} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                 <div>
                    <label className="block font-medium text-gray-700 mb-1">Google Images URL (Optional)</label>
                    <input type="url" name="imageUrl" value={item.imageUrl || ''} onChange={handleChange} placeholder="https://..." className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Notes</label>
                    <textarea name="notes" value={item.notes} onChange={handleChange} rows={3} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                <div className="flex justify-end items-center space-x-3 pt-4 border-t mt-6">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSubmit} className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover">Save Changes</button>
                </div>
            </div>
        </Modal>
    );
};

const ImagePreviewModal: React.FC<{ isOpen: boolean; onClose: () => void; imageUrl: string | null; }> = ({ isOpen, onClose, imageUrl }) => {
    if (!imageUrl) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Image Preview" size="2xl">
            <div className="flex justify-center items-center">
                <img src={imageUrl} alt="Material Preview" className="max-w-full max-h-[80vh] rounded-lg object-contain" />
            </div>
        </Modal>
    );
};

type ViewType = 'Tasks' | 'Labor' | 'Materials' | 'Invoices' | 'Payments';

interface ProjectViewProps {
    projectName: string;
    tasks: Task[];
    labor: Labor[];
    materials: Material[];
    invoices: Invoice[];
    onToggleTaskStatus: (id: number) => void;
    onToggleTaskPayment: (id: number) => void;
    onAddTask: (taskData: Omit<Task, 'id' | 'cost'>) => void;
    onDeleteTask: (id: number) => void;
    onToggleLaborPayment: (id: number) => void;
    onUpdateLabor: (item: Labor) => void;
    onDeleteLabor: (id: number) => void;
    onAddLabor: (laborData: Omit<Labor, 'id'>) => void;
    onToggleMaterialPayment: (id: number) => void;
    onDeleteMaterial: (id: number) => void;
    onAddMaterial: (materialData: Omit<Material, 'id'>) => void;
    onUpdateMaterial: (item: Material) => void;
}

export const ProjectView: React.FC<ProjectViewProps> = ({
    tasks,
    labor,
    materials,
    invoices,
    onToggleTaskStatus,
    onToggleTaskPayment,
    onAddTask,
    onDeleteTask,
    onToggleLaborPayment,
    onUpdateLabor,
    onDeleteLabor,
    onAddLabor,
    onToggleMaterialPayment,
    onDeleteMaterial,
    onAddMaterial,
    onUpdateMaterial,
}) => {
    const [activeView, setActiveView] = useState<ViewType>('Invoices');
    const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
    const [isAddLaborModalOpen, setAddLaborModalOpen] = useState(false);
    const [isAddMaterialModalOpen, setAddMaterialModalOpen] = useState(false);
    const [editingLabor, setEditingLabor] = useState<Labor | null>(null);
    const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
    const [viewingImageUrl, setViewingImageUrl] = useState<string | null>(null);

    const unpaidItemsCount = useMemo(() => {
        const unpaidTasks = tasks.filter(t => t.paymentStatus === 'Unpaid' && t.cost > 0).length;
        const unpaidLabor = labor.filter(l => l.paymentStatus === 'Unpaid' && l.total > 0).length;
        const unpaidMaterials = materials.filter(m => m.paymentStatus === 'Unpaid' && m.total > 0).length;
        return unpaidTasks + unpaidLabor + unpaidMaterials;
    }, [tasks, labor, materials]);

    const tabs: { name: ViewType; count?: number }[] = [
        { name: 'Tasks', count: tasks.length },
        { name: 'Labor', count: labor.length },
        { name: 'Materials', count: materials.length },
        { name: 'Invoices', count: unpaidItemsCount },
        { name: 'Payments' },
    ];

    return (
        <main className="flex-1 overflow-y-auto bg-gray-100">
            <div className="p-4 sm:p-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border-b gap-4">
                        <div className="flex flex-wrap sm:flex-nowrap border-b sm:border-b-0 -mx-4 px-4 sm:m-0 sm:p-0 sm:overflow-x-auto">
                             {tabs.map(tab => (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveView(tab.name)}
                                    className={`px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeView === tab.name ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                                >
                                    {tab.name} {typeof tab.count !== 'undefined' && <span className="ml-1.5 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">{tab.count}</span>}
                                </button>
                            ))}
                        </div>
                        {activeView === 'Tasks' && (
                            <button onClick={() => setAddTaskModalOpen(true)} className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-300 text-sm flex items-center justify-center sm:w-auto w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                Add Task
                            </button>
                        )}
                        {activeView === 'Labor' && (
                            <button onClick={() => setAddLaborModalOpen(true)} className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-300 text-sm flex items-center justify-center sm:w-auto w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                Add Labor
                            </button>
                        )}
                        {activeView === 'Materials' && (
                            <button onClick={() => setAddMaterialModalOpen(true)} className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-300 text-sm flex items-center justify-center sm:w-auto w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                Add Material
                            </button>
                        )}
                    </div>
                    <div>
                        {activeView === 'Tasks' && <TasksView tasks={tasks} onTogglePayment={onToggleTaskPayment} onDelete={onDeleteTask} onToggleStatus={onToggleTaskStatus} />}
                        {activeView === 'Labor' && <LaborView labor={labor} onTogglePayment={onToggleLaborPayment} onEdit={setEditingLabor} onDelete={onDeleteLabor} />}
                        {activeView === 'Materials' && <MaterialsView materials={materials} onTogglePayment={onToggleMaterialPayment} onDelete={onDeleteMaterial} onEdit={setEditingMaterial} onViewImage={setViewingImageUrl} />}
                        {activeView === 'Invoices' && <InvoicesView 
                                tasks={tasks}
                                labor={labor}
                                materials={materials}
                                onToggleTaskPayment={onToggleTaskPayment}
                                onToggleLaborPayment={onToggleLaborPayment}
                                onToggleMaterialPayment={onToggleMaterialPayment}
                            />}
                        {activeView === 'Payments' && <DashboardPaymentsView />}
                    </div>
                </div>
            </div>
            <AddTaskModal
                isOpen={isAddTaskModalOpen}
                onClose={() => setAddTaskModalOpen(false)}
                onAddTask={onAddTask}
            />
            <AddLaborModal
                isOpen={isAddLaborModalOpen}
                onClose={() => setAddLaborModalOpen(false)}
                onAddLabor={onAddLabor}
            />
            <AddMaterialModal
                isOpen={isAddMaterialModalOpen}
                onClose={() => setAddMaterialModalOpen(false)}
                onAddMaterial={onAddMaterial}
            />
            <EditLaborModal
                isOpen={!!editingLabor}
                onClose={() => setEditingLabor(null)}
                laborItem={editingLabor}
                onUpdate={onUpdateLabor}
            />
            <EditMaterialModal
                isOpen={!!editingMaterial}
                onClose={() => setEditingMaterial(null)}
                materialItem={editingMaterial}
                onUpdate={onUpdateMaterial}
            />
            <ImagePreviewModal
                isOpen={!!viewingImageUrl}
                onClose={() => setViewingImageUrl(null)}
                imageUrl={viewingImageUrl}
            />
        </main>
    );
};