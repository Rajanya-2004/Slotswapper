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

Separation of Concerns: Frontend and backend are decoupled to simplify maintenance and deployment.
