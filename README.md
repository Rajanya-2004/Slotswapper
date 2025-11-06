SlotSwapper

SlotSwapper is a web application that allows users to efficiently manage their personal events and exchange event slots with other users. It is ideal for situations where multiple people need to coordinate schedules or swap responsibilities.

Key Features:

User Authentication: Register and login securely with JWT-based authentication.

Event Management: Create, view, and manage your own events.

Swap Marketplace: Browse events marked as "SWAPPABLE" by other users.

Swap Requests: Send swap requests to other users and accept or reject incoming requests.

Real-time Status Updates: Event statuses update automatically when a swap is requested, accepted, or rejected.

Design Choices:

Frontend: React.js for a responsive and component-based UI.

Backend: Node.js + Express.js for scalable REST APIs.

Database: MongoDB for storing users, events, and swap requests.

Styling: Custom CSS to provide a clean, modern, and professional interface.

Separation of Concerns: Frontend and backend are done in two different folders to simplify maintenance and deployment.

    slotswapper/

       backend/

            models/          # MongoDB schemas (User, Event, SwapRequest)
 
             routes/          # Express routes for auth, events, swaps
 
             middleware/      # Authentication middleware
 
     server.js        # Entry point for backend server
 
    frontend/

     src/
     components/  # React components (Dashboard, Marketplace, Notifications, Register, Login)
         api.js       # API helper functions
         
         index.js     # React entry point
        
          *.css        # Styling for pages and components
        
           App.js       # Main frontend routing

README.md


SETUP
Prerequisites

Node.js (v16+ recommended)

npm 

MongoDB instance (local or cloud)

BACKEND SETUP

Navigate to the backend folder:

cd backend


Install dependencies:

npm install


Create a .env file in the backend root:

MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
PORT=5000


Start the backend server:

npm start


Backend runs on http://localhost:5000.

FRONTEND SETUP

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the frontend:
npm start


Frontend runs on http://localhost:3000.
