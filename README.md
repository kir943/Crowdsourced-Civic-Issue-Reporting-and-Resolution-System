# Crowdsourced Civic Issue Reporting and Resolution System

A web-based platform that allows citizens to report civic issues and track their resolution. Administrators can verify and assign issues to the appropriate departments, while department officers can update the status and provide resolution proof.

## Features

- Citizen issue reporting with images and location
- Issue verification and department assignment
- Role-based access for Citizens, Admins, and Department Officers
- Issue status tracking
- Real-time notifications using Socket.IO
- Cloudinary-based image storage
- Citizen points and leaderboard
- Issue escalation for delayed resolution
- Admin dashboard and analytics

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt
- **Real-time Communication:** Socket.IO
- **Image Storage:** Cloudinary
- **Maps:** Leaflet / OpenStreetMap

## Project Structure

```text
frontend/   → React frontend
backend/    → Node.js/Express backend
docs/       → Project documentation and diagrams
