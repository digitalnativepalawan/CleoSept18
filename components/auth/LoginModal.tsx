
import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useAuth } from './AuthContext';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToSignUp: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to log in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Log In">
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{error}</p>}
                <div>
                    <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        id="login-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="login-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging In...' : 'Log In'}
                    </button>
                </div>
                 <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button type="button" onClick={onSwitchToSignUp} className="font-medium text-primary hover:underline">
                        Sign Up
                    </button>
                </p>
            </form>
        </Modal>
    );
};

export default LoginModal;