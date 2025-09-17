import { useState, useCallback } from 'react';

// Helper to safely read environment variables from Vite's import.meta.env
// or a runtime-injected __ENV__ object for static hosts.
const getEnv = (name: string): string => {
    // FIX: Cast `import.meta` to `any` to address the TypeScript error.
    // This allows accessing Vite's `env` property without modifying the project's tsconfig.
    const viteEnv = (import.meta as any)?.env?.[name];
    if (viteEnv !== undefined) {
        return viteEnv;
    }
    const runtimeEnv = (globalThis as any)?.__ENV__?.[name];
    return runtimeEnv || "";
};

const PIN_HASH = (getEnv("VITE_PREVIEW_PIN_HASH") || "").trim();
const STORAGE_KEY = 'portal_access_v1';

const arrayBufferToHex = (buffer: ArrayBuffer): string => {
    return Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
};

const sha256 = async (str: string): Promise<string> => {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    return arrayBufferToHex(hashBuffer);
};

export const usePinGate = () => {
    // Initialize state from localStorage
    const [hasAccessState, setHasAccessState] = useState(() => {
        try {
            return localStorage.getItem(STORAGE_KEY) === '1';
        } catch {
            return false;
        }
    });

    const gateEnabled = !!PIN_HASH;

    const hasAccess = useCallback(() => {
        if (!gateEnabled) return true;
        return hasAccessState;
    }, [gateEnabled, hasAccessState]);

    const requestAccess = useCallback(async (pin: string): Promise<boolean> => {
        if (!gateEnabled) return true;

        const hashedPin = await sha256(pin);
        if (hashedPin === PIN_HASH) {
            try {
                localStorage.setItem(STORAGE_KEY, '1');
                setHasAccessState(true);
            } catch (e) {
                console.error('Failed to set localStorage', e);
            }
            return true;
        }
        return false;
    }, [gateEnabled]);

    const logout = useCallback(() => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            setHasAccessState(false);
        } catch (e) {
            console.error('Failed to remove from localStorage', e);
        }
        // Redirect to home page after logging out from PIN gate
        window.location.href = '/';
    }, []);

    return {
        gateEnabled,
        hasAccess: hasAccess(),
        requestAccess,
        logout,
    };
};
