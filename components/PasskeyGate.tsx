
import React, { useState, useEffect } from 'react';
import { usePasskeyAuth } from '../hooks/usePasskeyAuth';

interface PasskeyGateProps {
    children: React.ReactNode;
}

const PasskeyGate: React.FC<PasskeyGateProps> = ({ children }) => {
    const { passkeyEnabled, hasAccess, requestAccess } = usePasskeyAuth();
    const [passkey, setPasskey] = useState('');
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
        if (!passkey || isSubmitting) return;

        setError('');
        setIsSubmitting(true);
        const success = await requestAccess(passkey);
        if (!success) {
            setError('Invalid passkey. Please try again.');
            setPasskey('');
        }
        setIsSubmitting(false);
    };

    if (!passkeyEnabled || hasAccess) {
        return <>{children}</>;
    }

    return (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center p-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="passkey-gate-title"
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm"
            >
                <h2 id="passkey-gate-title" className="text-xl font-bold text-center text-gray-800 mb-2">
                    Enter Passkey
                </h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                    Access to this project is restricted.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="passkey-input" className="sr-only">
                            Passkey
                        </label>
                        <input
                            id="passkey-input"
                            type="password"
                            value={passkey}
                            // FIX: Correctly get the value from the event target and complete the component.
                            onChange={(e) => setPasskey(e.target.value)}
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

// FIX: Added missing default export.
export default PasskeyGate;
