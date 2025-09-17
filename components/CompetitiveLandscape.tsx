import React from 'react';
import Card from './Card';

// --- Icon Components ---

const ComplianceIcon: React.FC = () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036V21" />
    </svg>
);

const IncentivesIcon: React.FC = () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
);

const VisaIcon: React.FC = () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
);

const InvestorIcon: React.FC = () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.284-2.72a3 3 0 00-4.682-2.72m4.682 2.72v.003a3 3 0 013.741 2.72M12 18.75v.003a3 3 0 013.741 2.72m-3.741-2.72a3 3 0 00-3.741 2.72M12 3c2.755 0 5.196.977 7.028 2.617L12 12 4.972 5.617A48.354 48.354 0 0112 3z" />
    </svg>
);

// --- Reusable Components ---

const Tag: React.FC<{ children: React.ReactNode; color: 'blue' | 'green' | 'yellow' | 'purple' }> = ({ children, color }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-700',
        green: 'bg-green-50 text-green-700',
        yellow: 'bg-yellow-50 text-yellow-800',
        purple: 'bg-purple-50 text-purple-700',
    };
    return (
        <span className={`text-xs font-medium px-2 py-1 rounded-md ${colors[color]}`}>
            {children}
        </span>
    );
};

const AdvantageCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <Card className="text-left !p-6 md:!p-8 h-full">
        <div className="flex items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                <div className="w-6 h-6">
                    {icon}
                </div>
            </div>
            <h4 className="font-semibold text-lg text-gray-800 mt-1.5">{title}</h4>
        </div>
        <div className="text-gray-600 text-sm space-y-2 pl-14">
            {children}
        </div>
    </Card>
);

// --- Main Component ---

const CompetitiveLandscape: React.FC = () => {
    const tableData = [
        { feature: 'Visa-linked integration', bbb: 'Yes', typical: 'No' },
        { feature: 'Land authority & SEC', bbb: 'Strong', typical: 'Limited' },
        { feature: 'ECC/TIEZA compliance', bbb: 'Secured', typical: 'Partial' },
        { feature: 'Vertical synergies', bbb: 'Multi-vertical', typical: 'Single' },
    ];

    return (
        <section className="py-16 md:py-24 bg-white section-pad">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 container-site">
                <Card>
                    <div className="flex items-center mb-4 space-x-3">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 100-13.5h9a9.75 9.75 0 000 13.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5h6m-3 3V7.5" /></svg>
                        <h3 className="font-semibold text-lg text-gray-800">Competitive Landscape</h3>
                    </div>
                    <ul className="text-gray-600 space-y-2 mb-6 list-disc list-inside text-sm">
                        <li>Fragmented boutique resorts; few visa-linked integrated assets.</li>
                        <li>Limited ECC/TIEZA compliance among peers.</li>
                    </ul>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50/80">
                                    <th className="p-3 font-medium text-left text-gray-600">Feature</th>
                                    <th className="p-3 font-medium text-left text-gray-600">BBB + Cleopatra</th>
                                    <th className="p-3 font-medium text-left text-gray-600">Typical Resort</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, index) => (
                                    <tr key={index} className="border-t border-gray-200/80">
                                        <td className="p-3 text-gray-700">{row.feature}</td>
                                        <td className={`p-3 font-medium ${row.bbb === 'Yes' || row.bbb === 'Secured' ? 'text-green-600' : 'text-gray-800'}`}>{row.bbb}</td>
                                        <td className="p-3 text-gray-700">{row.typical}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <div className="mt-16 text-center">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Our Unfair Advantage: A Deep Regulatory Moat</h3>
                    <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
                        Our government-backed compliance and incentives create a high barrier to entry, de-risking investment and accelerating returns.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AdvantageCard icon={<ComplianceIcon />} title="SEC, ECC & TIEZA Compliance">
                        <ul className="list-disc list-inside space-y-1">
                            <li>Full land, environmental, and tax zone authority.</li>
                            <li>Guarantees lower regulatory risk and faster project execution.</li>
                        </ul>
                        <div className="mt-3 flex gap-2 flex-wrap">
                            <Tag color="blue">SEC</Tag>
                            <Tag color="green">ECC</Tag>
                        </div>
                    </AdvantageCard>
                    <AdvantageCard icon={<IncentivesIcon />} title="TIEZA Investment Incentives">
                         <ul className="list-disc list-inside space-y-1">
                            <li>5-10 years income tax holiday.</li>
                            <li>Duty-free importation of capital equipment.</li>
                            <li>VAT zero-rating on eligible transactions.</li>
                        </ul>
                        <div className="mt-3">
                            <Tag color="yellow">TIEZA</Tag>
                        </div>
                    </AdvantageCard>
                    <AdvantageCard icon={<VisaIcon />} title="SIRV-Linked Residency Investment">
                         <ul className="list-disc list-inside space-y-1">
                            <li>Taps into 10,000+ annual foreign visa applicants.</li>
                            <li>Pathway for residency tied to project participation.</li>
                        </ul>
                         <div className="mt-3">
                            <Tag color="purple">SIRV</Tag>
                        </div>
                    </AdvantageCard>
                    <AdvantageCard icon={<InvestorIcon />} title="Foreign & Filipino Benefits">
                         <ul className="list-disc list-inside space-y-1">
                            <li><strong>Foreigners:</strong> Residency + tax holidays via SIRV/TIEZA.</li>
                            <li><strong>Filipinos:</strong> Profit participation & land appreciation.</li>
                        </ul>
                    </AdvantageCard>
                </div>
            </div>
        </section>
    );
};

export default CompetitiveLandscape;
