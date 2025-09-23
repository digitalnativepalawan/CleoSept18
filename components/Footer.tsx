
import React from 'react';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 text-gray-600">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 container-site section-pad">
                <div className="flex flex-wrap justify-around md:justify-between items-center gap-6 mb-10 pb-10 border-b">
                    <div className="flex items-center space-x-3 text-sm">
                        <span className="text-gray-700 font-medium">SEC-Compliant Structure</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                        <span className="text-gray-700 font-medium">ECC & Environmental Stewardship</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                        <span className="text-gray-700 font-medium">TIEZA Tourism Zone Benefits</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                        <span className="text-gray-700 font-medium">SIRV Residency Pathway</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-sm">
                    <div className="col-span-2">
                        <h5 className="font-bold text-gray-800">Cleopatra SIRV × Binga Beach Brothers</h5>
                        <p className="mt-2">A balanced alliance delivering real-world assets in Palawan: eco-villas & resort ops, farm-to-table agriculture, hardware & construction supply, and compliant structures with transparent reporting.</p>
                        <form className="mt-4 flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Quarterly updates are paused" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none text-gray-500 cursor-not-allowed" />
                            <button type="button" disabled className="bg-gray-200 text-gray-500 px-6 py-2 border border-gray-300 rounded-lg font-medium whitespace-nowrap cursor-not-allowed">Join</button>
                        </form>
                        <SocialLinks className="mt-6" />
                    </div>

                    <nav aria-labelledby="footer-nav-navigate">
                        <h6 id="footer-nav-navigate" className="font-semibold text-gray-800 mb-3">Navigate</h6>
                        <ul className="space-y-2">
                            <li><a href="#executive-summary" className="hover:text-blue-500">Executive Summary</a></li>
                            <li><a href="#market-analysis" className="hover:text-blue-500">Market</a></li>
                            <li><a href="#financial-projections" className="hover:text-blue-500">Financials</a></li>
                            <li><a href="#risk-assessment" className="hover:text-blue-500">Risks</a></li>
                            <li><a href="#action-plan" className="hover:text-blue-500">Timeline</a></li>
                        </ul>
                    </nav>

                    <nav aria-labelledby="footer-nav-verticals">
                        <h6 id="footer-nav-verticals" className="font-semibold text-gray-800 mb-3">Verticals</h6>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-500">Resort & Eco-Villas</a></li>
                            <li><a href="#" className="hover:text-blue-500">Farming & Agri-Tourism</a></li>
                            <li><a href="#" className="hover:text-blue-500">Hardware & Construction</a></li>
                            <li><a href="#" className="hover:text-blue-500">Third-Party Asset Mgmt</a></li>
                        </ul>
                    </nav>

                    <nav aria-labelledby="footer-nav-resources">
                        <h6 id="footer-nav-resources" className="font-semibold text-gray-800 mb-3">Resources</h6>
                        <ul className="space-y-2">
                            <li><a href="/Binga_Beach_Deck.pdf" download className="hover:text-blue-500">Download Deck (PDF)</a></li>
                            <li><a href="#contact-title" className="hover:text-blue-500">Schedule Briefing</a></li>
                            <li><a href="#" className="hover:text-blue-500">FAQ</a></li>
                            <li><a href="#contact-title" className="hover:text-blue-500">Contact</a></li>
                        </ul>
                    </nav>

                    <div>
                        <h6 className="font-semibold text-gray-800 mb-3">Contact</h6>
                        <address className="not-italic space-y-2">
                            <p>Lumambong Beach, Palawan Island 5309</p>
                            <p>david@bingabeach.com</p>
                            <p>+63 947 444 3597</p>
                        </address>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-xs">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                        <div className="flex items-center flex-wrap gap-2 md:hidden">
                            <span className="px-6 py-4 rounded-lg bg-blue-100 text-blue-800 font-semibold text-sm">SEC</span>
                            <span className="px-6 py-4 rounded-lg bg-green-100 text-green-800 font-semibold text-sm">ECC</span>
                            <span className="px-6 py-4 rounded-lg bg-yellow-100 text-yellow-800 font-semibold text-sm">TIEZA</span>
                            <span className="px-6 py-4 rounded-lg bg-purple-100 text-purple-800 font-semibold text-sm">SIRV</span>
                        </div>
                        <span className="text-gray-500 leading-relaxed">SEC Reg. Nos.: Cleopatra SIRV Holdings Inc. — [xxxxxx]; Binga Beach Brothers Inc. — [xxxxxx]</span>
                    </div>
                    <p className="mb-4 text-gray-500">
                        <span className="font-bold text-gray-700">Disclosures.</span> This material is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy securities. Any offering will be made only to qualified or accredited investors pursuant to formal offering documents and in compliance with applicable securities laws. Forward-looking statements involve risks and uncertainties; actual results may differ materially. Obtain independent legal, tax, and investment advice.
                    </p>
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <p>&copy; 2025 Cleopatra SIRV Holdings Inc. & Binga Beach Brothers Inc. All rights reserved.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-500">Privacy</a>
                            <a href="#" className="hover:text-blue-500">Terms</a>
                            <a href="#" className="hover:text-blue-500">Disclosures</a>
                            <a href="#" className="hover:text-blue-500">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;