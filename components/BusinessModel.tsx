
import React from 'react';
import Section from './Section';
import Card from './Card';

// --- Icons ---

const DocumentTextIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

const ArrowTrendingUpIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
);

const HomeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
);

const CheckCircleIcon: React.FC = () => (
     <svg className="w-5 h-5 text-primary flex-shrink-0 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
    </svg>
);

const BusinessCard: React.FC<{ title: string; items: string[]; icon: React.ReactNode; className?: string }> = ({ title, items, icon, className = '' }) => (
    <Card className={`h-full ${className}`}>
        <div className="flex items-center mb-4 text-primary space-x-3">
            {icon}
            <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        </div>
        <ul className="space-y-4 text-gray-600 list-none pl-0">
            {items.map((item, index) => (
                <li key={index} className="flex items-start">
                    <CheckCircleIcon />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </Card>
);

const BusinessModel: React.FC = () => {
    const cardsData = [
        {
            title: 'Cleopatra SIRV Holdings',
            icon: <DocumentTextIcon />,
            items: [
                'Beyond a holding company; leads farming integration and hardware depots supporting Palawan\'s construction wave.',
                'Expands SIRV product development, corporate finance, and brand strategy.',
                'Builds supply resilience through agri/hardware verticals.'
            ]
        },
        {
            title: 'Shared Growth Engines',
            icon: <ArrowTrendingUpIcon />,
            className: 'bg-secondary border-blue-200/80',
            items: [
                'Resort & eco-villa operations with proven occupancy and guest satisfaction.',
                'Revenue from F&B, tours, and premium experiences.',
                'Expansion into digital transparency (investor dashboards, ESG reporting).'
            ]
        },
        {
            title: 'Binga Beach Brothers Inc.',
            icon: <HomeIcon />,
            items: [
                'More than a developer; owns 5,282 sqm titled beachfront land (₱75M) with ECC & TIEZA permits.',
                'Operator of a proven boutique resort with 10 kVA solar, first "Retiree Philippines" in Palawan.',
                'Expanding into modular villas for sale with full compliance and rental pool management.'
            ]
        }
    ];

    return (
        <Section title="Business Model & Revenue Streams" subtitle="A balanced alliance combining proven land authority, operational excellence, and vertical expansion.">
             <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                {cardsData.map((card, index) => (
                    <React.Fragment key={card.title}>
                        <div className="w-full lg:w-1/3">
                           <BusinessCard {...card} />
                        </div>
                        {index < cardsData.length - 1 && (
                            <>
                                <div className="text-gray-300 text-4xl font-light hidden lg:block">+</div>
                                <div className="text-gray-300 text-4xl font-light lg:hidden">+</div>
                            </>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </Section>
    );
};

export default BusinessModel;
