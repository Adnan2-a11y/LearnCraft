import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">UniPortal</h3>
                        <p className="text-sm leading-relaxed">
                            Simplifying academic management for students and faculty. Access your courses, grades, and schedule in one place.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                         <ul className="space-y-2 text-sm">
                            <li>Email: amust.dam@gmail.com</li>
                            <li>Phone: +88 01324744550</li>
                            <li>Address: · ৫৪/১-২, মির্জাপুর, বিনোদপুর বাজার</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
                    &copy; {new Date().getFullYear()} LearnCraft. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
