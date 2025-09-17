import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    shadow?: 'sm' | 'md' | 'lg' | 'none';
}

const Card: React.FC<CardProps> = ({ children, className = '', shadow = 'md' }) => {
    const shadowClass = {
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        none: 'shadow-none',
    }[shadow];

    return (
        <div className={`bg-white border border-gray-200/80 rounded-xl p-6 md:p-8 ${shadowClass} ${className} flex flex-col card-soft`}>
            {children}
        </div>
    );
};

export default Card;