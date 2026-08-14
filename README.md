# 💬 Chatify

A full-stack **real-time chat application** built with React, Node.js, Express, MongoDB and Socket.IO.

Chatify was built as a hands-on full-stack project to understand how modern web applications work end-to-end — from authentication and database design to real-time communication, API testing, security, Git workflows and deployment.

🔗 **Live Demo:** 🔗 https://your-chatify-app.onrender.com

📂 **Repository:** https://github.com/harshbagwan/Chatify-again.git

---

## ✨ Features

* 🔐 JWT-based authentication
* 🍪 HTTP-only cookie-based authentication
* 🔑 Password hashing with bcryptjs
* 💬 Real-time one-to-one messaging with Socket.IO
* 🟢 Online/offline user status
* 🔔 Real-time message notifications
* 🔊 Notification sound for new messages
* 🖼️ Image upload and cloud storage with Cloudinary
* 📧 Welcome emails using Resend
* 🛡️ API protection and rate limiting with Arcjet
* 🗄️ MongoDB database with Mongoose
* 🌐 RESTful APIs with Express.js
* 🧠 Zustand-based frontend state management
* 🎨 Responsive UI with Tailwind CSS and DaisyUI
* 🔥 Toast notifications with React Hot Toast
* 🔒 Protected frontend and backend routes
* 🌍 CORS configuration with credentials
* ⚙️ Environment-based configuration
* 🚀 Production-ready build and deployment setup

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* DaisyUI
* Zustand
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* Socket.IO
* Mongoose
* JWT
* bcryptjs
* Cookie Parser
* CORS
* dotenv

### Services

* MongoDB — Database
* Cloudinary — Image storage
* Resend — Email service
* Arcjet — Security and rate limiting

### Development Tools

* Git
* GitHub
* Postman
* VS Code

---

## 🏗️ Application Architecture

Chatify follows a client-server architecture.

```text
                    ┌─────────────────────┐
                    │      React App      │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                     Axios / HTTP Requests
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Server    │
                    │       Backend       │
                    └──────┬───────┬──────┘
                           │       │
                  ┌────────┘       └─────────┐
                  ▼                          ▼
          ┌───────────────┐          ┌───────────────┐
          │    MongoDB    │          │   Socket.IO   │
          │    Database   │          │ Real-time     │
          └───────────────┘          │ Communication │
                                     └───────────────┘

                  External Services

          ┌────────────┐ ┌────────────┐ ┌────────────┐
          │ Cloudinary │ │   Resend   │ │   Arcjet   │
          │   Images   │ │   Emails   │ │  Security  │
          └────────────┘ └────────────┘ └────────────┘
```

---

## 🔄 How Messaging Works

Chatify uses Socket.IO for real-time communication.

```text
User A
  │
  │ Sends message
  ▼
Socket.IO Client
  │
  ▼
Socket.IO Server
  │
  ├── Validate authenticated user
  ├── Save message to MongoDB
  │
  ▼
Socket.IO Event
  │
  ▼
User B's Socket
  │
  ▼
Message appears instantly
```

This allows messages to be delivered without continuously polling the server.

---

## 🔐 Authentication Flow

Chatify uses JWT-based authentication with HTTP-only cookies.

```text
User Login
    │
    ▼
Express Authentication Route
    │
    ├── Validate credentials
    ├── Compare password hash
    │
    ▼
Generate JWT
    │
    ▼
HTTP-only Cookie
    │
    ▼
Browser
    │
    ▼
Authenticated Requests
```

### Security practices used

* JWT authentication
* HTTP-only cookies
* Secure cookies in production
* Password hashing with bcryptjs
* Protected backend routes
* Authentication middleware
* CORS configuration
* Rate limiting with Arcjet
* Environment variables for secrets

---

## 🖼️ Image Upload Flow

Images are uploaded to Cloudinary instead of storing image files directly in the application server.

```text
User selects image
       │
       ▼
React Frontend
       │
       ▼
Backend API
       │
       ▼
Cloudinary
       │
       ▼
Image URL
       │
       ▼
MongoDB
```

The database stores the image URL while Cloudinary handles the actual file storage.

---

## 📧 Email System

Chatify uses Resend for sending welcome emails.

```text
User Registration
       │
       ▼
Backend
       │
       ▼
Create User
       │
       ▼
Send Welcome Email
       │
       ▼
Resend
       │
       ▼
User's Email
```

---

## 🛡️ Rate Limiting & Security

Arcjet is used to add an additional layer of protection to the backend.

The project also includes:

* Request protection
* Rate limiting
* Authentication middleware
* HTTP-only cookies
* Secure cookies
* CORS configuration
* Password hashing
* Environment variables
* Basic awareness of XSS and other web security concerns

