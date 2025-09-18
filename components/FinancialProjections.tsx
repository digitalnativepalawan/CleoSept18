
import React from 'react';
import Section from './Section';
import Card from './Card';
import UiIcon from './UiIcon';

const KPICard: React.FC<{ value: React.ReactNode; label: string; sublabel: string; }> = ({ value, label, sublabel }) => (
    <Card className="!p-6 text-center">
        <div className="text-3xl font-bold text-primary flex items-center justify-center gap-2 h-10">
            {value}
        </div>
        <div className="text-gray-800 font-medium mt-3">{label}</div>
        <div className="text-gray-500 text-sm mt-1">{sublabel}</div>
    </Card>
);

const initialRevenueData = [
    { year: 2026, hospitality: "₱17.0M", hardware: "₱8.0M", farming: "₱1.5M", other: "₱1.0M", total: "₱27.5M" },
    { year: 2027, hospitality: "₱54.0M", hardware: "₱20.0M", farming: "₱4.0M", other: "₱2.0M", total: "₱80.0M" },
    { year: 2028, hospitality: "₱98.0M", hardware: "₱37.0M", farming: "₱8.0M", other: "₱5.5M", total: "₱148.5M" },
    { year: 2029, hospitality: "₱125.0M", hardware: "₱48.0M", farming: "₱10.0M", other: "₱7.0M", total: "₱190.0M" },
    { year: 2030, hospitality: "₱145.0M", hardware: "₱55.0M", farming: "₱12.0M", other: "₱8.0M", total: "₱220.0M" },
];

const initialExpansionData = [
    { year: 2026, cumulative: 5, new: 5, stabilized: "60%", adr: "₱12.0k" },
    { year: 2027, cumulative: 20, new: 15, stabilized: "66%", adr: "₱12.6k" },
    { year: 2028, cumulative: 35, new: 15, stabilized: "70%", adr: "₱13.2k" },
    { year: 2029, cumulative: 50, new: 15, stabilized: "70%", adr: "₱13.9k" },
    { year: 2030, cumulative: 65, new: 15, stabilized: "72%", adr: "₱14.6k" },
];

const FinancialProjections: React.FC = () => {
    return (
        <Section title="Financial Projections" subtitle="Scalable, resilient growth model with strong underlying assets.">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 grid-gap-md">
                <KPICard value="70%" label="Target Occupancy" sublabel="Year 3 Average" />
                <KPICard value={"₱12.0k"} label="Average Daily Rate" sublabel="Peak Season Estimate" />
                <KPICard value="30-35%" label="EBITDA Margin" sublabel="Projected at Maturity" />
                <KPICard 
                    value="18-20%" 
                    label="Investor IRR" 
                    sublabel="Illustrative Base Case"
                />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 grid-gap-md">
                <Card>
                    <h3 className="font-semibold mb-1">Projected Revenue Growth</h3>
                    <p className="text-sm text-gray-500 mb-4">Illustrative base case. Figures exclude VAT; rounded.</p>
                    <table className="w-full text-xs md:text-sm text-left table-fixed">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="p-2 md:p-3 font-medium text-gray-500 w-[15%]">Year</th>
                                <th className="p-2 md:p-3 font-medium text-gray-500 w-[18%]">Hospitality</th>
                                <th className="p-2 md:p-3 font-medium text-gray-500 w-[18%]">Hardware</th>
                                <th className="p-2 md:p-3 font-medium text-gray-500 w-[17%]">Farming</th>
                                <th className="p-2 md:p-3 font-medium text-gray-500 w-[12%]">Other</th>
                                <th className="p-2 md:p-3 font-medium text-gray-500 text-right w-[20%]">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initialRevenueData.map((row) => (
                                <tr key={row.year} className="border-t border-gray-200">
                                    <td className="p-2 md:p-3 text-gray-700">{row.year}</td>
                                    <td className="p-2 md:p-3 text-gray-700 text-right">{row.hospitality}</td>
                                    <td className="p-2 md:p-3 text-gray-700 text-right">{row.hardware}</td>
                                    <td className="p-2 md:p-3 text-gray-700 text-right">{row.farming}</td>
                                    <td className="p-2 md:p-3 text-gray-700 text-right">{row.other}</td>
                                    <td className="p-2 md:p-3 font-bold text-gray-800 text-right">{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm">
                       <span className="bg-blue-100/70 text-blue-800 font-medium px-3 py-1.5 rounded-lg">Revenue CAGR ('26-'30)</span>
                       <span className="text-green-600 font-bold">≈ 15-20%</span>
                    </div>
                </Card>
                <Card>
                    <h3 className="font-semibold mb-1">Eco-Villa Expansion Plan</h3>
                    <p className="text-sm text-gray-500 mb-4">Cumulative units developed and annual adds.</p>
                     <table className="w-full text-xs md:text-sm text-left table-fixed">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="p-2 md:p-3 font-medium text-gray-500 w-[15%]">Year</th>
                                <th className="p-2 md:p-3 font-medium text-gray-500 w-[25%]">Cumulative Villas</th>
                                <th className="p-2 md:p-3 font-medium text-gray-500 w-[20%]">New Units</th>
                                <th className="p-2 md:p-3 font-medium text-gray-500 w-[20%]">Stabilized Occ.</th>
                                <th className="p-2 md:p-3 font-medium text-gray-500 text-right w-[20%]">ADR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initialExpansionData.map((row) => (
                                <tr key={row.year} className="border-t border-gray-200">
                                    <td className="p-2 md:p-3 text-gray-700">{row.year}</td>
                                    <td className="p-2 md:p-3 text-gray-700 text-right">{row.cumulative}</td>
                                    <td className="p-2 md:p-3 text-gray-700 text-right">{row.new}</td>
                                    <td className="p-2 md:p-3 text-gray-700 text-right">{row.stabilized}</td>
                                    <td className="p-2 md:p-3 text-gray-700 text-right">{row.adr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm">
                       <span className="bg-blue-100/70 text-blue-800 font-medium px-3 py-1.5 rounded-lg">Unit Economics</span>
                       <span className="text-green-600 font-bold text-right">{"EBITDA/villa ≈ ₱10.0M at maturity"}</span>
                    </div>
                </Card>
            </div>
        </Section>
    );
};

export default FinancialProjections;
