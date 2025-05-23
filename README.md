# Profile Application

This is a React application that displays user profiles with the ability to view and manage meetings.

## Prerequisites

- Docker
- Docker Compose

## Running the Application

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Start the application using Docker Compose:
```bash
docker-compose up
```

The application will be available at http://localhost:3000

## Development

The application is configured to:
- Run on port 3000
- Use the API at https://igroom.ru/api/web/v1
- Fall back to mock data if the API is unavailable
- Handle CORS for localhost:3000

## API Documentation

The API documentation is available at: https://igroom.ru/api/web/v1/swagger/index.html#/

## Features

- Profile viewing and editing
- Meeting management
- Account settings
- Responsive design
