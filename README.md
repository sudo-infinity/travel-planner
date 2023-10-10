# Travel Planner App

The Travel Planner App is a web-based application that helps users plan and organize their trips seamlessly.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [How to Use](#how-to-use)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Trip Creation and Details**: Create a trip by providing essential details like destination, dates, and a brief description.
- **Interactive Map Integration**: Easily add locations to your trip by using an interactive map interface.
- **Image Gallery**: Upload multiple images related to your trip and create a visual diary.
- **Budget Planning**: Set budgets for different categories and allocate expenses accordingly.
- **Itinerary Management**: Plan your trip day by day with a detailed itinerary.
- **Live Weather Information**: Access live weather updates for each location to plan your activities.
- **Notes Section**: Keep important notes and information about your trip in one place.

## Technologies

- Frontend: React, React-Router, Bootstrap, Mapbox GL, React-Quill (for notes), Axios for API requests.
- Backend: Node.js, Express.js, MongoDB (with Mongoose), GraphQL (Apollo Server), JSON Web Tokens (JWT) for authentication.
- Testing: Jest, React Testing Library.

## How to Use

1. **Register or Login**:
   - If you're a new user, register with your email and create a password. If you're a returning user, simply log in using your credentials.

2. **Create a Trip**:
   - Click on the "Create Trip" button to start planning a new trip.
   - Enter the trip details, including the destination, start and end dates, and a brief description.

3. **Add Locations via Map**:
   - Click on the "Add Locations" button to open the map interface.
   - Explore the map, click on the desired locations, and add them to your trip.

4. **Upload Images**:
   - In the trip details view, click on the "Upload Images" button to add pictures related to the trip.
   - Select and upload multiple images to create a visual diary of your trip.

5. **Set Budget and Itinerary**:
   - Specify your trip's budget and plan the itinerary for each day of the trip.
   - Allocate budgets to various categories (e.g., accommodation, food, activities) and organize your activities.

6. **Check Weather Information**:
   - View live weather updates for each location on your trip to help you plan accordingly.

7. **Save and Edit**:
   - Save your trip to access and edit it later. You can always come back to make changes or add more details.

8. **Access Notes Section**:
   - Utilize the "Notes" section to jot down important information, reminders, or special moments during your trip.

9. **View All Trips**:
   - Click on "My Trips" to see an overview of all your planned trips.

10. **Edit or Delete Trips**:
    - Edit the trip details or delete a trip you no longer need.

## Installation

To run this application locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/travel-planner.git
cd travel-planner
```

2. Install dependencies for the client and server:

```bash
# For the client
cd client
npm install

# For the server
cd ../server
npm install
```

## Getting Started

1. Start the server:

```bash
cd server
npm run dev
```

2. Start the client:

```bash
cd client
npm start
```

Access the application at `http://localhost:3000` in your web browser.