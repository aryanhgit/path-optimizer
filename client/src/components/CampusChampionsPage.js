import React, { useState } from 'react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector,
    LineChart, CartesianGrid, XAxis, YAxis, Legend, Line
} from 'recharts';

// --- Sample Data Structures ---

// Data for the top community stats cards
const communityStats = {
    co2SavedThisWeek: 1200,
    greenTripsToday: 350,
    timeSavedThisMonth: 500,
};

// Data for the logged-in user's personal dashboard
const userStats = {
    totalCo2Saved: 215,
    bestStreak: 14
};

// Data for the visualization charts
const graphData = {
    travelModes: [
        { name: 'Walking', value: 400 },
        { name: 'Biking', value: 300 },
        { name: 'Public Transport', value: 200 },
    ],
    co2Savings: [
        { day: 'Day 1', co2Saved: 5 }, { day: 'Day 2', co2Saved: 8 },
        { day: 'Day 3', co2Saved: 6 }, { day: 'Day 4', co2Saved: 10 },
        // ... more data points
    ],
};

const weeklyLogData = [
    { day: 'Monday', date: 'Sep 29', co2Saved: 2.1, mode: 'Electric Cycle' },
    { day: 'Sunday', date: 'Sep 28', co2Saved: 1.5, mode: 'Walking' },
    { day: 'Saturday', date: 'Sep 27', co2Saved: 0, mode: 'Rest Day' },
    { day: 'Friday', date: 'Sep 26', co2Saved: 3.2, mode: 'Electric Cycle' },
    { day: 'Thursday', date: 'Sep 25', co2Saved: 1.8, mode: 'Bus' },
    { day: 'Wednesday', date: 'Sep 24', co2Saved: 1.6, mode: 'Walking' },
    { day: 'Tuesday', date: 'Sep 23', co2Saved: 2.5, mode: 'Electric Cycle' },
];

// Data for the Eco-Champions leaderboard
const leaderboardData = [
    { rank: 1, name: 'John Doe', co2Saved: 150 },
    { rank: 2, name: 'Jane Smith', co2Saved: 120 },
    { rank: 3, name: 'Alex Ray', co2Saved: 115 },
    { rank: 4, name: 'Emily White', co2Saved: 98 },
    { rank: 5, name: 'Chris Green', co2Saved: 95 },
];

// A custom shape to enhance the Pie Chart's hover effect
const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

    return (
        <g>
            <text x={cx} y={cy - 12} textAnchor="middle" fill={fill} className="text-xl font-bold">
                {payload.name}
            </text>
            <text x={cx} y={cy + 12} textAnchor="middle" fill="#64748b" className="text-lg">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
        </g>
    );
};

const PieChartComponent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const COLORS = ['#0d9488', '#14b8a6', '#5eead4']; // Teal-600, Teal-500, Teal-300

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={graphData.travelModes}
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={140}
                    fill="#0d9488"
                    dataKey="value"
                    nameKey="name"
                    onMouseEnter={onPieEnter}
                    style={{ cursor: "pointer", outline: "none" }}
                >
                    {graphData.travelModes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};


const LineChartComponent = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={graphData.co2Savings}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '0.75rem',
                        border: '1px solid #e2e8f0',
                    }}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="co2Saved"
                    name="CO₂ Saved (kg)"
                    stroke="#0d9488" // Teal-600
                    strokeWidth={3}
                    activeDot={{ r: 8, fill: '#0d9488' }}
                    dot={{ stroke: '#0d9488', strokeWidth: 1, r: 4 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};


const CampusChampionsPage = () => {
    return (
        <div className="min-h-screen bg-slate-100 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- Hero Section --- */}
                <section className="text-center my-10">
                    <h1 className="text-5xl font-extrabold text-slate-800 mb-4">Campus Champions</h1>
                    <p className="text-xl text-slate-500 mb-10">See our collective impact and your personal contribution.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-teal-500">
                            <h2 className="text-5xl font-bold text-teal-600">{communityStats.co2SavedThisWeek.toLocaleString()} kg</h2>
                            <p className="text-lg text-slate-600 mt-2">Community CO₂ Saved This Week</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-teal-500">
                            <h2 className="text-5xl font-bold text-teal-600">{communityStats.greenTripsToday}</h2>
                            <p className="text-lg text-slate-600 mt-2">Total Green Trips Today</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-teal-500">
                            <h2 className="text-5xl font-bold text-teal-600">{communityStats.timeSavedThisMonth} hours</h2>
                            <p className="text-lg text-slate-600 mt-2">Collective Time Saved This Month</p>
                        </div>
                    </div>
                </section>

                {/* --- Personal Dashboard --- */}
                <section className="my-20 bg-teal-50 p-8 sm:p-10 rounded-2xl shadow-inner border border-teal-100">
                    <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">Your Green Footprint 🌿</h2>
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="bg-white p-8 rounded-2xl shadow-xl">
                            <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Your Stats</h3>
                            <div className="space-y-4 text-left">
                                <p className="text-xl text-slate-700"><strong>Total CO₂ Saved:</strong> <span className="font-bold text-teal-600 float-right">{userStats.totalCo2Saved} kg</span></p>
                                <p className="text-xl text-slate-700"><strong>Best Streak:</strong> <span className="font-bold text-teal-600 float-right">{userStats.bestStreak} Days</span></p>
                            </div>

                            {/* --- Weekly Log Section --- */}
                            <div className="mt-8 pt-6 border-t border-slate-200">
                                <h4 className="text-3xl font-medium text-slate-700 mb-4">This Week's Activity</h4>
                                <ul className="space-y-3">
                                    {weeklyLogData.map((log) => (
                                        <li key={log.date} className="flex justify-between items-center text-slate-600 text-l">
                                            <div>
                                                <span className="font-semibold">{log.day}, {log.date}</span>
                                                <span className="ml-2" title={log.mode === 'Rest Day' ? 'Rest Day' : ''}>{log.mode}</span>
                                            </div>
                                            <span className="font-semibold text-teal-600">
                                                {log.co2Saved > 0 ? `+${log.co2Saved.toFixed(1)} kg CO₂` : '-'}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl">
                            <h3 className="text-2xl font-semibold text-slate-800 mb-6">Your Progress</h3>
                            <div className="space-y-12">
                                <div>
                                    <h4 className="text-lg font-medium text-slate-700 mb-4 text-center">
                                        Travel Modes Breakdown
                                    </h4>
                                    <div className="w-full">
                                        <PieChartComponent />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-slate-700 mb-4 text-center">
                                        CO₂ Savings (Last 30 Days)
                                    </h4>
                                    <div className="w-full">
                                        <LineChartComponent />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Leaderboards --- */}
                <section className="my-20">
                    <h2 className="text-4xl font-bold text-center text-slate-800 mb-4">🏆 Eco-Champions Leaderboard</h2>
                    <p className="text-center text-slate-500 mb-8">See how you stack up against other green commuters.</p>

                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-3xl mx-auto">
                        <ul className="space-y-2">
                            {leaderboardData.map((user) => (
                                <li key={user.rank} className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50">
                                    <span className="font-semibold text-lg text-slate-700">{user.rank}. {user.name}</span>
                                    <span className="font-semibold text-teal-600">{user.co2Saved} kg CO₂ Saved</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default CampusChampionsPage;