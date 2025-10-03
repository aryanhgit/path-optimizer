Path Optimizer
Making Sustainable Commutes Simple, Fast, and Affordable for Every Student.

(https://img.shields.io/travis/com/your-repo/path-optimiser.svg?style=flat-square)](https://travis-ci.com/your-repo/path-optimiser)
(https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

!(https://example.com/path-optimizer-demo.gif)

The Challenge: The Student Commute Grind
For thousands of college students, the daily commute is a significant source of stress and inefficiency. Lacking tools that provide real-time, intelligent transit options, they often resort to costly private vehicles or confusing, inefficient bus routes. This daily struggle results in lost study time, wasted money from an already tight budget, and a substantial, avoidable carbon footprint. The default choice becomes convenience over sustainability, simply due to a lack of accessible, consolidated information.   

Our Solution: Smart, Sustainable Travel
Path Optimizer is a web application designed specifically to empower the student commuter. Our tool enables students to make smarter, more informed travel decisions by instantly analyzing all available public and private transit options between any origin and destination.   

Instant Route Comparison: By inputting their start and end points, students receive clear, optimized routes based on their immediate priority: the absolute fastest path or the most cost-effective option.

Multi-Modal Analysis: The platform demystifies public transport by comparing it directly against driving, cycling, and walking, presenting all data in a single, easy-to-understand interface.

Data-Driven Decisions: We provide key metrics like travel time, fuel cost, and estimated CO₂ emissions for every route, making the sustainable choice the logical choice.

The Green Impact: Measurable and Meaningful
By optimizing journeys and encouraging a shift away from single-occupancy vehicles, our platform delivers a direct and quantifiable environmental benefit. Each student who switches from a car to a bus for their commute can save approximately 1.5–2 kg of CO₂ per week. We are not just building a tool; we are cultivating a campus-wide culture of sustainable commuting.   

The calculations are based on the following standardized metrics:

Metric	Value	Assumption / Source
CO₂ Emissions (Car)	121.9 g/km	Standard emission factor for a passenger car.
CO₂ Emissions (E-Bike)	14 g/km	Includes life-cycle emissions.
CO₂ Emissions (Cycle)	16 g/km	Includes life-cycle emissions.
CO₂ Emissions (Walk)	5 g/km	Includes life-cycle emissions.
Fuel Cost (Car)	₹6.67 / km	Based on ₹100/L fuel & 15 km/L mileage (as of Oct 2023).
Vision for Growth: A Platform for Smarter Campuses and Cities
This project is architected to scale and create lasting value beyond its initial campus deployment.   

City-Wide Expansion: The architecture readily supports expansion to any city with available GTFS (General Transit Feed Specification) data, such as Ahmedabad or Kochi.

Institutional Integration: Universities and colleges can integrate our platform to optimize their proprietary shuttle services, reducing operational costs and improving the student experience.

Smart City Applications: The tool can be incorporated into larger smart campus dashboards, corporate social responsibility initiatives, or municipal planning applications to inform and improve urban mobility.

Technical Foundation
Our solution is built on a robust and scalable open-source technology stack, containerized with Docker for consistent and reliable deployment.   

Component	Technology / Service
Frontend	React, Leaflet.js
Backend	Flask (Python)
Geocoding API	OpenStreetMap Nominatim
Routing APIs	TomTom API, OpenRouteService API, OpenTripPlanner API
Transit Data	GTFS (General Transit Feed Specification)
Deployment	Docker
How It Works
The system employs a sophisticated, multi-API strategy to ensure the highest quality route data for each mode of transport. The user request follows a clear data processing pipeline:

Geocoding: A user enters a place name (e.g., "Main Library"). The Places service forwards this to the Geocode module, which queries the OpenStreetMap Nominatim API to convert the name into precise geographic coordinates.   

Parallel Route Fetching: The backend Optimize service receives the origin and destination coordinates and makes concurrent API calls to specialized routing engines:

TomTom API: Fetches the optimal route for a driving-car, including distance, duration, and turn-by-turn directions.

OpenRouteService (ORS) API: Fetches routes for cycling and walking.

OpenTripPlanner (OTP) API: Calculates all public transit journeys by processing local GTFS data.

Data Aggregation & Comparison: The backend consolidates the results from all APIs. It calculates and appends key metrics (cost, emissions) to each route and returns a single, sorted JSON response to the frontend for display.   

Installation
To get the project running locally, please follow these steps.

Prerequisites:

Python 3.8+

Node.js v16+

An active internet connection for API access.

Bash

# 1. Clone the repository
git clone https://github.com/[your-username]/[your-repository-name].git
cd path-optimizer

# 2. Set up the backend (in the /server directory)
cd server
# Create and activate a Python virtual environment
python3 -m venv.venv
source.venv/bin/activate  # On Linux/macOS
#.\.venv\Scripts\activate  # On Windows

# Install backend dependencies
pip install -r requirements.txt

# 3. Set up the frontend (in the /client directory)
cd../client
# Install frontend dependencies
npm install

# 4. Run the application
# In one terminal (from /server), start the backend:
flask run

# In a second terminal (from /client), start the frontend:
npm start
Usage
Once the application is running, navigate to it in your browser.

Log in with the provided credentials or create a new account.

Username: harry

Password: 123harry

Click on "Find Route" in the navigation bar.

In the form, enter your starting location and destination, then select your optimization priority (e.g., Fastest, Cheapest).

Click "Compare Routes."

A comparison table will appear, detailing the Mode, Distance (km), Time (min), Estimated Emissions, and Fuel Cost for each option.

After reviewing the options, click "View Map" on your preferred route to see the path visualized.

!(https://example.com/comparison-table.png)

Contributing
This is an open-source project, and contributions are welcome! To get started, please fork the repository and create a new branch for your feature or bug fix. We recommend looking for issues tagged with good first issue.

For more detailed instructions, please see our CONTRIBUTING.md file.

Support
If you encounter any issues or have questions, please file an issue on our(https://github.com/[your-username]/[your-repository-name]/issues).

Authors and Acknowledgments
This project is proudly developed and maintained by:

[Author 1 Name] - [GitHub Profile Link]

[Author 2 Name] - [GitHub Profile Link]

License
This project is licensed under the MIT License. See the LICENSE file for details.