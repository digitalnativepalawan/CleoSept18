
import React from 'react';
import Section from './Section';
import Card from './Card';

const banks = [
    "Asia United Bank Corporation (AUB)",
    "Bank of the Philippine Islands (BPI)",
    "BDO Unibank, Inc.",
    "Cebuana Lhuillier Rural Bank",
    "China Banking Corporation",
    "GoTyme Bank Corporation",
    "Land Bank of The Philippines",
    "Metropolitan Bank and Trust Company (MetroBank)",
    "Philippine National Bank (PNB)",
    "Rizal Commercial Banking Corporation (RCBC)",
    "Security Bank Corporation",
    "Union Bank of the Philippines (UBP)"
];

const wallets = [
    "Coins.ph",
    "GCash (G-Xchange, Inc.)",
    "GrabPay (Gpay Network PH, Inc.)",
    "Maya Philippines, Inc.",
    "PalawanPay (PPS-PEPP Financial Services Corporation)",
    "ShopeePay Philippines, Inc.",
    "Starpay Corporation",
    "USSC Money Services, Inc."
];

const PaymentListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-center text-gray-600">
        <svg className="w-4 h-4 text-primary mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
        <span>{children}</span>
    </li>
);

const Payments: React.FC = () => {
    return (
        <Section title="Make a Payment" subtitle="Use our QR Ph code for seamless payments from your preferred bank or e-wallet.">
            <Card shadow="lg">
                <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                    <div className="lg:col-span-1 text-center flex flex-col items-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Scan to Pay</h3>
                        <div className="bg-white p-4 border rounded-lg shadow-sm inline-block">
                             <img 
                                src="https://id-preview--6747c8dc-fab2-4413-8d2e-7d099ccefffb.lovable.app/assets/qr-payment-BlfmHU0J.png" 
                                alt="Binga Beach QR Ph Code" 
                                className="w-64 h-auto mx-auto"
                            />
                        </div>
                        <p className="mt-4 text-gray-500 text-sm">
                            Make direct payments to <span className="font-semibold text-gray-700">Binga Beach</span>.
                            Our QR Ph code is compatible with the following banking and e-wallet apps.
                        </p>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold text-lg text-gray-800 mb-4 pb-2 border-b">
                                Supported Banks
                            </h4>
                            <ul className="space-y-3 text-sm">
                                {banks.map(bank => <PaymentListItem key={bank}>{bank}</PaymentListItem>)}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold text-lg text-gray-800 mb-4 pb-2 border-b">
                                Supported E-Wallets
                            </h4>
                            <ul className="space-y-3 text-sm">
                                {wallets.map(wallet => <PaymentListItem key={wallet}>{wallet}</PaymentListItem>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </Card>
        </Section>
    );
};

export default Payments;