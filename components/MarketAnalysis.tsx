
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Section from './Section';
import Card from './Card';

// --- Icon Components ---

const TourismGrowthIcon: React.FC = () => (
    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
);

const DemographicsIcon: React.FC = () => (
    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.284-2.72a3 3 0 00-4.682-2.72m4.682 2.72v.003a3 3 0 013.741 2.72M12 18.75v.003a3 3 0 013.741 2.72m-3.741-2.72a3 3 0 00-3.741 2.72M12 3c2.755 0 5.196.977 7.028 2.617L12 12 4.972 5.617A48.354 48.354 0 0112 3zM2.25 5.617c0 2.755.977 5.196 2.617 7.028v.003a48.354 48.354 0 01-5.234 0v-.003c0-2.755.977-5.196 2.617-7.028zM12 21a48.354 48.354 0 01-5.234 0v-.003c0-2.755.977-5.196 2.617-7.028M18.383 3.617a48.354 48.354 0 010 16.766v-.003c-1.64-1.83-2.617-4.272-2.617-7.028 0-2.755.977-5.196 2.617-7.028z" />
    </svg>
);

const InfrastructureIcon: React.FC = () => (
    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
);

const tourismData = [
    { name: '2024', value: 100 }, { name: '2025', value: 112 }, { name: '2026', value: 125 }, 
    { name: '2027', value: 140 }, { name: '2028', value: 157 }, { name: '2029', value: 176 }, { name: '2030', value: 197 },
];

const DemographicItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center space-x-3">
        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
        <span className="text-gray-700">{children}</span>
    </div>
);

// --- Timeline Icons ---
const AirportReadyIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
);
const RoadsUpgradedIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h2a1 1 0 001-1V7a1 1 0 00-1-1h-2" />
    </svg>
);
const PhaseExpansionIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-4h1m-1 4h1" />
    </svg>
);
const InvestorRolloutIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A6.963 6.963 0 0012 13a6.963 6.963 0 003-1.197" />
    </svg>
);

const timelineData = [
    { year: 2023, label: 'Airport Ready', Icon: AirportReadyIcon, status: 'complete' },
    { year: 2024, label: 'Roads Upgraded', Icon: RoadsUpgradedIcon, status: 'complete' },
    { year: 2025, label: 'Phase 2 Expansion', Icon: PhaseExpansionIcon, status: 'upcoming' },
    { year: 2026, label: 'Investor Rollout', Icon: InvestorRolloutIcon, status: 'upcoming' },
];


const MarketAnalysis: React.FC = () => {
    return (
        <Section title="Market Analysis" subtitle="Strong demand, underserved market, proven regulatory moat.">
            <div className="grid lg:grid-cols-3 gap-8 grid-gap-md">
                {/* Tourism Growth Card */}
                <Card>
                    <div className="flex items-center mb-4 space-x-3">
                        <TourismGrowthIcon />
                        <h3 className="font-semibold text-lg text-gray-800">Tourism Growth</h3>
                    </div>
                    <ul className="text-gray-600 space-y-2 mb-6 list-disc list-inside text-sm">
                        <li>8.2M+ visitors in 2024; projected 12% CAGR to 2030.</li>
                        <li>DOT target: 15M foreign arrivals by 2030.</li>
                    </ul>
                    <div className="relative flex-grow mt-auto">
                        <p className="font-semibold text-gray-700 text-sm mb-2">Projected Foreign Arrivals <span className="text-gray-500 font-normal">(Indexed, 2024=100)</span></p>
                        <div className="absolute top-0 right-0 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full z-10">+12% CAGR</div>
                        <div className="h-48 mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={tourismData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12 }} domain={[90, 200]} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }} />
                                    <Line type="monotone" dataKey="value" stroke="#007aff" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">Indexed projection for visual clarity. Source: DOT targets, internal forecast @ 12% CAGR.</p>
                    </div>
                </Card>

                {/* Target Demographics Card */}
                <Card>
                    <div className="flex items-center mb-2 space-x-3">
                        <DemographicsIcon />
                        <h3 className="font-semibold text-lg text-gray-800">Target Demographics</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">Illustrative segment mix of investors and users by 2030.</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-5 text-sm mb-6">
                        <DemographicItem>HNWI (CN/KR/EU/US)</DemographicItem>
                        <DemographicItem>SIRV Retirees</DemographicItem>
                        <DemographicItem>ESG / Sustainability Investors</DemographicItem>
                        <DemographicItem>Web3 / Crypto Nomads</DemographicItem>
                        <DemographicItem>OFW / Filipino Diaspora</DemographicItem>
                    </div>
                    <div className="space-y-2 text-sm text-center mb-4">
                        <p className="bg-green-50 text-green-800 border border-green-200/80 rounded-md px-3 py-1.5">High LTV / Low CAC via referral</p>
                        <p className="bg-green-50 text-green-800 border border-green-200/80 rounded-md px-3 py-1.5">ESG reporting drives premium ADR</p>
                        <p className="bg-green-50 text-green-800 border border-green-200/80 rounded-md px-3 py-1.5">Wallet-ready, KYC/AML compliant</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-auto pt-4 border-t border-gray-200/80">Shares are illustrative for planning; refine with OTA data, referral partner funnels, and pre-launch A/B tests.</p>
                </Card>

                {/* Infrastructure Boom Card */}
                <Card>
                    <div className="flex items-center mb-4 space-x-3">
                        <InfrastructureIcon />
                        <h3 className="font-semibold text-lg text-gray-800">Infrastructure Boom</h3>
                    </div>
                    <ul className="text-gray-600 space-y-2 mb-8 list-disc list-inside text-sm">
                        <li>Strategic infrastructure upgrades to support growth.</li>
                        <li>Phased development aligned with market demand.</li>
                    </ul>
                    <div className="mt-auto">
                        <h5 className="font-medium text-gray-700 mb-8 text-center">Corridor Upgrade Timeline</h5>
                        <div className="flex items-start justify-center">
                            {timelineData.map((item, index) => {
                                const isComplete = item.status === 'complete';
                                const isConnectorComplete = isComplete;

                                return (
                                    <React.Fragment key={item.year}>
                                        <div className="flex flex-col items-center text-center px-2" style={{ minWidth: '60px' }}>
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isComplete ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                                                <item.Icon />
                                            </div>
                                            <p className="text-xs font-semibold mt-3 text-gray-800 leading-tight">{item.label}</p>
                                            <p className="text-xs text-gray-500 mt-1">{item.year}</p>
                                        </div>

                                        {index < timelineData.length - 1 && (
                                            <div className={`flex-1 h-1.5 mt-5 ${isConnectorComplete ? 'bg-primary' : 'bg-gray-200'}`}></div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            </div>
        </Section>
    );
};

export default MarketAnalysis;
