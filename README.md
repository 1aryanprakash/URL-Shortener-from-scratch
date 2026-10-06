# URL Shortener

## About

A simple URL Shortener backend built using Node.js, Express.js, and MongoDB.

It converts long URLs into short URLs and redirects users to the original URL.

## Features

* Create short URLs from long URLs
* Generate unique short IDs using Nanoid
* Store URL mappings in MongoDB
* Redirect short URLs to original URLs
* REST API using Express.js
* Environment variables for database configuration

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Nanoid
* Dotenv
* Nodemon
* Git & GitHub

## Project Structure

```text
URL-Shortener/
├── backend/
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   └── urlController.js
│       ├── models/
│       │   └── Url.js
│       └── routes/
│           └── urlRoutes.js
├── index.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## API Endpoints

### 1. Create Short URL

**POST** `/shorten`

Request Body:

```json
{
  "url": "https://example.com"
}
```

Response:

```json
{
  "originalUrl": "https://example.com",
  "shortId": "abc123"
}
```

### 2. Redirect to Original URL

**GET** `/:shortId`

Example:

```text
GET /abc123
```

The server finds the corresponding URL from MongoDB and redirects the user to the original URL.

### 3. Health Check

**GET** `/`

Response:

```text
Hello URL shortener
```

## How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/1aryanprakash/URL-Shortener-from-scratch.git
cd URL-Shortener-from-scratch
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env`

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the Development Server

```bash
npm run dev
```

The server will run on:

```text
http://localhost:4000
```

## Future Improvements

* URL validation
* Error handling
* User authentication
* Custom short aliases
* Click analytics
* URL expiration
* Redis caching
* Rate limiting
* Deployment
* Automated testing

## Author

Aryan Prakash
