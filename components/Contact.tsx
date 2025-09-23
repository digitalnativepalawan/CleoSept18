
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
                            <form action="#" method="POST" className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label htmlFor="name" className="sr-only">Full name</label>
                                    <input type="text" name="name" id="name" autoComplete="name" placeholder="Full name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input type="email" name="email" id="email" autoComplete="email" placeholder="Email address" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"/>
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">Message</label>
                                    <textarea name="message" id="message" rows={4} placeholder="Your message" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300">
                                        Submit
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