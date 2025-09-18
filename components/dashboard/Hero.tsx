import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="text-center py-20 md:py-32 bg-white section-pad" aria-labelledby="hero-title">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 container-site">
                <div className="flex justify-center items-center mb-8">
                    <img src="https://bingabeach.com/wp-content/uploads/2019/02/cropped-bb-logo.png" alt="Binga Beach Logo" className="w-64 md:w-96" />
                </div>
                <h1 id="hero-title" className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
                    The Future of Real World Assets in Palawan
                </h1>
                <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
                    Villas + Sustainable Farming + Smart Hardware + Digital Integration
                </p>
                <div className="flex justify-center space-x-4">
                    <button className="bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-300">
                        Download Deck
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-300">
                        Schedule Call
                    </button>
                </div>

                <div className="mt-24 text-center">
                    <img src="https://bingabeach.com/wp-content/uploads/2025/08/PRA-LOGO-1.png" alt="Philippine Retirement Authority" className="mx-auto mb-4 h-24 md:h-28"/>
                    <p className="text-gray-600 max-w-md mx-auto">
                        First Resort in Palawan accredited by the Philippine Retirement Authority
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;