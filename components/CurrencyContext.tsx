import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'PHP' | 'USD' | 'EUR';

export const currencySymbols: Record<Currency, string> = {
    PHP: '₱',
    USD: '$',
    EUR: '€',
};

interface CurrencyContextType {
    selectedCurrency: Currency;
    setSelectedCurrency: (currency: Currency) => void;
    currencySymbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedCurrency, setSelectedCurrency] = useState<Currency>('PHP');

    const value = {
        selectedCurrency,
        setSelectedCurrency,
        currencySymbol: currencySymbols[selectedCurrency],
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};
