
import React from 'react';
import Section from './Section';
import Card from './Card';

// --- Icon Components ---
const LeafIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.04 9.04 0 007.5-3.582M12 21a9.014 9.014 0 01-7.5-3.582M12 21V3m0 18c-3.722 0-7.14-1.58-9.5-4.118M12 3c3.722 0 7.14 1.58 9.5 4.118" />
    </svg>
);

const UsersIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.284-2.72a3 3 0 00-4.682-2.72m4.682 2.72v.003a3 3 0 013.741 2.72M12 18.75v.003a3 3 0 013.741 2.72m-3.741-2.72a3 3 0 00-3.741 2.72M12 3c2.755 0 5.196.977 7.028 2.617L12 12 4.972 5.617A48.354 48.354 0 0112 3z" />
    </svg>
);

const ShieldCheckIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036V21" />
    </svg>
);

const CheckIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-3 flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

interface ESGCardProps {
    title: string;
    items: string[];
    icon: React.ReactNode;
    iconBgColor: string;
}

const ESGCard: React.FC<ESGCardProps> = ({ title, items, icon, iconBgColor }) => (
    <Card className="h-full">
        <div className="flex items-center mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-5 flex-shrink-0 ${iconBgColor}`}>
                <div className="text-white">{icon}</div>
            </div>
            <h3 className="font-semibold text-xl text-gray-800">{title}</h3>
        </div>
        <ul className="space-y-4 text-gray-600 list-none pl-0">
            {items.map((item, index) => (
                <li key={index} className="flex items-start">
                   <CheckIcon />
                   <span>{item}</span>
                </li>
            ))}
        </ul>
    </Card>
);

const ImpactKPIs: React.FC = () => {
    const kpis = [
        { value: '1,250', label: 'Carbon Footprint Reduction', sublabel: 'tCO2e' },
        { value: '85%', label: 'Local Employment Rate', sublabel: 'in our operations' },
        { value: '₱5.2M', label: 'Community Investment', sublabel: 'in local programs' }
    ];

    return (
        <Card className="bg-secondary border-blue-200/80">
            <h3 className="font-semibold text-lg mb-4 text-center text-gray-800">Key Impact Metrics (Year-to-Date)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200/80">
                {kpis.map(kpi => (
                    <div key={kpi.label} className="p-4 text-center">
                        <p className="text-3xl font-bold text-primary">{kpi.value}</p>
                        <p className="text-sm text-gray-700 mt-1">{kpi.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{kpi.sublabel}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const ESGCommitment: React.FC = () => {
    const commitments = [
        {
            title: "Environmental",
            icon: <LeafIcon />,
            iconBgColor: 'bg-green-500',
            items: [
                "100% solar-powered resort operations to minimize carbon footprint.",
                "Water conservation and recycling programs.",
                "Waste reduction and composting initiatives.",
                "Protection of local biodiversity and ecosystems.",
                "Sustainable sourcing of all building materials and operational supplies."
            ]
        },
        {
            title: "Social",
            icon: <UsersIcon />,
            iconBgColor: 'bg-blue-500',
            items: [
                "Prioritizing local employment and skills training.",
                "Sourcing from local farmers and suppliers through cooperatives.",
                "Community engagement and support for local schools and healthcare.",
                "Fair labor practices and employee well-being programs.",
                "Investing in local cultural preservation initiatives."
            ]
        },
        {
            title: "Governance",
            icon: <ShieldCheckIcon />,
            iconBgColor: 'bg-slate-500',
            items: [
                "SEC-compliant corporate structure.",
                "Transparent financial reporting for investors.",
                "Regular ESG impact reporting.",
                "Ethical business conduct and anti-corruption policies.",
                "Establishing a diverse advisory board to oversee ESG strategy."
            ]
        }
    ];

    return (
        <Section title="ESG Commitment" subtitle="Building a sustainable and equitable future for Palawan.">
            <div className="mb-12">
                <ImpactKPIs />
            </div>
            <div className="grid md:grid-cols-3 gap-8 grid-gap-md">
                {commitments.map((commitment) => (
                    <ESGCard key={commitment.title} {...commitment} />
                ))}
            </div>
        </Section>
    );
};

export default ESGCommitment;
