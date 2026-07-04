import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-white dark:bg-[#1B3C53] border-t border-[#E2E8F0] dark:border-[#64748B] text-[#1B3C53] dark:text-[#EEEEEE] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-5">
                        <div className="flex items-center gap-0.5 tracking-wider font-black text-2xl select-none">
                            <span className="text-slate-800 dark:text-white transition-colors duration-300">RENT</span>
                            <span className="text-[#76ABAE]">IVA</span>
                        </div>
                        <p className="text-sm font-normal text-[#1B3C53]/80 dark:text-[#EEEEEE]/70 max-w-sm leading-relaxed">
                            A transparent and secure rental marketplace connecting tenants and property owners. Discover, book, and pay reservation fees online with absolute peace of mind.
                        </p>
                        {/* Social Icons */}
                        <div className="flex items-center gap-4 pt-2">
                            <span className="p-2 rounded-lg border border-[#E2E8F0] dark:border-[#64748B] hover:border-[#76ABAE] dark:hover:border-[#76ABAE] hover:text-[#76ABAE] dark:hover:text-[#76ABAE] transition-all duration-200 cursor-default">
                                <FaFacebookF size={18} />
                            </span>
                            <span className="p-2 rounded-lg border border-[#E2E8F0] dark:border-[#64748B] hover:border-[#76ABAE] dark:hover:border-[#76ABAE] hover:text-[#76ABAE] dark:hover:text-[#76ABAE] transition-all duration-200 cursor-default">
                                <FaTwitter size={18} />
                            </span>
                            <span className="p-2 rounded-lg border border-[#E2E8F0] dark:border-[#64748B] hover:border-[#76ABAE] dark:hover:border-[#76ABAE] hover:text-[#76ABAE] dark:hover:text-[#76ABAE] transition-all duration-200 cursor-default">
                                <FaInstagram size={18} />
                            </span>
                            <span className="p-2 rounded-lg border border-[#E2E8F0] dark:border-[#64748B] hover:border-[#76ABAE] dark:hover:border-[#76ABAE] hover:text-[#76ABAE] dark:hover:text-[#76ABAE] transition-all duration-200 cursor-default">
                                <FaLinkedinIn size={18} />
                            </span>
                        </div>
                    </div>

                    {/* Explore Links */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#1B3C53]/60 dark:text-[#EEEEEE]/50">
                            Explore
                        </h3>
                        <ul className="space-y-2.5 text-sm font-medium">
                            <li>
                                <span className="hover:text-[#76ABAE] transition-colors cursor-default">Find Properties</span>
                            </li>
                            <li>
                                <span className="hover:text-[#76ABAE] transition-colors cursor-default">List Your Property</span>
                            </li>
                            <li>
                                <span className="hover:text-[#76ABAE] transition-colors cursor-default">Pricing Plans</span>
                            </li>
                            <li>
                                <span className="hover:text-[#76ABAE] transition-colors cursor-default">Testimonials</span>
                            </li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#1B3C53]/60 dark:text-[#EEEEEE]/50">
                            Company
                        </h3>
                        <ul className="space-y-2.5 text-sm font-medium">
                            <li>
                                <span className="hover:text-[#76ABAE] transition-colors cursor-default">About Us</span>
                            </li>
                            <li>
                                <span className="hover:text-[#76ABAE] transition-colors cursor-default">Contact Support</span>
                            </li>
                            <li>
                                <span className="hover:text-[#76ABAE] transition-colors cursor-default">Insights & News</span>
                            </li>
                            <li>
                                <span className="hover:text-[#76ABAE] transition-colors cursor-default">Careers</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Support Info */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#1B3C53]/60 dark:text-[#EEEEEE]/50">
                            Contact
                        </h3>
                        <ul className="space-y-3 text-sm font-medium">
                            <li className="flex items-center gap-2.5">
                                <MapPin size={16} className="text-[#76ABAE] shrink-0" />
                                <span className="text-[#1B3C53]/80 dark:text-[#EEEEEE]/80">Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone size={16} className="text-[#76ABAE] shrink-0" />
                                <span className="text-[#1B3C53]/80 dark:text-[#EEEEEE]/80">+880 1234 5678</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail size={16} className="text-[#76ABAE] shrink-0" />
                                <span className="text-[#1B3C53]/80 dark:text-[#EEEEEE]/80">support@rentiva.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar Container */}
                <div className="mt-12 pt-8 border-t border-[#E2E8F0] dark:border-[#64748B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#1B3C53]/60 dark:text-[#EEEEEE]/50">
                    <p>© {new Date().getFullYear()} RENTIVA. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-[#76ABAE] transition-colors cursor-default">Privacy Policy</span>
                        <span className="hover:text-[#76ABAE] transition-colors cursor-default">Terms of Service</span>
                        <span className="hover:text-[#76ABAE] transition-colors cursor-default">Cookie Settings</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}