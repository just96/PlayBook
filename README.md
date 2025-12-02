# PlayBook – CS2 Tactics Tool

**PlayBook** is a React + Node.js app with MongoDB/Mongoose to manage CS2 tactics. Keep track of strategies by map, side, zone, description, and effectiveness.

## Features

- Add, edit, and delete tactics
- View tactic details in a modal
- Search tactics by map, side, zone, description, and effectiveness
- Generate PDF with all tactics
- Responsive design with DaisyUI/Tailwind
- Toast notifications for actions

## Tech

- Frontend: React (useState, useEffect)
- Styling: DaisyUI / Tailwind CSS
- Reusable components: Toast, Button, MapImage
- Backend: Node.js + Express 
- Database: MongoDB / Mongoose
- CORS enabled for frontend-backend communication
- Postman (used for testing backend endpoints)

## Backend Endpoints

- `GET /tactics` – fetch all tactics
- `POST /tactics` – add new tactic
- `PUT /tactics/:id` – update tactic
- `DELETE /tactics/:id` – delete tactic

## Environment Variables

Create a `.env` file in the backend folder with:

- `MONGO_URI`=your_mongodb_connection_string
- `PORT`=3000

## Setup

### Frontend

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev` (defaults to port 5173)

### Backend

1. Go to the backend folder: `cd backend`
2. Run `npm install`
3. Run `npm run dev` (defaults to port 3000)
4. MongoDB should be running
