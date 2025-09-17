

import React from 'react';
import Section from './Section';
import Card from './Card';

// --- Icon Components ---

const CheckIcon: React.FC = () => (
    <svg className="w-6 h-6 text-primary flex-shrink-0 mr-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const LandIcon: React.FC = () => (
    <svg className="w-7 h-7 text-gray-500 flex-shrink-0 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const PermitIcon: React.FC = () => (
    <svg className="w-7 h-7 text-gray-500 flex-shrink-0 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const AuthorityIcon: React.FC = () => (
    <svg className="w-7 h-7 text-gray-500 flex-shrink-0 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-4h1m-1 4h1" />
    </svg>
);

const SolarIcon: React.FC = () => (
    <svg className="w-7 h-7 text-gray-500 flex-shrink-0 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

const VerticalsIcon: React.FC = () => (
    <svg className="w-7 h-7 text-gray-500 flex-shrink-0 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
);

// FIX: Made `children` optional to allow using ActionButton with only an icon.
const ActionButton: React.FC<{ children?: React.ReactNode; icon?: React.ReactNode }> = ({ children, icon }) => (
    <button className="bg-gray-100 border border-gray-200/80 text-gray-500 text-xs font-semibold px-2 py-1 h-8 w-14 rounded-md flex items-center justify-center hover:bg-gray-200 transition-colors">
        {icon || children}
    </button>
);


// --- Main Components ---

const ListItem: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <li className="flex items-start">
        <CheckIcon />
        <div>
            <h4 className="font-semibold text-gray-800">{title}</h4>
            <p className="text-gray-600">{children}</p>
        </div>
    </li>
);

const ProofPoint: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode; action: React.ReactNode; }> = ({ title, children, icon, action }) => (
    <div className="flex items-start py-4">
        {icon}
        <div className="flex-grow">
            <h4 className="font-semibold text-gray-800">{title}</h4>
            <p className="text-gray-500">{children}</p>
        </div>
        <div className="ml-4 flex-shrink-0 self-center">
            {action}
        </div>
    </div>
);


const ExecutiveSummary: React.FC = () => {
    return (
        <Section title="Executive Summary" subtitle="A high-level overview of our strategic direction and foundational strengths.">
            <div className="grid md:grid-cols-2 gap-8 grid-gap-md">
                <Card className="bg-secondary">
                    <h3 className="text-xl font-semibold text-center mb-6 pb-4 border-b border-blue-200/80">Mission & Vision</h3>
                    <ul className="space-y-6 text-gray-700">
                        <ListItem title="Establish Palawan's Flagship Destination">
                            Not just a resort—a replicable ecosystem blending tourism, agriculture, and infrastructure.
                        </ListItem>
                        <ListItem title="Inclusive Growth & ESG Commitment">
                            Partnering with local communities and cooperatives to build supply chains (farm-to-table produce, construction hardware).
                        </ListItem>
                        <ListItem title="Resilient Business Model">
                            Diversified streams—eco-villas, agri sales, hardware depots, and digital securities—reducing risk exposure to single-market downturns.
                        </ListItem>
                         <ListItem title="Scalable & Replicable">
                            The Lumambong Beach model becomes the template for future expansions in Bohol, Siargao, and beyond.
                        </ListItem>
                    </ul>
                </Card>
                <Card className="bg-lightgreen">
                    <h3 className="text-xl font-semibold text-center mb-6 pb-4 border-b border-green-200/80">Core Proof Points</h3>
                    <div className="divide-y divide-gray-200/80">
                        <ProofPoint 
                            title="₱75.0M in Titled Land Assets" 
                            icon={<LandIcon />} 
                            action={<ActionButton icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>} />}
                        >
                            Fully-owned, 5,282 sqm mother title beachfront parcel in Lumambong.
                        </ProofPoint>
                        <ProofPoint 
                            title="ECC & TIEZA Permits" 
                            icon={<PermitIcon />}
                            action={<ActionButton>TIEZA</ActionButton>}
                        >
                            Rare compliance already secured: Environmental Compliance Certificate and TIEZA registration.
                        </ProofPoint>
                         <ProofPoint 
                            title="SEC Corporate Authority" 
                            icon={<AuthorityIcon />}
                            action={<ActionButton>SEC</ActionButton>}
                        >
                           Dual-entity structure: Binga Beach Brothers (BBB) and Cleopatra SIRV Holdings.
                        </ProofPoint>
                        <ProofPoint 
                            title="10kVA Solar-Powered Resort"
                            icon={<SolarIcon />}
                            action={<ActionButton icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} />}
                        >
                           Operational pilot resort with off-grid infrastructure, certified by "Retiree Philippines".
                        </ProofPoint>
                        <ProofPoint 
                            title="Beyond a Resort: Integrated Verticals"
                            icon={<VerticalsIcon />}
                            action={<ActionButton icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} />}
                        >
                           Farming & Hardware verticals reduce input costs and secure supply chains.
                        </ProofPoint>
                    </div>
                </Card>
            </div>
        </Section>
    );
};

export default ExecutiveSummary;