
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Section from '../Section';
import Card from '../Card';

const pieData = [
  { name: 'Construction & Dev.', value: 60, color: '#3b82f6' },
  { name: 'Land & Permitting', value: 20, color: '#22c55e' },
  { name: 'Operational Ramp-up', value: 15, color: '#f97316' },
  { name: 'Contingency', value: 5, color: '#f43f5e' },
];

// --- Icon Components ---
const SeedlingIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a2.25 2.25 0 00-2.25 2.25c0 1.152.26 2.243.75 3.25-1.1.5-2.25.9-3.5 1.15a.75.75 0 00-.5.72v.214a.75.75 0 00.55.706c1.25.3 2.5.6 3.75.85 1.1.2 2.2.3 3.25.3s2.15-.1 3.25-.3c1.25-.25 2.5-.55 3.75-.85a.75.75 0 00.55-.706v-.214a.75.75 0 00-.5-.72c-1.25-.25-2.4-.65-3.5-1.15.5-.9 1.5-3.25 1.5-3.25A2.25 2.25 0 0012 2z" />
    </svg>
);
const HomeModernIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m-3-1l-3-1m-3 1l-3 1m18 0l-3 1m-12-3.5l3-1.125" />
    </svg>
);
const UserGroupIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.284-2.72a3 3 0 00-4.682-2.72m4.682 2.72v.003a3 3 0 013.741 2.72M12 18.75v.003a3 3 0 013.741 2.72m-3.741-2.72a3 3 0 00-3.741 2.72M12 3c2.755 0 5.196.977 7.028 2.617L12 12 4.972 5.617A48.354 48.354 0 0112 3z" />
    </svg>
);
const ExitStrategyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const InvestmentTier: React.FC<{ icon: React.ReactNode; title: string; amount: string; children: React.ReactNode }> = ({ icon, title, amount, children }) => (
    <div className="flex items-start">
        <div className="w-12 h-12 rounded-lg bg-blue-50 text-primary flex items-center justify-center mr-5 flex-shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="font-semibold text-gray-800">{title}</h4>
            <p className="font-bold text-lg text-primary">{amount}</p>
            <p className="text-gray-600 text-sm mt-1">{children}</p>
        </div>
    </div>
);

const CustomLegend = ({ payload }: any) => (
    <ul className="flex flex-col space-y-2 text-sm text-gray-600">
        {payload.map((entry: any, index: number) => (
            <li key={`item-${index}`} className="flex items-center">
                <span style={{ backgroundColor: entry.color, width: '12px', height: '12px', borderRadius: '50%', marginRight: '8px' }}></span>
                {entry.value}
                <span className="ml-auto font-semibold">{`${pieData[index].value}%`}</span>
            </li>
        ))}
    </ul>
);


const Funding: React.FC = () => {
    return (
        <Section title="Funding & Investment Opportunity" subtitle="Join us in capitalizing on Palawan's growth. We offer multiple tiers for strategic partnership.">
            <div className="grid lg:grid-cols-2 gap-8 grid-gap-md">
                <Card>
                    <h3 className="font-semibold text-lg mb-6 text-center lg:text-left">Investment Tiers</h3>
                    <div className="space-y-8">
                        <InvestmentTier icon={<SeedlingIcon />} title="Pilot Investor" amount={"₱2.5-5.0M"}>
                            Structured as a Convertible Note or SAFE agreement, offering premium terms at the next funding stage.
                        </InvestmentTier>
                        <InvestmentTier icon={<HomeModernIcon />} title="SIRV Villa Owner" amount={"₱12.5M+"}>
                            Acquire a titled eco-villa asset linked to the Special Investor's Resident Visa (SIRV) program.
                        </InvestmentTier>
                        <InvestmentTier icon={<UserGroupIcon />} title="Equity Partner" amount={"₱25.0M+"}>
                            Direct equity stake in the holding company, including profit sharing, and a potential board seat.
                        </InvestmentTier>
                    </div>
                     <button className="w-full mt-8 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg shadow-sm transition-colors duration-300">
                        Schedule a Call
                    </button>
                </Card>
                <Card className="flex flex-col">
                    <div>
                        <h3 className="font-semibold mb-4">Allocation of Capital</h3>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-full md:w-1/2 h-48">
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} fill="#8884d8" paddingAngle={5}>
                                            {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-full md:w-1/2">
                                <CustomLegend payload={pieData.map(item => ({ value: item.name, color: item.color }))} />
                            </div>
                        </div>
                    </div>
                    <div className="my-8 border-t border-gray-200/80"></div>
                    <div>
                        <h3 className="font-semibold mb-4">Investor Exit Strategy</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <ExitStrategyIcon />
                                <div className="ml-4">
                                    <h5 className="font-medium">Strategic Acquisition</h5>
                                    <p className="text-sm text-gray-500">Sale to a larger hotel operator or real estate developer seeking entry into the Palawan market.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <ExitStrategyIcon />
                                <div className="ml-4">
                                    <h5 className="font-medium">REIT Conversion</h5>
                                    <p className="text-sm text-gray-500">Opportunity to bundle stabilized assets into a publicly-traded Real Estate Investment Trust.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <ExitStrategyIcon />
                                <div className="ml-4">
                                    <h5 className="font-medium">Share Buyback Program</h5>
                                    <p className="text-sm text-gray-500">A structured program to repurchase investor shares using operational profits at a premium.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        </Section>
    );
};

export default Funding;
