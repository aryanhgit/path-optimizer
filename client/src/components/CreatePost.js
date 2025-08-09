import React from 'react';

const CreatePostPage = () => {
    return (
        <div className="page-container post-container">
            <section className="hero-section text-center my-10">
                <h1 className="text-5xl font-bold text-green-700 mb-4">Our Collective Journey</h1>
                <div className="flex justify-center space-x-8 my-8">
                    <div className="stat-card bg-green-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-4xl font-bold text-green-800">1200 kg</h2>
                        <p className="text-lg text-gray-700">Community CO₂ Saved This Week</p>
                        <p className="text-sm text-gray-500">(That's enough to power a lecture hall for 3 days!)</p>
                    </div>
                    <div className="stat-card bg-blue-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-4xl font-bold text-blue-800">350</h2>
                        <p className="text-lg text-gray-700">Total Green Trips Today</p>
                    </div>
                    <div className="stat-card bg-yellow-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-4xl font-bold text-yellow-800">500 hours</h2>
                        <p className="text-lg text-gray-700">Collective Time Saved This Month</p>
                    </div>
                </div>
            </section>

            <section className="personal-impact-dashboard my-20 bg-green-50 p-10 rounded-lg shadow-inner">
                <h2 className="text-4xl font-bold text-center text-green-700 mb-12">Your Green Footprint</h2>
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="your-stats bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Stats</h3>
                        <p className="text-xl text-gray-700 mb-2"><strong>Total CO₂ Saved:</strong> [Your Number] kg</p>
                        <p className="text-xl text-gray-700 mb-2"><strong>Your Best Streak:</strong> [Your Number] Days</p>
                        <p className="text-xl text-gray-700 mb-2"><strong>Badges Unlocked:</strong> [Number] / [Total Badges]</p>
                    </div>
                    <div className="visualizations bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Visualizations</h3>
                        {/* Placeholder for Pie Chart */}
                        <div className="mb-6">
                            <h4 className="text-xl font-medium text-gray-700 mb-2">Travel Modes</h4>
                            <div className="bg-gray-200 h-40 flex items-center justify-center rounded-lg">
                                <p className="text-gray-500">Pie Chart Placeholder (e.g., 60% Walking, 40% Public Transport)</p>
                            </div>
                        </div>
                        {/* Placeholder for Line Graph */}
                        <div>
                            <h4 className="text-xl font-medium text-gray-700 mb-2">CO₂ Savings (Last 30 Days)</h4>
                            <div className="bg-gray-200 h-40 flex items-center justify-center rounded-lg">
                                <p className="text-gray-500">Line Graph Placeholder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="leaderboards-section my-20">
                <h2 className="text-4xl font-bold text-center text-green-700 mb-12">Climb the Ranks</h2>
                <div className="flex justify-center mb-8">
                    <div className="tabs flex space-x-4 bg-gray-200 p-2 rounded-lg">
                        <button className="tab-button px-4 py-2 rounded-md hover:bg-green-300 transition duration-300">
                            🏆 Eco-Champions
                        </button>
                        <button className="tab-button px-4 py-2 rounded-md hover:bg-green-300 transition duration-300">
                            ⏱️ Time Wizards
                        </button>
                        <button className="tab-button px-4 py-2 rounded-md hover:bg-green-300 transition duration-300">
                            🏃 Active Legends
                        </button>
                    </div>
                </div>

                <div className="filters flex justify-center space-x-4 mb-8">
                    <select className="border p-2 rounded-md">
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>All Time</option>
                    </select>
                    <select className="border p-2 rounded-md">
                        <option>My University</option>
                        <option>All Universities</option>
                        <option>My Major</option>
                    </select>
                </div>

                <div className="leaderboard-list bg-white p-6 rounded-lg shadow-lg">
                    {/* Placeholder for leaderboard entries */}
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center py-2 border-b last:border-b-0">
                            <span className="font-semibold text-lg">1. John Doe</span>
                            <span className="text-green-600">150 kg CO₂ Saved</span>
                        </li>
                        <li className="flex justify-between items-center py-2 border-b last:border-b-0">
                            <span className="font-semibold text-lg">2. Jane Smith</span>
                            <span className="text-green-600">120 kg CO₂ Saved</span>
                        </li>
                        {/* Add more leaderboard entries as needed */}
                    </ul>
                </div>
            </section>

            <section className="community-feed-section my-20">
                <h2 className="text-4xl font-bold text-center text-green-700 mb-12">The Hub Feed</h2>
                <div className="feed-container bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                    <div className="feed-post border-b pb-4 mb-4">
                        <p className="text-gray-800 mb-2"><span className="font-semibold">John Doe</span> just unlocked the "Green Commuter" badge! 🎉</p>
                        <div className="flex items-center space-x-4 text-gray-500 text-sm">
                            <button className="flex items-center space-x-1 hover:text-green-600"><span role="img" aria-label="thumbs up">👍</span> 5</button>
                            <button className="flex items-center space-x-1 hover:text-green-600"><span role="img" aria-label="fire">🔥</span> 3</button>
                            <button className="flex items-center space-x-1 hover:text-green-600"><span role="img" aria-label="seedling">🌱</span> 2</button>
                            <input type="text" placeholder="Add a comment..." className="flex-grow border rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                    </div>
                    <div className="feed-post border-b pb-4 mb-4">
                        <p className="text-gray-800 mb-2"><span className="font-semibold">Jane Smith</span> saved 5 kg of CO₂ this week! Keep it up! 🌳</p>
                        <div className="flex items-center space-x-4 text-gray-500 text-sm">
                            <button className="flex items-center space-x-1 hover:text-green-600"><span role="img" aria-label="thumbs up">👍</span> 8</button>
                            <button className="flex items-center space-x-1 hover:text-green-600"><span role="img" aria-label="fire">🔥</span> 6</button>
                            <button className="flex items-center space-x-1 hover:text-green-600"><span role="img" aria-label="seedling">🌱</span> 4</button>
                            <input type="text" placeholder="Add a comment..." className="flex-grow border rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="challenges-achievements-section my-20">
                <h2 className="text-4xl font-bold text-center text-green-700 mb-12">Take the Challenge</h2>
                <div className="weekly-challenge bg-green-50 p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
                    <h3 className="text-2xl font-semibold text-green-800 mb-4">Weekly Community Challenge:</h3>
                    <p className="text-xl text-gray-700 mb-6">Can our campus save 500 kg of CO₂ before Friday? Let's go!</p>
                    <div className="progress-bar-container bg-gray-200 rounded-full h-8 mb-4">
                        <div className="progress-bar bg-green-500 h-full rounded-full text-white flex items-center justify-center" style={{ width: '60%' }}>
                            60%
                        </div>
                    </div>
                    <p className="text-lg text-gray-600">300 kg CO₂ Saved So Far!</p>
                </div>

                <div className="achievements-list my-12">
                    <h3 className="text-3xl font-bold text-center text-green-700 mb-8">Your Achievements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="achievement-card bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-5xl mb-3">🏅</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Green Commuter</h4>
                            <p className="text-gray-600">Completed 10 eco-friendly commutes.</p>
                        </div>
                        <div className="achievement-card bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-5xl mb-3">🌟</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2"></h4>
                            <p className="text-gray-600">
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CreatePostPage;
