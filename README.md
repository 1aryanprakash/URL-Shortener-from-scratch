# URL Shortener

A full-stack URL Shortener built with React, Vite, Node.js, Express.js, and MongoDB. Convert long URLs into short, shareable links, redirect users to their original destinations, and track link statistics.

## Live Demo

- **Frontend:** [URL Shortener](https://frontend-black-gamma-35.vercel.app/)
- **Backend API:** [Live API](https://url-shortener-api-6w4r.onrender.com/)
- **GitHub Repository:** [URL-Shortener-from-scratch](https://github.com/1aryanprakash/URL-Shortener-from-scratch)

## Features

- Create short URLs from long URLs.
- Generate unique short IDs using Nanoid.
- Support custom short aliases.
- Validate URLs and allow only HTTP and HTTPS protocols.
- Redirect short links to their original destinations.
- Track click counts for each short URL.
- Retrieve URL statistics through a dedicated API endpoint.
- Configure URLs to expire after 30 days.
- Handle invalid URLs, missing links, duplicate aliases, and expired links.
- Use Mongoose schemas and automatic timestamps.
- Store database credentials in environment variables.
- Organize backend code into routes, controllers, models, and configuration.
- Provide an interactive frontend with URL input, loading feedback, error messages, and copy functionality.

## Tech Stack

| Category | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Short ID Generation | Nanoid |
| Environment Variables | dotenv |
| Development | Nodemon |
| API Testing | Postman |
| Version Control | Git, GitHub |
| Backend Deployment | Render |
| Frontend Deployment | Vercel |

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
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   ├── package.json
│   └── ...
├── index.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## API Documentation

The following endpoints are available through the deployed backend.

Base URL: `https://url-shortener-api-6w4r.onrender.com`

### 1. Create a Short URL

**POST** `/shorten`

Creates a short URL. A custom alias is optional.

Request body:

```json
{
  "url": "https://example.com",
  "customAlias": "my-link"
}
```

The `customAlias` field can be omitted to generate a unique short ID automatically.

Example success response (`201 Created`):

```json
{
  "success": true,
  "message": "Short URL created successfully",
  "data": {
    "originalUrl": "https://example.com",
    "shortId": "my-link"
  }
}
```

Possible status codes:

- `201 Created` — Short URL created successfully.
- `400 Bad Request` — Missing or invalid URL, unsupported protocol, or invalid custom alias.
- `409 Conflict` — Custom alias or short ID already exists.
- `500 Internal Server Error` — Unexpected server or database error.

### 2. Redirect to the Original URL

**GET** `/:shortId`

Redirects users to the original URL associated with the specified short ID. Each successful redirect increments the click counter.

Example:

```text
GET /my-link
```

Possible status codes:

- `302 Found` — Redirect to the original URL.
- `404 Not Found` — Short URL does not exist.
- `410 Gone` — Short URL has expired.
- `500 Internal Server Error` — Unexpected server or database error.

### 3. Get URL Statistics

**GET** `/stats/:shortId`

Returns information about a short URL, including its original URL, click count, creation time, and expiry time.

Example:

```text
GET /stats/my-link
```

Example success response (`200 OK`):

```json
{
  "success": true,
  "data": {
    "shortId": "my-link",
    "originalUrl": "https://example.com",
    "clicks": 5,
    "createdAt": "2026-10-21T10:00:00.000Z",
    "expiresAt": "2026-11-20T10:00:00.000Z"
  }
}
```

Possible status codes:

- `200 OK` — Statistics retrieved successfully.
- `404 Not Found` — Short URL does not exist.
- `500 Internal Server Error` — Unexpected server or database error.

### 4. Health Check

**GET** `/`

Checks whether the backend server is responding.

Example response:

```text
Hello URL shortener
```

## Run Locally

### Prerequisites

- Node.js and npm
- MongoDB Atlas account or a local MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/1aryanprakash/URL-Shortener-from-scratch.git
cd URL-Shortener-from-scratch
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
PORT=4000
```

Replace the placeholder with your MongoDB connection string. Never commit actual database credentials or your `.env` file to GitHub.

### 3. Install Backend Dependencies

From the project root, run:

```bash
npm install
```

### 4. Start the Backend

```bash
npm run dev
```

The backend runs at:

```text
http://localhost:4000
```

### 5. Install Frontend Dependencies

Open a second terminal:

```bash
cd frontend
npm install
```

### 6. Start the Frontend

```bash
npm run dev
```

Open the local frontend URL displayed by Vite in the terminal, typically:

```text
http://localhost:5173
```

You can also test the API endpoints using Postman.

## Expiration Behavior

- URLs are configured to expire 30 days after creation.
- Requests to expired links return `410 Gone`.
- MongoDB TTL indexes remove expired documents asynchronously; deletion may not happen exactly at the expiry time.

## Future Improvements

- Rate limiting and abuse prevention.
- Automated unit and integration tests.
- Redis caching for frequently accessed URLs.
- User authentication and URL management.
- API documentation using Swagger/OpenAPI.
- Enhanced analytics and URL management.

## Author

**Aryan Prakash**

- GitHub: [@1aryanprakash](https://github.com/1aryanprakash)
