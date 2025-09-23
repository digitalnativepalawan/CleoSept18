import React, { useState, FormEvent } from 'react';

interface PinGateProps {
    onLoginAttempt: (pin: string) => boolean;
}

const PinGate: React.FC<PinGateProps> = ({ onLoginAttempt }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            const success = onLoginAttempt(pin);
            if (!success) {
                setError('Incorrect passkey. Please try again.');
                setPin('');
            }
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-[calc(100vh-65px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-24 w-auto" src="https://bingabeach.com/wp-content/uploads/2019/02/cropped-bb-logo.png" alt="Binga Beach" />
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Project Portal Access
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your passkey to continue
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="passkey" className="sr-only">Passkey</label>
                            <input
                                id="passkey"
                                name="passkey"
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-lg text-center tracking-[0.5em]"
                                placeholder="••••"
                                maxLength={4}
                                autoFocus
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading || pin.length !== 4}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Verifying...' : 'Unlock Portal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PinGate;