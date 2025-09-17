

import React, { useState, useEffect, useMemo } from 'react';
import Modal from '../common/Modal';

export type PaymentStatus = 'Paid' | 'Unpaid';
export type CompletionStatus = 'Done' | 'In Progress';

export interface Task {
    id: number;
    name: string;
    completionStatus: CompletionStatus;
    dueDate: string;
    cost: number;
    paymentStatus: PaymentStatus;
}
export interface Labor {
    id: number;
    name: string;
    description: string;
    date: string;
    hours: number;
    total: number;
    status: PaymentStatus;
}
export interface Material {
    id: number;
    item: string;
    supplier: string;
    total: number;
    status: PaymentStatus;
    notes: string;
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


type Status = CompletionStatus | PaymentStatus;

const StatusBadge: React.FC<{ status: Status, onClick?: () => void }> = ({ status, onClick }) => {
    const statusClasses = {
        'Done': 'bg-green-100 text-green-800',
        'In Progress': 'bg-blue-100 text-blue-800',
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
    onToggleCompletion: (id: number) => void;
}

const TasksView: React.FC<TasksViewProps> = ({ tasks, onTogglePayment, onToggleCompletion }) => {
    const { items: sortedTasks, requestSort, sortConfig } = useSortableData<Task>(tasks, { key: 'dueDate', direction: 'ascending' });

    return (
        <>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3 p-4 bg-gray-50 sm:bg-transparent sm:p-0">
                {sortedTasks.map((task) => (
                    <div key={task.id} className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm ${task.completionStatus === 'Done' ? 'opacity-70' : ''}`}>
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start flex-1 min-w-0">
                                <input
                                    type="checkbox"
                                    checked={task.completionStatus === 'Done'}
                                    onChange={() => onToggleCompletion(task.id)}
                                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer mt-0.5 flex-shrink-0"
                                    aria-label={`Mark task ${task.name} as ${task.completionStatus === 'Done' ? 'not done' : 'done'}`}
                                />
                                <span className={`font-medium text-gray-800 ml-3 truncate ${task.completionStatus === 'Done' ? 'line-through text-gray-500' : ''}`}>{task.name}</span>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm border-t pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Status</span>
                                <StatusBadge status={task.completionStatus} />
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
                            <th className="p-3 w-12 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </th>
                            <th className="p-3 font-medium">
                                <button onClick={() => requestSort('name')} className="flex items-center group">Task <SortIndicator sortConfig={sortConfig} sortKey="name" /></button>
                            </th>
                            <th className="p-3 font-medium">
                                <button onClick={() => requestSort('completionStatus')} className="flex items-center group">Status <SortIndicator sortConfig={sortConfig} sortKey="completionStatus" /></button>
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
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.map((task) => (
                            <tr key={task.id} className={`border-b border-gray-200 bg-white transition-all ${task.completionStatus === 'Done' ? 'opacity-60' : ''}`}>
                                 <td className="p-3 text-center">
                                    <input
                                        type="checkbox"
                                        checked={task.completionStatus === 'Done'}
                                        onChange={() => onToggleCompletion(task.id)}
                                        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                        aria-label={`Mark task ${task.name} as ${task.completionStatus === 'Done' ? 'not done' : 'done'}`}
                                    />
                                </td>
                                <td className={`p-3 text-gray-800 font-medium transition-colors ${task.completionStatus === 'Done' ? 'line-through text-gray-500' : ''}`}>{task.name}</td>
                                <td className="p-3"><StatusBadge status={task.completionStatus} /></td>
                                <td className="p-3"><StatusBadge status={task.paymentStatus} onClick={() => onTogglePayment(task.id)} /></td>
                                <td className="p-3 text-gray-600">{task.dueDate}</td>
                                <td className="p-3 text-gray-600 text-right">₱{task.cost.toLocaleString()}</td>
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
}

const LaborView: React.FC<LaborViewProps> = ({ labor, onTogglePayment }) => {
    const { items: sortedLabor, requestSort, sortConfig } = useSortableData<Labor>(labor, { key: 'date', direction: 'descending' });
    return (
        <>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3 p-4 bg-gray-50 sm:bg-transparent sm:p-0">
                {sortedLabor.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="mb-3">
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
                                <StatusBadge status={item.status} onClick={() => onTogglePayment(item.id)}/>
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
                                 <button onClick={() => requestSort('status')} className="flex items-center group">Status <SortIndicator sortConfig={sortConfig} sortKey="status" /></button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedLabor.map((item) => (
                            <tr key={item.id} className="border-b border-gray-200 bg-white">
                                <td className="p-3">
                                    <div className="font-medium text-gray-800">{item.name}</div>
                                    <div className="text-gray-500 text-xs">{item.description}</div>
                                </td>
                                <td className="p-3 text-gray-600">{item.date}</td>
                                <td className="p-3 text-gray-600 text-right">{item.hours}</td>
                                <td className="p-3 text-gray-600 text-right">₱{item.total.toLocaleString()}</td>
                                <td className="p-3"><StatusBadge status={item.status} onClick={() => onTogglePayment(item.id)}/></td>
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
}
const MaterialsView: React.FC<MaterialsViewProps> = ({ materials, onTogglePayment }) => {
    const { items: sortedMaterials, requestSort, sortConfig } = useSortableData<Material>(materials);
    return (
        <>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3 p-4 bg-gray-50 sm:bg-transparent sm:p-0">
                {sortedMaterials.map((material) => (
                    <div key={material.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <p className="font-medium text-gray-800 mb-3 truncate">{material.item}</p>
                        <div className="space-y-2 text-sm border-t pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Supplier</span>
                                <span className="text-gray-700 truncate">{material.supplier}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Total</span>
                                <span className="text-gray-800 font-semibold">₱{material.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Status</span>
                                <StatusBadge status={material.status} onClick={() => onTogglePayment(material.id)} />
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
                                <button onClick={() => requestSort('item')} className="flex items-center group">Item <SortIndicator sortConfig={sortConfig} sortKey="item" /></button>
                            </th>
                            <th className="p-3 font-medium">
                                <button onClick={() => requestSort('supplier')} className="flex items-center group">Supplier <SortIndicator sortConfig={sortConfig} sortKey="supplier" /></button>
                            </th>
                            <th className="p-3 font-medium text-right">
                                 <button onClick={() => requestSort('total')} className="flex items-center ml-auto group">Total <SortIndicator sortConfig={sortConfig} sortKey="total" /></button>
                            </th>
                            <th className="p-3 font-medium">
                                 <button onClick={() => requestSort('status')} className="flex items-center group">Status <SortIndicator sortConfig={sortConfig} sortKey="status" /></button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedMaterials.map((material) => (
                            <tr key={material.id} className="border-b border-gray-200 bg-white">
                                <td className="p-3 font-medium text-gray-800">{material.item}</td>
                                <td className="p-3 text-gray-600">{material.supplier}</td>
                                <td className="p-3 text-gray-600 text-right">₱{material.total.toLocaleString()}</td>
                                <td className="p-3"><StatusBadge status={material.status} onClick={() => onTogglePayment(material.id)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

interface InvoicesViewProps {
    invoices: Invoice[];
    onTogglePayment: (id: number) => void;
}
const InvoicesView: React.FC<InvoicesViewProps> = ({ invoices, onTogglePayment }) => {
    const { items: sortedInvoices, requestSort, sortConfig } = useSortableData<Invoice>(invoices, { key: 'dueDate', direction: 'ascending' });
    return (
        <>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3 p-4 bg-gray-50 sm:bg-transparent sm:p-0">
                {sortedInvoices.map((invoice) => (
                    <div key={invoice.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <p className="font-medium text-gray-800 truncate">{invoice.invoiceNumber}</p>
                            {invoice.link ? (
                                <a href={invoice.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center flex-shrink-0 ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                            ) : null}
                        </div>
                        <div className="space-y-2 text-sm border-t pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Supplier</span>
                                <span className="text-gray-700 truncate">{invoice.supplier}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Due Date</span>
                                <span className="text-gray-700">{invoice.dueDate}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Total</span>
                                <span className="text-gray-800 font-semibold">₱{invoice.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Status</span>
                                <StatusBadge status={invoice.status} onClick={() => onTogglePayment(invoice.id)} />
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
                                <button onClick={() => requestSort('invoiceNumber')} className="flex items-center group">Invoice # <SortIndicator sortConfig={sortConfig} sortKey="invoiceNumber" /></button>
                            </th>
                            <th className="p-3 font-medium">
                                <button onClick={() => requestSort('supplier')} className="flex items-center group">Supplier <SortIndicator sortConfig={sortConfig} sortKey="supplier" /></button>
                            </th>
                            <th className="p-3 font-medium">
                                <button onClick={() => requestSort('dueDate')} className="flex items-center group">Due Date <SortIndicator sortConfig={sortConfig} sortKey="dueDate" /></button>
                            </th>
                            <th className="p-3 font-medium text-right">
                                <button onClick={() => requestSort('total')} className="flex items-center ml-auto group">Total <SortIndicator sortConfig={sortConfig} sortKey="total" /></button>
                            </th>
                            <th className="p-3 font-medium">
                                <button onClick={() => requestSort('status')} className="flex items-center group">Status <SortIndicator sortConfig={sortConfig} sortKey="status" /></button>
                            </th>
                            <th className="p-3 font-medium text-center">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedInvoices.map((invoice) => (
                            <tr key={invoice.id} className="border-b border-gray-200 bg-white">
                                <td className="p-3 font-medium text-gray-800">{invoice.invoiceNumber}</td>
                                <td className="p-3 text-gray-600">{invoice.supplier}</td>
                                <td className="p-3 text-gray-600">{invoice.dueDate}</td>
                                <td className="p-3 text-gray-600 text-right">₱{invoice.total.toLocaleString()}</td>
                                <td className="p-3"><StatusBadge status={invoice.status} onClick={() => onTogglePayment(invoice.id)} /></td>
                                <td className="p-3 text-center">
                                    {invoice.link ? (
                                        <a href={invoice.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};


const AddMaterialModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [unitCost, setUnitCost] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        setTotalCost(quantity * unitCost);
    }, [quantity, unitCost]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Material">
            <div className="space-y-4 text-sm">
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Receipt Link (Google Drive URL)</label>
                    <input type="url" placeholder="https://drive.google.com/..." className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    <p className="mt-2 text-xs text-gray-500 flex items-start">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span>Paste a shared Google Drive link to the photo/PDF of the receipt. This link will be stored in the item's notes (e.g., Receipt: https://drive.google.com/...).</span>
                    </p>
                     <p className="mt-2 text-xs text-gray-500">Then fill in the item details below</p>
                </div>
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Item Name</label>
                    <input type="text" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <label className="block font-medium text-gray-700 mb-1">Category</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-primary focus:border-primary text-gray-900">
                            <option>Other</option>
                            <option>Paint</option>
                            <option>Tools</option>
                            <option>Hardware</option>
                        </select>
                    </div>
                     <div>
                        <label className="block font-medium text-gray-700 mb-1">Supplier</label>
                        <input type="text" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     <div>
                        <label className="block font-medium text-gray-700 mb-1">Quantity</label>
                        <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value) || 0)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                     <div>
                        <label className="block font-medium text-gray-700 mb-1">Unit Cost (₱)</label>
                        <input type="number" value={unitCost} onChange={e => setUnitCost(Number(e.target.value) || 0)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                     <div>
                        <label className="block font-medium text-gray-700 mb-1">Total Cost (₱)</label>
                        <input type="number" value={totalCost} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900" />
                    </div>
                </div>
                 <div>
                    <label className="block font-medium text-gray-700 mb-1">Notes</label>
                    <textarea rows={3} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900"></textarea>
                </div>
                <div className="flex justify-end items-center space-x-3 pt-4 border-t mt-6">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={onClose} className="px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">Save</button>
                </div>
            </div>
        </Modal>
    );
};

const AddTaskModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Task">
            <div className="space-y-4 text-sm">
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Task Name</label>
                    <input type="text" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <label className="block font-medium text-gray-700 mb-1">Due Date</label>
                        <input type="date" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                     <div>
                        <label className="block font-medium text-gray-700 mb-1">Cost (₱)</label>
                        <input type="number" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                </div>
                <div className="flex justify-end items-center space-x-3 pt-4 border-t mt-6">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={onClose} className="px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">Save</button>
                </div>
            </div>
        </Modal>
    );
};

const AddLaborModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Labor">
            <div className="space-y-4 text-sm">
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Name</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-primary focus:border-primary text-gray-900">
                        <option>JR</option>
                        <option>Leo</option>
                        <option>Jery</option>
                        <option>Ramil</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Description</label>
                    <input type="text" defaultValue="General Labor" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     <div>
                        <label className="block font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                     <div>
                        <label className="block font-medium text-gray-700 mb-1">Hours</label>
                        <input type="number" defaultValue="8" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                     <div>
                        <label className="block font-medium text-gray-700 mb-1">Total (₱)</label>
                        <input type="number" defaultValue="625" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                </div>
                <div className="flex justify-end items-center space-x-3 pt-4 border-t mt-6">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={onClose} className="px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">Save</button>
                </div>
            </div>
        </Modal>
    );
};

const AddInvoiceModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Invoice">
             <div className="space-y-4 text-sm">
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Invoice Link (Google Drive URL)</label>
                    <input type="url" placeholder="https://drive.google.com/..." className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                     <p className="mt-2 text-xs text-gray-500">Paste a shared link to the invoice PDF/photo.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <label className="block font-medium text-gray-700 mb-1">Invoice Number</label>
                        <input type="text" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                     <div>
                        <label className="block font-medium text-gray-700 mb-1">Supplier</label>
                        <input type="text" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <label className="block font-medium text-gray-700 mb-1">Due Date</label>
                        <input type="date" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                     <div>
                        <label className="block font-medium text-gray-700 mb-1">Total (₱)</label>
                        <input type="number" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                </div>
                <div className="flex justify-end items-center space-x-3 pt-4 border-t mt-6">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={onClose} className="px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">Save</button>
                </div>
            </div>
        </Modal>
    );
};

interface ProjectViewProps {
    projectName: string;
    tasks: Task[];
    labor: Labor[];
    materials: Material[];
    invoices: Invoice[];
    onToggleTaskPayment: (id: number) => void;
    onToggleTaskCompletion: (id: number) => void;
    onToggleLaborPayment: (id: number) => void;
    onToggleMaterialPayment: (id: number) => void;
    onToggleInvoicePayment: (id: number) => void;
}

export const ProjectView: React.FC<ProjectViewProps> = ({
    projectName,
    tasks,
    labor,
    materials,
    invoices,
    onToggleTaskPayment,
    onToggleTaskCompletion,
    onToggleLaborPayment,
    onToggleMaterialPayment,
    onToggleInvoicePayment,
}) => {
    const [activeTab, setActiveTab] = useState('Tasks');
    const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
    const [isAddLaborModalOpen, setAddLaborModalOpen] = useState(false);
    const [isAddMaterialModalOpen, setAddMaterialModalOpen] = useState(false);
    const [isAddInvoiceModalOpen, setAddInvoiceModalOpen] = useState(false);

    const tabs = ['Tasks', 'Labor', 'Materials', 'Invoices'];

    const tabContent = useMemo(() => {
        switch (activeTab) {
            case 'Tasks':
                return <TasksView tasks={tasks} onTogglePayment={onToggleTaskPayment} onToggleCompletion={onToggleTaskCompletion} />;
            case 'Labor':
                return <LaborView labor={labor} onTogglePayment={onToggleLaborPayment} />;
            case 'Materials':
                return <MaterialsView materials={materials} onTogglePayment={onToggleMaterialPayment} />;
            case 'Invoices':
                return <InvoicesView invoices={invoices} onTogglePayment={onToggleInvoicePayment} />;
            default:
                return null;
        }
    }, [activeTab, tasks, labor, materials, invoices, onToggleTaskPayment, onToggleTaskCompletion, onToggleLaborPayment, onToggleMaterialPayment, onToggleInvoicePayment]);
    
    const openAddModal = () => {
        switch (activeTab) {
            case 'Tasks': setAddTaskModalOpen(true); break;
            case 'Labor': setAddLaborModalOpen(true); break;
            case 'Materials': setAddMaterialModalOpen(true); break;
            case 'Invoices': setAddInvoiceModalOpen(true); break;
        }
    };

    return (
        <main className="flex-1 overflow-y-auto bg-gray-100">
            <div className="p-4 sm:p-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border-b gap-4">
                        <nav className="flex space-x-1 overflow-x-auto -mx-4 px-4 sm:overflow-visible sm:mx-0 sm:px-0">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-sm font-medium rounded-md flex-shrink-0 ${activeTab === tab ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                        <button onClick={openAddModal} className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-300 text-sm flex items-center justify-center sm:w-auto w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            Add {activeTab.slice(0, -1)}
                        </button>
                    </div>
                    {tabContent}
                </div>
            </div>
            
            <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setAddTaskModalOpen(false)} />
            <AddLaborModal isOpen={isAddLaborModalOpen} onClose={() => setAddLaborModalOpen(false)} />
            <AddMaterialModal isOpen={isAddMaterialModalOpen} onClose={() => setAddMaterialModalOpen(false)} />
            <AddInvoiceModal isOpen={isAddInvoiceModalOpen} onClose={() => setAddInvoiceModalOpen(false)} />
        </main>
    );
};