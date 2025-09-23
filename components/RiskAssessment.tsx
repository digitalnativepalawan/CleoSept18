
import React from 'react';
import Card from './Card';

// --- Icon Components ---

const RegulatoryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-9m-7.5-2a7.5 7.5 0 0115 0z" />
    </svg>
);

const ConstructionIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V7m-4 0h8m4 0a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const ClimateIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
    </svg>
);

const MarketIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.21 12.77 11 12 11c-.77 0-1.536.21-2.121.578-.586.368-.586.982 0 1.35L12 14.25" />
    </svg>
);

const RiskCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <Card className="text-left !p-6 h-full">
        <div className="flex items-center mb-3">
            {icon}
            <h3 className="font-semibold text-gray-800 ml-3">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{children}</p>
    </Card>
);

const RiskAssessment: React.FC = () => {
    return (
        <section className="py-16 md:py-24 bg-white section-pad" aria-labelledby="risk-assessment">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 container-site">
                <div className="text-center mb-12">
                    <h2 id="risk-assessment" className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Risk Assessment & Mitigation</h2>
                    <p className="mt-4 text-lg text-gray-500">A proactive approach to identifying and managing potential challenges.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <RiskCard 
                        title="Regulatory & Permitting"
                        icon={<RegulatoryIcon />}
                    >
                        Proactive compliance with ECC/TIEZA regulations and maintaining strong local government relations to ensure smooth operations.
                    </RiskCard>
                    <RiskCard 
                        title="Construction & Timeline"
                        icon={<ConstructionIcon />}
                    >
                        Phased development approach to manage capital outflow. Partnering with proven local contractors to mitigate delays and ensure quality.
                    </RiskCard>
                    <RiskCard 
                        title="Climate & Environmental"
                        icon={<ClimateIcon />}
                    >
                        Infrastructure designed for climate resilience. A core focus on sustainable, low-impact operations that preserve the local ecosystem.
                    </RiskCard>
                    <RiskCard 
                        title="Market & FX Volatility"
                        icon={<MarketIcon />}
                    >
                        Diversified revenue streams (local and foreign) reduce dependency on any single market. Targeting stable international and domestic tourists.
                    </RiskCard>
                </div>
            </div>
        </section>
    );
};

export default RiskAssessment;