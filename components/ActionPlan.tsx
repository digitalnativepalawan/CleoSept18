
import React from 'react';
import Section from './Section';
import Card from './Card';

// --- Icon Components for Timeline ---

const FoundationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const FundraisingIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
);

const ConstructionIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
);

const ScaleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m9.75 9.75h4.5m-4.5 0a2.25 2.25 0 01-2.25-2.25v-1.5a2.25 2.25 0 012.25-2.25H18m-7.5 6.75h.008v.008H10.5v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);

const MaturityIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
);


interface TimelineItemProps {
    phase: string;
    title: string;
    date: string;
    children: React.ReactNode;
    icon: React.ReactNode;
    isLast?: boolean;
    isActive?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ phase, title, date, icon, children, isLast = false, isActive = false }) => {
    return (
        <div className="relative flex items-start group">
            <div className="flex flex-col items-center mr-6">
                <div className={`w-12 h-12 rounded-full border-2 ${isActive ? 'border-primary bg-blue-50' : 'border-gray-300 bg-white'} flex items-center justify-center flex-shrink-0`}>
                    <div className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                        {icon}
                    </div>
                </div>
                {!isLast && <div className={`w-0.5 h-full ${isActive ? 'bg-primary/50' : 'bg-gray-300'} mt-2`}></div>}
            </div>
            <Card className={`flex-1 !p-6 transition-all duration-300 ${isActive ? 'border-primary shadow-lg' : 'group-hover:border-gray-400'}`}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                    <p className="font-semibold text-sm text-primary">{phase}</p>
                    <p className="text-sm text-gray-500 font-medium sm:text-right mt-1 sm:mt-0">{date}</p>
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-3">{title}</h3>
                <div className="text-sm text-gray-600 space-y-2">
                    {children}
                </div>
            </Card>
        </div>
    );
};

const timelineData = [
    {
        phase: 'Phase 1',
        title: 'Foundation & Approvals',
        date: 'Q4 2024',
        icon: <FoundationIcon />,
        isActive: true,
        content: (
            <ul className="list-disc list-inside">
                <li>Finalize corporate structure with SEC registration for both entities.</li>
                <li>Secure TIEZA and Environmental Compliance Certificate (ECC) approvals.</li>
                <li>Complete final land surveys and title verifications.</li>
            </ul>
        ),
    },
    {
        phase: 'Phase 2',
        title: 'Pilot Fundraising',
        date: 'Q1-Q2 2025',
        icon: <FundraisingIcon />,
        isActive: true,
        content: (
            <ul className="list-disc list-inside">
                <li>Raise ₱10-15M via Convertible Notes or SAFE for initial development.</li>
                <li>Onboard pilot investors and finalize legal documentation.</li>
                <li>Establish digital investor relations portal.</li>
            </ul>
        ),
    },
    {
        phase: 'Phase 3',
        title: 'Phase 1 Construction & Launch',
        date: 'Q3 2025 - Q2 2026',
        icon: <ConstructionIcon />,
        isActive: false,
        content: (
            <ul className="list-disc list-inside">
                <li>Construct first 5 eco-villas and upgrade core resort facilities.</li>
                <li>Establish hardware depot and expand farm-to-table operations.</li>
                <li>Launch marketing campaigns for villa sales and rentals.</li>
            </ul>
        ),
    },
    {
        phase: 'Phase 4',
        title: 'Scale Operations',
        date: 'Q3 2026 - 2028',
        icon: <ScaleIcon />,
        isActive: false,
        content: (
            <ul className="list-disc list-inside">
                <li>Develop an additional 20+ eco-villas based on demand.</li>
                <li>Achieve operational stability with 70%+ occupancy and mature EBITDA margins.</li>
                <li>Target positive cash flow and begin distributing returns.</li>
            </ul>
        ),
    },
    {
        phase: 'Phase 5',
        title: 'Maturity & Exit Opportunities',
        date: '2029+',
        icon: <MaturityIcon />,
        isActive: false,
        content: (
             <ul className="list-disc list-inside">
                <li>Explore strategic acquisition by a larger hotel operator.</li>
                <li>Evaluate potential for REIT conversion for stabilized assets.</li>
                <li>Implement a structured share buyback program for early investors.</li>
            </ul>
        ),
    },
];

const ActionPlan: React.FC = () => {
    return (
        <Section title="Action Plan" subtitle="Our strategic roadmap from inception to full-scale operation and investor returns.">
            <div className="mt-8 max-w-3xl mx-auto">
                <div className="space-y-12">
                     {timelineData.map((item, index) => (
                        <TimelineItem
                            key={item.title}
                            {...item}
                            isLast={index === timelineData.length - 1}
                        >
                            {item.content}
                        </TimelineItem>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default ActionPlan;