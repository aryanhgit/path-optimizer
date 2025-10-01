import { Link } from "react-router-dom";

const PrimaryButton = ({ children, to }) => (
    <Link 
        to={to} 
        className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg hover:shadow-2xl hover:shadow-teal-500/50 transition duration-300 ease-in-out transform hover:scale-[1.02]"
    >
        {children}
    </Link>
);

const SectionHeading = ({ children }) => (
    <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16">
        {children}
    </h2>
);

// --- HomePage Component ---

const HomePage = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-24 pb-20"> {/* Added pt-24 for spacing below fixed navbar */}
            
            {/* Hero Section */}
            <section className="text-center max-w-6xl mx-auto my-16 p-12 bg-white rounded-2xl shadow-2xl">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                    Your Smartest Route to <span className="text-teal-600">Campus.</span>
                </h1>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                    RouteOptimizer helps you find the fastest or most <span className="text-teal-600">eco-friendly path</span> for your college commute. Get to class on time while reducing your carbon footprint.
                </p>
                <PrimaryButton to="/route">
                    Find Your Route Now ➔
                </PrimaryButton>
            </section>

            {/* How It Works Section */}
            <section className="my-24 max-w-7xl mx-auto px-6">
                <SectionHeading>
                    Getting Your Best Route is Simple
                </SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Step 1 Card */}
                    <div className="text-center p-8 bg-white rounded-2xl shadow-xl border-t-4 border-teal-500 transition duration-500 hover:shadow-2xl hover:shadow-teal-200/50">
                        <div className="text-6xl mb-6 text-teal-500">📍</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">1. Set Your Path</h3>
                        <p className="text-gray-600">Enter your starting point and your campus destination. We utilize real-time data for instant results.</p>
                    </div>
                    {/* Step 2 Card */}
                    <div className="text-center p-8 bg-white rounded-2xl shadow-xl border-t-4 border-teal-500 transition duration-500 hover:shadow-2xl hover:shadow-teal-200/50">
                        <div className="text-6xl mb-6 text-teal-500">⚡/🍃</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">2. Choose Your Priority</h3>
                        <p className="text-gray-600">Select whether you want to optimize for the fastest travel time or the lowest carbon footprint.</p>
                    </div>
                    {/* Step 3 Card */}
                    <div className="text-center p-8 bg-white rounded-2xl shadow-xl border-t-4 border-teal-500 transition duration-500 hover:shadow-2xl hover:shadow-teal-200/50">
                        <div className="text-6xl mb-6 text-teal-500">📊</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">3. Compare & Go!</h3>
                        <p className="text-gray-600">Instantly see a comparison of travel modes. Pick the best route and start your sustainable journey.</p>
                    </div>
                </div>
            </section>


            {/* Features & Benefits Section */}
            <section className="my-24 bg-teal-50 max-w-7xl mx-auto p-16 rounded-2xl shadow-inner border border-teal-100">
                <SectionHeading>
                    Travel Smarter, Not Harder
                </SectionHeading>
                <div className="grid md:grid-cols-3 gap-10">
                    {/* Feature Card 1 */}
                    <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                        <div className="text-5xl mb-4 text-teal-600">⏰</div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Never Be Late Again</h3>
                        <p className="text-gray-600">Our time optimization finds the quickest combination of walking, biking, or public transport to get you to your lecture hall with minutes to spare.</p>
                    </div>
                    {/* Feature Card 2 */}
                    <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                        <div className="text-5xl mb-4 text-teal-600">🌳</div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Go Green on Your Commute</h3>
                        <p className="text-gray-600">Choose the carbon-efficiency option to find the route with the lowest emissions. See your estimated CO₂ savings for every trip you take.</p>
                    </div>
                    {/* Feature Card 3 */}
                    <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                        <div className="text-5xl mb-4 text-teal-600">🗺️</div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">All Options in One Place</h3>
                        <p className="text-gray-600">Stop juggling multiple map and transit apps. We compare every mode of transport side-by-side, giving you a clear winner.</p>
                    </div>
                </div>
            </section>

            {/* Final Call to Action Section */}
            <section className="text-center my-24 max-w-7xl mx-auto p-16 bg-teal-600 text-white rounded-2xl shadow-2xl">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Transform Your College Commute?</h2>
                <p className="text-xl mb-10 opacity-90">Stop guessing and start optimizing. Find the perfect balance between speed and sustainability for your daily travel.</p>
                <Link 
                    to="/route" 
                    className="inline-block bg-white hover:text-teal-700 text-teal-600 font-bold py-4 px-10 rounded-full text-xl shadow-lg hover:shadow-2xl hover:shadow-teal-500/50 transition duration-300 ease-in-out transform hover:scale-[1.02]"
                >
                    Plan My First Trip ➔
                </Link>
            </section>

        </div>
    );
}

export default HomePage;