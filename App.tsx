
import React, { useState, useEffect } from 'react';
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
import Chatbot from './components/Chatbot';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import LoginModal from './components/auth/LoginModal';
import SignUpModal from './components/auth/SignUpModal';
import Dashboard from './components/dashboard/Dashboard';
import PinGate from './components/PinGate';
import PortalLogin from './components/auth/PortalLogin';
import BlogLayout from './components/blog/BlogLayout';
import { BlogPost } from './components/dashboard/BlogView';

const BLOG_POSTS_KEY = 'binga_blog_posts';

const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Why Palawan is the Best Place for Your Next Investment',
    author: 'David Le',
    publishDate: '2025-08-15',
    status: 'Published',
    imageUrl: 'https://images.unsplash.com/photo-1517332800253-3531b54a750d?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Discover the untapped potential of Palawan, a tropical paradise that offers more than just stunning beaches. We delve into the economic growth, infrastructure development, and unique investment opportunities that make it a prime location for real-world assets.',
    content: `Palawan has consistently been voted one of the world's best islands, and for good reason. Its pristine beaches, crystal-clear waters, and lush jungles attract millions of tourists every year. But beyond its natural beauty lies a rapidly growing economy ripe for investment.\n\nThe local government is heavily investing in infrastructure, including the expansion of airports and the improvement of road networks. This makes areas like San Vicente, where Binga Beach is located, more accessible than ever before.\n\nOur project at Binga Beach leverages this growth by offering a unique blend of luxury eco-villas, sustainable farming, and modern amenities. By investing with us, you're not just buying a property; you're becoming part of a sustainable community with strong growth potential.`,
  },
  {
    id: 2,
    title: 'Our Commitment to ESG: Building a Sustainable Future',
    author: 'Quennie Azaragga',
    publishDate: '2025-08-22',
    status: 'Published',
    imageUrl: 'https://images.unsplash.com/photo-1624953901786-22d99901584c?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'At Binga Beach, sustainability is not an afterthought—it\'s at the core of our business model. Learn about our Environmental, Social, and Governance (ESG) initiatives and how we are creating a positive impact on the local community and environment.',
    content: `From day one, our vision for Binga Beach was to create a destination that coexists harmoniously with its environment.\n\nEnvironmental: Our resort is powered by a 10kVA solar grid, minimizing our carbon footprint. We employ advanced water conservation techniques and are dedicated to protecting the local biodiversity.\n\nSocial: We believe in inclusive growth. We prioritize hiring from the local community, providing stable employment and skills training. Our farm-to-table initiative supports local farmers and ensures our guests enjoy the freshest produce.\n\nGovernance: Transparency is key. We operate with a fully SEC-compliant corporate structure and provide our investors with regular, detailed reports on both financial performance and ESG impact.\n\nInvesting in Binga Beach means investing in a project that values people and the planet as much as profit.`,
  },
  {
    id: 3,
    title: 'The Digital Nomad\'s Guide to Palawan',
    author: 'Guest Writer',
    publishDate: '2025-09-01',
    status: 'Draft',
    imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Thinking of swapping your office for a beachfront view? Palawan is quickly becoming a hotspot for remote workers. Here\'s everything you need to know about connectivity, community, and making the most of your work-life balance in paradise.',
    content: 'The dream of working from a laptop on the beach is now a reality in Palawan. With improving internet infrastructure, including Starlink availability, staying connected is easier than ever.\n\nThis post will explore the best co-working spots, cafes with reliable Wi-Fi, visa options for long-term stays, and how to connect with the growing community of digital nomads and entrepreneurs in places like El Nido, Port Barton, and San Vicente.\n\nWe will also cover how Binga Beach is catering to this demographic with smart-enabled villas designed for both productivity and relaxation.',
  },
];


const LandingPageContent: React.FC = () => (
    <>
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
    </>
);


const AppContent: React.FC = () => {
    const { currentUser, loading, login, signup } = useAuth();
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    const [view, setView] = useState<'landing' | 'portal' | 'blog' | 'blogPost'>('landing');
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        try {
            const storedPosts = localStorage.getItem(BLOG_POSTS_KEY);
            if (storedPosts) {
                setBlogPosts(JSON.parse(storedPosts));
            } else {
                setBlogPosts(initialBlogPosts);
                localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(initialBlogPosts));
            }
        } catch (error) {
            console.error("Failed to load blog posts:", error);
            setBlogPosts(initialBlogPosts);
        }
    }, []);

    useEffect(() => {
        if (blogPosts.length > 0) {
            localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(blogPosts));
        }
    }, [blogPosts]);

    const handleAddBlogPost = (newPost: Omit<BlogPost, 'id'>) => {
        setBlogPosts(prevPosts => [
            { ...newPost, id: Date.now() },
            ...prevPosts
        ]);
    };

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
        const devEmail = 'admin@dev.local';
        const devPassword = 'password';
        try {
            await login(devEmail, devPassword);
        } catch (error) {
            try {
                await signup(devEmail, devPassword);
            } catch (signupError) {
                console.error("Developer login failed:", signupError);
                alert("Developer login failed. You may need to clear application storage and try again.");
            }
        }
    };

    const handleViewBlog = () => {
        setView('blog');
        setSelectedPost(null);
    };
    
    const handleViewBlogPost = (post: BlogPost) => {
        setSelectedPost(post);
        setView('blogPost');
    };

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

    if (loading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-500 animate-pulse">Loading Application...</p>
            </div>
        );
    }
    
    if (view === 'portal') {
        if (currentUser) {
            return (
                <PinGate>
                    <Dashboard 
                        onSwitchToLanding={() => setView('landing')}
                        blogPosts={blogPosts}
                        onAddBlogPost={handleAddBlogPost} 
                    />
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
    }
    
    // Landing Page, Blog, and Single Post views share a common layout
    return (
        <div className="bg-white">
            <Header 
                onLoginClick={handleLoginClick} 
                onSignUpClick={handleSignUpClick} 
                onPortalClick={handlePortalClick}
                onBlogClick={handleViewBlog}
            />
            <main>
                {view === 'landing' && <LandingPageContent />}
                {(view === 'blog' || view === 'blogPost') && (
                    <BlogLayout
                        posts={blogPosts.filter(p => p.status === 'Published')}
                        selectedPost={selectedPost}
                        onSelectPost={handleViewBlogPost}
                        onBackToBlogList={handleViewBlog}
                    />
                )}
            </main>
            <Footer />
            <Chatbot />
        </div>
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
