# Role Question Generator

> An AI-powered interview preparation tool that generates thoughtful, role-specific interview questions using advanced language models.

## 🎯 Project Overview

**Role Question Generator** is a full-stack web application designed to help job seekers prepare for interviews. The platform allows users to input a job title and instantly receive AI-generated interview questions tailored to that specific role. This project demonstrates a complete understanding of modern web development practices, including frontend-backend communication, API integration, and responsive UI design.

### Problem Solved
Job seekers often struggle to find quality, role-specific interview questions for preparation. This application bridges that gap by leveraging AI to generate contextually relevant questions in seconds.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: React 19.2.6 (with Vite bundler)
- **Styling**: Tailwind CSS 4.3.0 with dark mode support
- **HTTP Client**: Axios for API communication
- **UI Icons**: Lucide React
- **Build Tool**: Vite 8.0.12
- **Linting**: ESLint

### Backend
- **Framework**: Django 4.2.27 (Python)
- **API**: Django REST Framework
- **AI Integration**: OpenAI API (via Azure Models)
- **Database**: SQLite3
- **CORS**: Django CORS Headers (for frontend-backend communication)
- **Admin UI**: Jazzmin
- **Server**: Daphne (ASGI server) with Channels support

### Key Dependencies
- **Celery**: Asynchronous task queue
- **Channels**: WebSocket support
- **Cloudinary**: Cloud storage integration
- **python-dotenv**: Environment variable management

---

## ✨ Features

✅ **AI-Generated Interview Questions** - Uses OpenAI API to generate contextually relevant questions  
✅ **Dark Mode Toggle** - Full dark/light mode support with localStorage persistence  
✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices  
✅ **Modern UI/UX** - Gradient backgrounds, smooth transitions, and atmospheric design elements  
✅ **Fast Performance** - Vite ensures rapid development and optimized production builds  
✅ **RESTful API** - Clean, scalable backend API architecture  
✅ **CORS Enabled** - Secure cross-origin requests between frontend and backend

---

## 🏗 Architecture & How Frontend Connects to Backend

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER BROWSER                             │
│                   (React Frontend)                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  App.jsx → Homepage.jsx → Contents.jsx              │   │
│  │  - Dark mode toggle                                  │   │
│  │  - Job title input form                              │   │
│  │  - Question display                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTP POST/GET
                   │ (axios)
                   ▼
┌──────────────────────────────────────────────────────────────┐
│                   DJANGO BACKEND                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Endpoint: /api/generate/                        │   │
│  │  │                                                    │   │
│  │  ├─► GenerateInterviewQuestionsAPIView               │   │
│  │  │   - Receives job_title from request               │   │
│  │  │   - Validates with InterviewQuestionSerializer    │   │
│  │  └─► OpenAI API Integration                          │   │
│  │      - Sends prompt to Azure Models                  │   │
│  │      - Returns JSON with 3 interview questions       │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

### Communication Flow

1. **User Interaction**: User enters a job title (e.g., "Software Engineer") in the frontend form
2. **HTTP Request**: Frontend sends POST request to `backend-url/api/generate/` with JSON payload
3. **Backend Processing**: Django validates the input and forwards to OpenAI API
4. **AI Generation**: OpenAI returns 3 relevant interview questions as JSON
5. **Response**: Backend returns questions to frontend
6. **Display**: Frontend renders questions in a clean, readable format

### Data Flow Example

```json
// Frontend sends:
{
  "job_title": "Senior Full Stack Developer"
}

// Backend responds:
{
  "job_title": "Senior Full Stack Developer",
  "questions": [
    "Describe your experience with microservices architecture...",
    "How do you approach database optimization...",
    "Tell us about a challenging deployment you handled..."
  ]
}
```

---

## 📦 Frontend Setup Process

### Prerequisites
- Node.js 16+ and npm/yarn

### Step-by-Step Setup

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Create .env.local file for environment variables
echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env.local

# 4. Run development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Frontend Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Homepage.jsx       # Main page with dark mode & API calls
│   │   ├── Contents.jsx       # Navigation & content layout
│   │   └── Footer.jsx         # Footer component
│   ├── utils/
│   │   ├── axios.js           # Axios instance with base URL
│   │   └── constant.js        # Environment variables
│   ├── App.jsx                # Root component
│   ├── main.jsx               # React entry point
│   └── App.css, index.css     # Global styles
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
└── eslint.config.js           # ESLint rules
```

### Key Frontend Technologies

- **Vite**: Frontend build tool and dev server
  - `npm run dev` - Start development server with hot module replacement
  - `npm run build` - Create optimized production build
  - `npm run preview` - Preview production build locally

- **Tailwind CSS**: Utility-first CSS framework
  - Dark mode support via class-based toggle
  - Responsive design with md breakpoints
  - Beautiful gradient backgrounds

- **Axios**: HTTP client for API requests
  - Centralized instance in `utils/axios.js`
  - Automatic base URL configuration
  - Error handling for failed requests

### Dark Mode Implementation

Dark mode state is managed in `Homepage.jsx`:
- Toggled via light/dark mode button
- State persisted to localStorage
- Real-time CSS class switching for instant theme change

---

## ⚙️ Backend Setup Process

### Prerequisites
- Python 3.10+
- pip (Python package manager)
- Virtual environment tool (venv)

### Step-by-Step Setup

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create virtual environment
python -m venv venv

# 3. Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Create .env file with required secrets
cat > .env << EOF
GITHUB_TOKEN=your_azure_openai_api_key_here
SECRET_KEY=your-django-secret-key
DEBUG=True
EOF

# 6. Run migrations
python manage.py migrate

# 7. Create superuser (optional, for admin panel)
python manage.py createsuperuser

# 8. Run development server
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### Backend Project Structure

```
backend/
├── aigenerator/                    # AI generation app
│   ├── views.py                    # GenerateInterviewQuestionsAPIView
│   ├── serializers.py              # InterviewQuestionSerializer
│   ├── models.py                   # Database models
│   └── migrations/                 # Database migrations
├── api/                            # API configuration app
│   ├── urls.py                     # API routes
│   ├── views.py                    # API views
│   └── migrations/
├── backend/                        # Project settings
│   ├── settings.py                 # Django configuration
│   ├── urls.py                     # Main URL router
│   ├── wsgi.py                     # WSGI application
│   └── asgi.py                     # ASGI application
├── db.sqlite3                      # Database file
├── manage.py                       # Django CLI
├── requirements.txt                # Python dependencies
└── Procfile                        # Heroku deployment config
```

### Key Backend Components

**GenerateInterviewQuestionsAPIView** (`aigenerator/views.py`)
- Receives POST request with job title
- Calls OpenAI API with custom prompt
- Returns 3 interview questions in JSON format
- Handles errors gracefully with detailed error messages

**InterviewQuestionSerializer** (`aigenerator/serializers.py`)
- Validates incoming job_title field (max 255 characters)
- Ensures data integrity before processing

**Django Settings Configuration** (`backend/settings.py`)
- CORS enabled for frontend communication
- Django REST Framework configured
- Jazzmin admin interface enabled
- WhiteNoise for static files
- Environment variables loaded from .env

---

## 🚀 Running the Application

### Development Environment

**Terminal 1 - Start Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python manage.py runserver
# Backend running on http://localhost:8000
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
# Frontend running on http://localhost:5173
```

