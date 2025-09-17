
import React from 'react';

interface ProjectCardProps {
    name: string;
    onSelect: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, onSelect }) => {
    return (
        <button onClick={onSelect} className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:shadow-md hover:border-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
            <span className="font-medium text-gray-700">{name}</span>
        </button>
    );
};

export default ProjectCard;
