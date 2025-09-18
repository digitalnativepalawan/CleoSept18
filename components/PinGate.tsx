
import React, { useState, useEffect } from 'react';
import { usePinGate } from '../hooks/usePinGate';

interface PinGateProps {
    children: React.ReactNode;
}

const PinGate: React.FC<PinGateProps> = ({ children }) => {
    const { gateEnabled, hasAccess, requestAccess } = usePinGate();
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setError('');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pin || isSubmitting) return;

        setError('');
        setIsSubmitting(true);
        const success = await requestAccess(pin);
        if (!success) {
            setError('Invalid PIN. Please try again.');
            setPin('');
        }
        setIsSubmitting(false);
    };

    if (!gateEnabled || hasAccess) {
        return <>{children}</>;
    }

    return (
        <div className="fixed inset-0 bg-gray-100 flex items-center justify-center z-50">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="pin-gate-title"
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm"
            >
                <h2 id="pin-gate-title" className="text-xl font-bold text-center text-gray-800 mb-2">
                    Enter PIN
                </h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                    This area is restricted during staging.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="pin-input" className="sr-only">
                            PIN
                        </label>
                        <input
                            id="pin-input"
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full px-4 py-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                            placeholder="••••••"
                            autoFocus
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-300 disabled:bg-blue-300 disabled:cursor-wait"
                    >
                        {isSubmitting ? 'Verifying...' : 'Submit'}
                    </button>
                    {error && (
                        <p role="alert" className="text-red-600 text-sm text-center mt-4">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PinGate;