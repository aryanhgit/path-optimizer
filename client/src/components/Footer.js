const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-400 border-t border-gray-700/50">
            <div className="container mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Copyright & Brand Info */}
                <p className="text-sm text-center md:text-left">
                    &copy; {currentYear} <span className="font-semibold text-teal-400">Route Optimizer</span>. All Rights Reserved.
                </p>

                {/* Footer Quick Links */}
                <div className="flex items-center space-x-6">
                    <a href="legal#privacy" className="text-sm hover:text-teal-400 transition-colors duration-300">
                        Privacy Policy
                    </a>
                    <a href="legal#terms" className="text-sm hover:text-teal-400 transition-colors duration-300">
                        Terms of Service
                    </a>
                    <a href="https://aryanrajme.vercel.app/" target='_blank' rel="noreferrer" className="text-sm hover:text-teal-400 transition-colors duration-300">
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;