# User Management System with Admin Panel

A comprehensive backend system for user management with notification capabilities.

## Features

### User Features
- User authentication (login/signup)
- Profile management
- Availability time slots
- Send and receive notifications

### Admin Features
- Send notifications to single/multiple users
- Critical and non-critical notification management
- User management

## API Documentation

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response (201):
{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

### User Profile

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer jwt_token_here

Response (200):
{
  "name": "John Doe",
  "email": "user@example.com",
  "mobileNumber": "1234567890",
  "bio": "User bio",
  "availability": [
    {
      "dayOfWeek": 1,
      "startTime": "09:00",
      "endTime": "17:00"
    }
  ]
}
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "John Doe Updated",
  "mobileNumber": "9876543210",
  "bio": "Updated bio",
  "availability": [
    {
      "dayOfWeek": 1,
      "startTime": "10:00",
      "endTime": "18:00"
    }
  ]
}

Response (200):
{
  "message": "Profile updated successfully",
  "user": {
    "name": "John Doe Updated",
    "email": "user@example.com",
    "mobileNumber": "9876543210",
    "bio": "Updated bio",
    "availability": [...]
  }
}
```

### Notifications

#### Send Notification (User)
```http
POST /api/notifications/send
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "recipients": ["recipient_user_id_1", "recipient_user_id_2"],
  "message": "Hello, this is a notification!"
}

Response (201):
{
  "message": "Notification sent successfully",
  "notification": {
    "sender": "sender_user_id",
    "recipients": ["recipient_user_id_1", "recipient_user_id_2"],
    "message": "Hello, this is a notification!",
    "status": "pending",
    "sentAt": "2023-12-20T10:00:00.000Z"
  }
}
```

#### Get Received Notifications
```http
GET /api/notifications/received
Authorization: Bearer jwt_token_here

Response (200):
[
  {
    "sender": {
      "name": "Sender Name",
      "email": "sender@example.com"
    },
    "message": "Notification message",
    "status": "delivered",
    "sentAt": "2023-12-20T10:00:00.000Z",
    "deliveredAt": "2023-12-20T10:00:01.000Z"
  }
]
```

### Admin Endpoints

#### Send Admin Notification
```http
POST /api/admin/notifications
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "recipients": ["user_id_1", "user_id_2"],
  "message": "Important notification from admin",
  "isCritical": true
}

Response (201):
{
  "message": "Admin notification sent successfully",
  "notification": {
    "sender": "admin_user_id",
    "recipients": ["user_id_1", "user_id_2"],
    "message": "Important notification from admin",
    "isCritical": true,
    "status": "delivered",
    "sentAt": "2023-12-20T10:00:00.000Z",
    "deliveredAt": "2023-12-20T10:00:00.000Z"
  }
}
```

#### Get All Users (Admin)
```http
GET /api/admin/users
Authorization: Bearer jwt_token_here

Response (200):
[
  {
    "name": "User 1",
    "email": "user1@example.com",
    "role": "user",
    "createdAt": "2023-12-20T10:00:00.000Z"
  }
]
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   JWT_SECRET=your_jwt_secret_key_here
   MONGODB_URI=mongodb://localhost:27017/user-management-system
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm start
   ```

For development:
```bash
npm run dev
```

