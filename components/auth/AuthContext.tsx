
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// A very simple in-memory "database" stored in localStorage
const USERS_KEY = 'binga_users';
const CURRENT_USER_KEY = 'binga_current_user';

interface User {
    email: string;
    role: 'Admin' | 'User';
}

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    signup: (email: string, password: string) => Promise<User>;
    login: (email: string, password: string) => Promise<User>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem(CURRENT_USER_KEY);
            if (storedUser) {
                // FIX: Cast the parsed user to the User type to ensure type safety.
                setCurrentUser(JSON.parse(storedUser) as User);
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const signup = async (email: string, password: string): Promise<User> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
                const existingUser = users.find((u: any) => u.email === email);

                if (existingUser) {
                    return reject(new Error('An account with this email already exists.'));
                }

                // First user is Admin, subsequent users are 'User'
                const role = users.length === 0 ? 'Admin' : 'User';
                
                // In a real app, NEVER store plain text passwords. This is for demonstration only.
                const newUser = { email, password, role };
                users.push(newUser);
                localStorage.setItem(USERS_KEY, JSON.stringify(users));
                
                // FIX: Explicitly type userData to ensure it matches the User interface.
                // This resolves the ambiguity that caused the type error for `setCurrentUser` and `resolve`.
                const userData: User = { email, role };
                // Automatically log in the new user
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
                setCurrentUser(userData);

                resolve(userData);
            }, 500);
        });
    };

    const login = async (email: string, password: string): Promise<User> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
                const user = users.find((u: any) => u.email === email);

                // Again, do not do this in production. Passwords should be hashed and compared securely.
                if (user && user.password === password) {
                    // FIX: Cast the untyped `user.role` from JSON.parse to the expected 'Admin' | 'User' literal type.
                    const userData: User = { email: user.email, role: user.role as 'Admin' | 'User' };
                    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
                    setCurrentUser(userData);
                    resolve(userData);
                } else {
                    reject(new Error('Invalid email or password.'));
                }
            }, 500);
        });
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem(CURRENT_USER_KEY);
    };

    const value = {
        currentUser,
        loading,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
