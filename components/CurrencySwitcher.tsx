import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, Currency, currencySymbols } from './CurrencyContext';

const CurrencySwitcher: React.FC = () => {
    const { selectedCurrency, setSelectedCurrency } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currencies: Currency[] = ['PHP', 'USD', 'EUR'];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (currency: Currency) => {
        setSelectedCurrency(currency);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span className="font-medium text-sm text-gray-800">{currencySymbols[selectedCurrency]} {selectedCurrency}</span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7 7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200/80 z-10">
                    <ul className="py-1">
                        {currencies.map(currency => (
                            <li key={currency}>
                                <button
                                    onClick={() => handleSelect(currency)}
                                    className={`w-full text-left px-4 py-2 text-sm ${selectedCurrency === currency ? 'font-semibold bg-gray-100 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    {currencySymbols[currency]} {currency}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CurrencySwitcher;
