
import React from 'react';

interface SectionProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    className?: string;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, children, className = '' }) => {
    const id = title.replace(/\s+/g, '-').toLowerCase();
    return (
        <section className={`py-16 md:py-24 bg-gray-50/50 ${className} section-pad`} aria-labelledby={id}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 container-site">
                <div className="text-center mb-12">
                    <h2 id={id} className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{title}</h2>
                    <p className="mt-4 text-lg text-gray-500">{subtitle}</p>
                </div>
                {children}
            </div>
        </section>
    );
};

export default Section;
