
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

const PASSKEY_HASH = (getEnv("VITE_PROJECT_PASSKEY_HASH") || "").trim();
const STORAGE_KEY = 'project_access_v1';

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

export const usePasskeyAuth = () => {
    // Initialize state from sessionStorage
    const [hasAccessState, setHasAccessState] = useState(() => {
        try {
            return sessionStorage.getItem(STORAGE_KEY) === '1';
        } catch {
            return false;
        }
    });

    const passkeyEnabled = !!PASSKEY_HASH;

    const hasAccess = useCallback(() => {
        if (!passkeyEnabled) return true;
        return hasAccessState;
    }, [passkeyEnabled, hasAccessState]);

    const requestAccess = useCallback(async (passkey: string): Promise<boolean> => {
        if (!passkeyEnabled) return true;

        const hashedPasskey = await sha256(passkey);
        if (hashedPasskey === PASSKEY_HASH) {
            try {
                sessionStorage.setItem(STORAGE_KEY, '1');
                setHasAccessState(true);
            } catch (e) {
                console.error('Failed to set sessionStorage', e);
            }
            return true;
        }
        return false;
    }, [passkeyEnabled]);

    return {
        passkeyEnabled,
        hasAccess: hasAccess(),
        requestAccess,
    };
};