Then open your browser to `http://localhost:5173`

### Environment Variables

**Frontend** (`.env.local` in frontend directory):
```
VITE_API_BASE_URL=http://localhost:8000/api
```

**Backend** (`.env` in backend directory):
```
GITHUB_TOKEN=your_azure_openai_api_key
DEBUG=True
```

---

## 📡 API Endpoints

### Generate Interview Questions

**Endpoint:** `POST /api/generate/`

**Request Body:**
```json
{
  "job_title": "Software Engineer"
}
```

**Success Response (200 OK):**
```json
{
  "job_title": "Software Engineer",
  "questions": [
    "Question 1",
    "Question 2",
    "Question 3"
  ]
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "error": "Error message describing what went wrong"
}
```

---

## 🔑 Key Design Decisions

### Frontend
1. **Vite over Create React App**: Faster development experience, better HMR, optimized builds
2. **Tailwind CSS**: Utility-first approach for rapid styling and consistent design
3. **Axios over Fetch**: Centralized configuration, interceptors, timeout handling
4. **Dark Mode with localStorage**: Persisted user preference for seamless experience

### Backend
1. **Django REST Framework**: Industry-standard, robust, secure API development
2. **Serializers for Validation**: Ensures clean input data before AI processing
3. **OpenAI API Integration**: Leverages state-of-the-art AI for generating quality questions
4. **CORS Middleware**: Enables secure frontend-backend communication
5. **Environment Variables**: Protects sensitive API keys and configuration

### Architecture
1. **Separation of Concerns**: Frontend and backend are decoupled and independent
2. **RESTful Design**: Standard HTTP methods and status codes
3. **Scalability**: Both frontend and backend can be deployed independently
4. **Error Handling**: Comprehensive try-catch blocks and user-friendly error messages

---

## 📝 Setup Process Summary

### What I Did During Development

1. **Created a React Frontend with Vite**
   - Set up Vite project for fast development
   - Installed Tailwind CSS for styling
   - Implemented responsive, dark mode-enabled UI
   - Created reusable components (Homepage, Contents, Footer)

2. **Built a Django REST Backend**
   - Created Django project with multiple apps (aigenerator, api)
   - Integrated OpenAI API for question generation
   - Set up serializers for input validation
   - Enabled CORS for frontend communication

3. **Connected Frontend to Backend**
   - Created axios instance with environment variables
   - Implemented API calls in Homepage component
   - Handled API responses and errors gracefully
   - Added loading states and user feedback

4. **Deployed Configuration**
   - Created Procfile for Heroku deployment
   - Added runtime.txt for Python version
   - Configured environment variables
   - Set up database for production

---

## 🔐 Security Considerations

- **CORS**: Configured to allow frontend domain
- **API Keys**: Stored in environment variables, never committed to git
- **Serializer Validation**: Input validation before processing
- **Error Handling**: Sensitive error details not exposed to frontend
- **WhiteNoise**: Secures static file serving

---

## 📈 How to Extend This Project

### Possible Enhancements

1. **User Authentication**: Add login/signup to save favorites
2. **Question History**: Store generated questions in database
3. **Multiple AI Providers**: Support multiple AI models
4. **Question Difficulty Levels**: Generate easy/medium/hard questions
5. **Export Features**: Download questions as PDF or text
6. **Real-time Updates**: Use WebSockets for live question generation
7. **Performance Optimization**: Cache frequent job titles
8. **Analytics**: Track popular job titles and questions

---

## 🤝 Contributing

This project was built as an interview assignment to demonstrate:
- Full-stack web development skills
- Modern frontend development (React, Vite, Tailwind)
- Backend API design and Python/Django expertise
- Frontend-backend integration and HTTP communication
- Responsive design and UX principles
- AI/ML API integration
- Clean code and best practices

---

## 📄 License

This project is provided as-is for educational and interview purposes.

---

## 📞 Support

For questions or issues, please review the code comments and architecture documentation above.

---
