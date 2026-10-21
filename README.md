# URL Shortener

A URL Shortener backend built using Node.js, Express.js, and MongoDB. It converts long URLs into short, easy-to-share links and redirects users to their original destinations.

## Features

- Create short URLs from long URLs
- Generate unique short IDs using Nanoid
- Support custom short aliases
- Validate URLs and allow only HTTP and HTTPS protocols
- Redirect short URLs to their original destinations
- Track the number of clicks for each short URL
- Provide URL statistics through a dedicated API endpoint
- Automatically expire URLs after 30 days
- Return appropriate HTTP status codes for errors
- Use Mongoose schemas, validation, and automatic timestamps
- Store database configuration in environment variables
- Organize code into routes, controllers, models, and configuration

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **ID Generation:** Nanoid
- **Environment Variables:** dotenv
- **Development:** Nodemon
- **API Testing:** Postman
- **Version Control:** Git and GitHub

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

Successful response — `201 Created`:

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

Possible responses:

- `201 Created` — Short URL created successfully
- `400 Bad Request` — Missing or invalid URL, unsupported protocol, or invalid custom alias
- `409 Conflict` — Custom alias or short ID already exists
- `500 Internal Server Error` — Unexpected server or database error

### 2. Redirect to the Original URL

**GET** `/:shortId`

Redirects the user to the original URL associated with the specified short ID. Each successful redirect increments the click counter.

Example:

```text
GET /my-link
```

Possible responses:

- `302 Found` — Redirect to the original URL
- `404 Not Found` — Short URL does not exist
- `410 Gone` — Short URL has expired
- `500 Internal Server Error` — Unexpected server or database error

### 3. Get URL Statistics

**GET** `/stats/:shortId`

Returns information about a short URL, including its original URL, click count, creation time, and expiry time.

Example:

```text
GET /stats/my-link
```

Successful response — `200 OK`:

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

Possible responses:

- `200 OK` — Statistics retrieved successfully
- `404 Not Found` — Short URL does not exist
- `500 Internal Server Error` — Unexpected server or database error

### 4. Health Check

**GET** `/`

Returns a simple message to verify that the server is running.

Response:

```text
Hello URL shortener
```

## How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/1aryanprakash/URL-Shortener-from-scratch.git
cd URL-Shortener-from-scratch
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
```

Replace the placeholder with your MongoDB connection string. Do not commit your actual `.env` file or database credentials to GitHub.

### 4. Start the Development Server

```bash
npm run dev
```

The server runs at:

```text
http://localhost:4000
```

You can test the API endpoints using Postman.

## Expiration Behavior

- URLs are configured to expire 30 days after creation.
- Requests to expired URLs return `410 Gone`.
- MongoDB's TTL index automatically removes expired documents asynchronously; deletion may not occur exactly at the expiry time.

## Future Improvements

- Rate limiting and abuse prevention
- Automated unit and integration tests
- Redis caching for frequently accessed URLs
- User authentication and URL management
- Deployment with a public API endpoint
- API documentation using Swagger/OpenAPI
- Enhanced analytics and URL management

## Author

Aryan Prakash
