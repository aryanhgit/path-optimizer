import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LegalPage = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-slate-100 pt-24 pb-12">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-800">Legal Information</h1>
                    <p className="text-slate-500 mt-2">Last Updated: October 1, 2025</p>
                </div>

                {/* --- Terms & Conditions --- */}
                <section id="terms" className="mb-12 space-y-4 text-slate-600 leading-relaxed">
                    <h2 className="text-3xl font-bold text-slate-800 border-b pb-2 mb-4">Terms & Conditions</h2>
                    <p>Welcome to Route Optimizer! These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Route Optimizer if you do not agree to all of the terms and conditions stated on this page.</p>

                    <h3 className="text-xl font-semibold text-slate-700 pt-4">1. Use of the Service</h3>
                    <p>Route Optimizer provides a platform to help users find efficient and eco-friendly travel routes. The service is intended for personal, non-commercial use only. You agree not to use the service for any unlawful purpose or in any way that might harm, disable, or overburden the service.</p>

                    <h3 className="text-xl font-semibold text-slate-700 pt-4">2. Data Accuracy Disclaimer</h3>
                    <p>The travel times, routes, and CO₂ savings calculations provided by our service are estimates based on publicly available data and our proprietary algorithms. We do not guarantee the accuracy, completeness, or timeliness of this information. Real-world conditions such as traffic, weather, and construction may cause actual results to vary.</p>

                    <h3 className="text-xl font-semibold text-slate-700 pt-4">3. Limitation of Liability</h3>
                    <p>In no event shall Route Optimizer, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort or otherwise. Route Optimizer shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this service.</p>

                    <h3 className="text-xl font-semibold text-slate-700 pt-4">4. Governing Law</h3>
                    <p>These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.</p>
                </section>

                {/* --- Privacy Policy --- */}
                <section id="privacy" className="space-y-4 text-slate-600 leading-relaxed">
                    <h2 className="text-3xl font-bold text-slate-800 border-b pb-2 mb-4">Privacy Policy</h2>
                    <p>Your privacy is important to us. It is Route Optimizer's policy to respect your privacy regarding any information we may collect from you across our website.</p>

                    <h3 className="text-xl font-semibold text-slate-700 pt-4">1. Information We Collect</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Account Information:</strong> When you sign up, we collect your username and email address.</li>
                        <li><strong>Usage Data:</strong> We collect information about how you use our service, such as the origins and destinations you enter (stored anonymously) and your optimization preferences (time vs. eco-friendly).</li>
                        <li><strong>Geolocation Data:</strong> If you grant permission, we may use your device's current location to pre-fill the origin or destination fields. This data is used only for that session and is not stored.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-slate-700 pt-4">2. How We Use Your Information</h3>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Provide, operate, and maintain our service.</li>
                        <li>Improve, personalize, and expand our service.</li>
                        <li>Understand and analyze how you use our service to generate aggregate statistics for the "Campus Champions" page.</li>
                        <li>Communicate with you, either directly or through one of our partners, for customer service, to provide you with updates and other information relating to the website.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-slate-700 pt-4">3. Data Security</h3>
                    <p>We use industry-standard security measures to protect your information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>

                    <h3 className="text-xl font-semibold text-slate-700 pt-4">4. Contact Us</h3>
                    <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@routeoptimizer.com" className="text-teal-600 hover:underline">privacy@routeoptimizer.com</a>.</p>
                </section>
            </div>
        </div>
    );
};

export default LegalPage;