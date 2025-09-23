
import React from 'react';

const materials = [
    { id: 1, name: 'Cement Bags (50kg)', quantity: 200, supplier: 'Palawan Builders', cost: '₱50,000', status: 'Ordered' },
    { id: 2, name: 'Rebar (10mm)', quantity: 500, supplier: 'Manila Steel Co.', cost: '₱150,000', status: 'Delivered' },
    { id: 3, name: 'Solar Panels (300W)', quantity: 30, supplier: 'Eco Power PH', cost: '₱300,000', status: 'Pending' },
    { id: 4, name: 'Narra Wood Planks', quantity: 100, supplier: 'Local Cooperative', cost: '₱80,000', status: 'Delivered' },
    { id: 5, name: 'Roofing Sheets', quantity: 150, supplier: 'Palawan Builders', cost: '₱75,000', status: 'Ordered' },
];

const statusColors: { [key: string]: string } = {
    'Ordered': 'bg-blue-100 text-blue-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Delivered': 'bg-green-100 text-green-800',
};

const MaterialsView: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Material Management</h1>
                <button className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Order Material
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {materials.map((material) => (
                            <tr key={material.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.supplier}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.cost}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[material.status]}`}>
                                        {material.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MaterialsView;
