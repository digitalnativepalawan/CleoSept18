



import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/dashboard/Hero';
import ExecutiveSummary from './components/ExecutiveSummary';
import MarketAnalysis from './components/MarketAnalysis';
import CompetitiveLandscape from './components/CompetitiveLandscape';
import BusinessModel from './components/BusinessModel';
import FinancialProjections from './components/FinancialProjections';
import RiskAssessment from './components/RiskAssessment';
import ActionPlan from './components/ActionPlan';
import Funding from './components/dashboard/Funding';
import ESGCommitment from './components/ESGCommitment';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import LoginModal from './components/auth/LoginModal';
import SignUpModal from './components/auth/SignUpModal';
import Dashboard from './components/dashboard/Dashboard';
import PinGate from './components/PinGate';
import PortalLogin from './components/auth/PortalLogin';

const LandingPage: React.FC<{ onLogin: () => void, onSignUp: () => void, onPortalClick: () => void }> = ({ onLogin, onSignUp, onPortalClick }) => (
    <div className="bg-white">
        <Header onLoginClick={onLogin} onSignUpClick={onSignUp} onPortalClick={onPortalClick} />
        <main>
            <Hero />
            <ExecutiveSummary />
            <MarketAnalysis />
            <CompetitiveLandscape />
            <BusinessModel />
            <FinancialProjections />
            <RiskAssessment />
            <ActionPlan />
            <Funding />
            <ESGCommitment />
            <Contact />
        </main>
        <Footer />
    </div>
);


const AppContent: React.FC = () => {
    const { currentUser, loading, login, signup } = useAuth();
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    const [view, setView] = useState<'landing' | 'portal'>('landing');


    const handleOpenLogin = () => {
        setSignUpModalOpen(false);
        setLoginModalOpen(true);
    };

    const handleOpenSignUp = () => {
        setLoginModalOpen(false);
        setSignUpModalOpen(true);
    };
    
    const handleRoleSelect = () => {
        handleOpenLogin();
    };

    const handleDevLogin = async () => {
        // Simple dev login for quick access to dashboard
        const devEmail = 'admin@dev.local';
        const devPassword = 'password';
        try {
            // First, try to log in in case the user already exists
            await login(devEmail, devPassword);
        } catch (error) {
            // If login fails, the user might not exist.
            // Let's try to sign them up. The signup function also logs them in.
            try {
                await signup(devEmail, devPassword);
            } catch (signupError) {
                // If signup also fails (e.g. user exists with wrong password), alert the dev.
                console.error("Developer login failed:", signupError);
                alert("Developer login failed. You may need to clear application storage and try again.");
            }
        }
    };


    if (loading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-500 animate-pulse">Loading Application...</p>
            </div>
        );
    }
    
    if (view === 'landing') {
        const handleLoginClick = () => {
            setView('portal');
            handleOpenLogin();
        };
        const handleSignUpClick = () => {
            setView('portal');
            handleOpenSignUp();
        };
        const handlePortalClick = () => {
            setView('portal');
        };

        return <LandingPage onLogin={handleLoginClick} onSignUp={handleSignUpClick} onPortalClick={handlePortalClick} />;
    }

    if (currentUser) {
        return (
            <PinGate>
                <Dashboard onSwitchToLanding={() => setView('landing')} />
            </PinGate>
        );
    }

    return (
        <>
            <PortalLogin onSelectRole={handleRoleSelect} onDevLogin={handleDevLogin} />
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setLoginModalOpen(false)} 
                onSwitchToSignUp={handleOpenSignUp} 
            />
            <SignUpModal 
                isOpen={isSignUpModalOpen} 
                onClose={() => setSignUpModalOpen(false)} 
                onSwitchToLogin={handleOpenLogin}
            />
        </>
    );
};


const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;