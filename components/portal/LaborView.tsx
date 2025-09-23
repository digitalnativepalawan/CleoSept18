
import React from 'react';

const labor = [
    { id: 1, name: 'Juan Dela Cruz', role: 'Foreman', hours: 40, rate: '₱150/hr', total: '₱6,000' },
    { id: 2, name: 'Maria Santos', role: 'Carpenter', hours: 35, rate: '₱120/hr', total: '₱4,200' },
    { id: 3, name: 'Pedro Reyes', role: 'Electrician', hours: 20, rate: '₱180/hr', total: '₱3,600' },
    { id: 4, name: 'Jose Rizal', role: 'General Labor', hours: 45, rate: '₱100/hr', total: '₱4,500' },
    { id: 5, name: 'Ana Bonifacio', role: 'Plumber', hours: 15, rate: '₱160/hr', total: '₱2,400' },
];

const LaborView: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Labor Tracking</h1>
                <button className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Worker
                </button>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours (Weekly)</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Pay</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {labor.map((worker) => (
                            <tr key={worker.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{worker.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.hours}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.rate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{worker.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LaborView;
