# InsightEcho

**InsightEcho** is a sentiment analysis dashboard that allows users to submit and analyze customer reviews using natural language processing techniques.

## 📦 Project History

This repository is the result of merging two separate codebases:

- [InsightEcho](https://github.com/acheird/InsightEcho) – Frontend project
- [InsightEcho-backend](https://github.com/acheird/InsightEcho-backend) – Backend service

You can view the full commit history in their respective repositories.

## Features

- Submit individual or bulk reviews (CSV upload)
- Analyze sentiment (average, buckets, themes, positive/negative words & phrases)
- Auto-generated insights based on review content
- Filter and view results by organization
- Full-stack implementation with separate frontend and backend

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- React Query (for data fetching)
- Axios

### Backend
- Node.js + Express
- PostgreSQL
- `sentiment`, `natural` (for NLP)
- `multer`, `csv-parser` (for file uploads)

##  Setup Instructions

### 1. Clone the repository

### 2. Setup Backend

``
cd InsightEcho-backend
npm install            # Install backend dependencies
cp .env.example .env   # Create your .env file 
``

✏️ Edit .env and add your PostgreSQL credentials:

``DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=insightecho_db
PORT=5000``

Start the backend server:

``npm run dev``

### 3. Setup Frontend

``cd ../InsightEcho-frontend
npm install            # Install frontend dependencies
npm run dev            # Start the Vite dev server ``
