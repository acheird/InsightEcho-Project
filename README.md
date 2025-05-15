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
