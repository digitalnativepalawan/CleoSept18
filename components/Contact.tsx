
import React from 'react';
import Card from './Card';
import UiIcon from './UiIcon';

const ContactInfoItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="flex items-start">
        <div>
            <h5 className="font-semibold text-gray-800">{title}</h5>
            <div className="text-gray-600">{children}</div>
        </div>
    </div>
);

const Contact: React.FC = () => {
    return (
        <section className="py-16 md:py-24 bg-white section-pad" aria-labelledby="contact-title">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 container-site">
                <div className="text-center mb-12">
                    <h2 id="contact-title" className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Let's Build the Future of Palawan</h2>
                    <p className="mt-4 text-lg text-gray-500">We welcome inquiries from potential investors, partners, and stakeholders. Reach out to discuss how we can collaborate.</p>
                </div>
                <Card shadow="lg">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                            <div className="space-y-6 mb-8">
                                <ContactInfoItem title="Email Inquiry">
                                    <a href="mailto:david@bingabeach.com" className="text-primary hover:underline">
                                        david@bingabeach.com
                                    </a>
                                </ContactInfoItem>
                                <ContactInfoItem title="Phone">
                                    <a href="tel:+639474443597" className="text-primary hover:underline">
                                        +63 947 444 3597
                                    </a>
                                </ContactInfoItem>
                                <ContactInfoItem title="Office Address">
                                    Lumambong Beach, Palawan Island 5309
                                </ContactInfoItem>
                            </div>
                            <h3 className="text-xl font-bold mb-4 pt-6 border-t">Key Contacts</h3>
                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-semibold text-gray-800">Quennie Azaragga</h5>
                                    <p className="text-sm text-gray-600">Director, Cleopatra SIRV Holdings</p>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-gray-800">David Le</h5>
                                    <p className="text-sm text-gray-600">Managing Director, Binga Beach Brothers Inc.</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" id="fullName" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject (Optional)</label>
                                    <input type="text" id="subject" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea id="message" rows={5} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300">
                                        Send Inquiry
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default Contact;