---

## 🧪 API Testing

Backend APIs were tested and debugged using **Postman**.

Testing included:

* Authentication endpoints
* User/contact endpoints
* Message endpoints
* Protected routes
* Request validation
* Authentication failures
* Unauthorized requests
* Error responses

Postman was also useful while debugging communication between the frontend and backend.

---

## ⚛️ React Concepts Used

Building Chatify provided practical experience with several React concepts.

### `useState`

Used for managing component-level state such as:

* Form values
* Loading states
* UI states
* Component data

### `useEffect`

Used for:

* Fetching data
* Socket subscriptions
* Side effects
* Cleaning up socket listeners

### `useRef`

Used where persistent mutable values were required without triggering unnecessary component re-renders.

### Zustand

Used for centralized frontend state management, including:

* Authentication state
* Selected chat/user
* Messages
* Socket-related state
* Loading states

---

## 🌐 Frontend ↔ Backend Communication

Axios is used to communicate between the React frontend and Express backend.

```text
React
  │
  │ Axios Request
  ▼
Express API
  │
  ▼
Controller
  │
  ▼
MongoDB / Service
  │
  ▼
Response
  │
  ▼
React
```

Authentication requests use credentials so that the browser can send the authentication cookie with requests.

---

## 📁 Project Structure

The project follows a separated frontend/backend structure.

```text
chatify/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── lib/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── lib/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── package.json
└── README.md
```

The exact structure may evolve as the project grows.

---

## 🚀 Local Development

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd chatify
```

### 2. Install dependencies

```bash
npm install
```

If frontend and backend dependencies are managed separately:

```bash
cd frontend
npm install

cd ../backend
npm install
```

---

## 🔑 Environment Variables

Create the required `.env` files for the frontend and backend.

### Backend

```env
PORT=5001

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RESEND_API_KEY=your_resend_api_key

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

### Frontend

```env
VITE_API_URL=http://localhost:5001
```

> Never commit real API keys, database credentials or JWT secrets to GitHub.

---

## ▶️ Running the Application

Start the backend:

```bash
npm run start
```

Start the frontend development server:

```bash
npm run dev
```

The frontend and backend can then communicate through the configured API URL.

---

## 🏭 Production Build

The project includes a production build setup where the frontend is compiled into an optimized `dist` directory.

Conceptually:

```text
Install Dependencies
        ↓
Build Frontend
        ↓
Generate frontend/dist
        ↓
Start Backend
        ↓
Backend serves production frontend
```

This allows the frontend and backend to be deployed together when configured appropriately.

---

## ☁️ Deployment

The project was deployed using cloud hosting services.

### Production flow

```text
GitHub Repository
       │
       ▼
Deployment Platform
       │
       ├── Install dependencies
       ├── Build frontend
       ├── Generate dist/
       └── Start backend
               │
               ▼
          Live Application
```

During deployment, environment variables are configured separately from the source code.

---

## 🌿 Git & GitHub Workflow

GitHub was used throughout development rather than only for uploading the final project.

The development workflow included:

* Feature-based branches
* Multiple commits
* Pull Requests
* Feature integration
* Bug fixes
* Deployment-related changes
* Iterative development

This helped me understand how features can be developed independently and integrated using a version-control workflow.

---

## 🧠 What I Learned

The main goal of Chatify was not simply to build a chat application.

It was to understand how different parts of a full-stack application work together.

### Frontend

```text
React
  ↓
Zustand
  ↓
Axios
  ↓
Express API
```

### Real-time communication

```text
React
  ↓
Socket.IO Client
  ↓
Socket.IO Server
  ↓
Authentication
  ↓
Socket Events
  ↓
Other Client
```

### Overall development lifecycle

```text
Planning
   ↓
Development
   ↓
API Testing
   ↓
Debugging
   ↓
Git Branches / Pull Requests
   ↓
Production Build
   ↓
Deployment
```

Building Chatify helped me move from understanding individual technologies to understanding how they work together inside a complete application.

---


## 🔮 Future Improvements

Some improvements that could be added in future versions:

* Group conversations
* Message reactions
* Message read receipts
* Typing indicators
* Message editing/deletion
* Search functionality
* Push notifications
* Better media handling
* More advanced moderation/security features

---

## 👨‍💻 Author

**Harsh Bagwan**

* GitHub: [@harshbagwan](https://github.com/harshbagwan)
* LinkedIn: [@harshbagwan](https://www.linkedin.com/in/harshbagwan/)
* LeetCode: [@harshbagwan](https://leetcode.com/u/harshbagwan/)

---

## ⭐ Support

If you found this project interesting, consider giving the repository a ⭐.

Thanks for checking out **Chatify!** 🚀
