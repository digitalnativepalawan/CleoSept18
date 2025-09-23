import { useState, useEffect, useCallback } from 'react';

const PIN_KEY = 'portal_pin_access_granted';
const CORRECT_PIN = '5309';

export const usePinGate = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const hasAccess = sessionStorage.getItem(PIN_KEY) === 'true';
        if (hasAccess) {
            setIsAuthenticated(true);
        }
    }, []);

    const attemptLogin = useCallback((pin: string): boolean => {
        if (pin === CORRECT_PIN) {
            sessionStorage.setItem(PIN_KEY, 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(PIN_KEY);
        setIsAuthenticated(false);
    }, []);

    return { isAuthenticated, attemptLogin, logout };
};
