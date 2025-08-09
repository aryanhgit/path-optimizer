import React from 'react';
import { Link } from 'react-router';

const HomePage = () => {
    return (
        <div className="page-container home-container p-10">
            <section className="hero-section text-center my-10">
                <h1 className="text-5xl font-bold text-green-700 mb-4">Your Smartest Route to Campus.</h1>
                <p className="text-xl text-gray-700 mb-8">RouteOptimizer helps you find the fastest or most eco-friendly path for your college commute. Get to class on time while reducing your carbon footprint.</p>
                <Link to="/route" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out">Find Your Route Now</Link>
            </section>

            <section className="how-it-works-section my-20">
                <h2 className="text-4xl font-bold text-center text-green-700 mb-12">Getting Your Best Route is Easy</h2>
                <div className="flex flex-wrap justify-center gap-10">
                    <div className="how-it-works-step text-center p-6 bg-white rounded-lg shadow-lg max-w-sm">
                        <div className="text-5xl text-green-500 mb-4">📍</div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Step 1: Set Your Path</h3>
                        <p className="text-gray-600">Enter your starting point and your campus destination. Use your current location for instant results.</p>
                    </div>
                    <div className="how-it-works-step text-center p-6 bg-white rounded-lg shadow-lg max-w-sm">
                        <div className="text-5xl text-green-500 mb-4">⏱️/🌿</div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Step 2: Choose Your Priority</h3>
                        <p className="text-gray-600">Select whether you want to optimize for the fastest travel time or the lowest carbon footprint.</p>
                    </div>
                    <div className="how-it-works-step text-center p-6 bg-white rounded-lg shadow-lg max-w-sm">
                        <div className="text-5xl text-green-500 mb-4">🗺️</div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Step 3: Compare & Go!</h3>
                        <p className="text-gray-600">Instantly see a comparison of routes and travel modes. Pick the one that works for you and start your journey.</p>
                    </div>
                </div>
            </section>


            <section className="features-benefits-section my-20 bg-green-50 p-10 rounded-lg shadow-inner">
                <h2 className="text-4xl font-bold text-center text-green-700 mb-12">Travel Smarter, Not Harder</h2>
                <div className="grid md:grid-cols-3 gap-10">
                    <div className="feature-card text-center p-6 bg-white rounded-lg shadow-lg">
                        <div className="text-5xl text-green-600 mb-4">⏰</div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Never Be Late Again</h3>
                        <p className="text-gray-600">Our time optimization finds the quickest combination of walking, biking, or public transport to get you to your lecture hall with minutes to spare. Perfect for those 8 AM classes!</p>
                    </div>
                    <div className="feature-card text-center p-6 bg-white rounded-lg shadow-lg">
                        <div className="text-5xl text-green-600 mb-4">🌳</div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Go Green on Your Commute</h3>
                        <p className="text-gray-600">Want to reduce your environmental impact? Choose the carbon-efficiency option to find the route with the lowest emissions. See your estimated CO₂ savings for every trip you take.</p>
                    </div>
                    <div className="feature-card text-center p-6 bg-white rounded-lg shadow-lg">
                        <div className="text-5xl text-green-600 mb-4">📊</div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">All Your Options in One Place</h3>
                        <p className="text-gray-600">Stop juggling multiple map and transit apps. We compare walking, cycling, and public transport side-by-side, giving you a clear winner based on what matters most to you.</p>
                    </div>
                </div>
            </section>

            <section className="cta-section text-center my-20 p-10 bg-green-600 text-white rounded-lg shadow-xl">
                <h2 className="text-4xl font-bold mb-6 text-">Ready to Transform Your College Commute?</h2>
                <p className="text-xl mb-8">Stop guessing and start optimizing. Find the perfect balance between speed and sustainability for your daily travel.</p>
                <Link to="/route" className="bg-white text-green-700 hover:bg-green-100 font-bold py-4 px-8 rounded-full text-xl transition duration-300 ease-in-out shadow-lg">Plan My First Trip</Link>
            </section>

            <footer className="footer bg-gray-800 text-white p-10 mt-20 rounded-lg shadow-xl">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 ">
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">Route Optimizer</h3>
                        <p className="text-gray-400">Your smart solution for efficient and eco-friendly commutes.</p>
                    </div>
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul>
                            <li className="mb-2"><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                            <li className="mb-2"><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                            <li className="mb-2"><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">Legal</h3>
                        <ul>
                            <li className="mb-2"><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                            <li className="mb-2"><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;
