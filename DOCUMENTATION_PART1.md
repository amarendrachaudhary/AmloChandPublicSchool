# Amol Chand Public School Website
## Complete Documentation

**Version:** 1.0.0  
**Last Updated:** April 18, 2026  
**Status:** Production Ready

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [File Structure](#file-structure)
4. [Features](#features)
5. [Setup Instructions](#setup-instructions)
6. [Database Schema](#database-schema)
7. [API Documentation](#api-documentation)
8. [Frontend Components](#frontend-components)
9. [Admin Panel](#admin-panel)
10. [Customization Guide](#customization-guide)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

---

## 1. Project Overview

### About
Amol Chand Public School Website is a comprehensive school management system featuring:
- **Public Website**: Information portal for students, parents, and visitors
- **Admin Panel**: Content management system for school administrators
- **Backend API**: RESTful API built with Flask and PostgreSQL

### Key Highlights
- ✅ Modern glassmorphism design
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Real-time data synchronization
- ✅ Offline-capable (localStorage fallback)
- ✅ SEO optimized
- ✅ Accessibility compliant
- ✅ Performance optimized

---

## 2. Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript (ES6+)**: Vanilla JS, async/await
- **Font Awesome 6.4.0**: Icons
- **Google Fonts**: Poppins, Playfair Display

### Backend
- **Python 3.8+**: Programming language
- **Flask 2.x**: Web framework
- **PostgreSQL 13+**: Database
- **SQLAlchemy**: ORM
- **Flask-CORS**: Cross-origin support
- **PyJWT**: Authentication
- **Bcrypt**: Password hashing

### Development Tools
- Git for version control
- VS Code (recommended)
- PostgreSQL client
- Python virtual environment

---

## 3. File Structure

```
amol-chand-public-school/
│
├── Public Pages (HTML)
│   ├── index.html              # Homepage
│   ├── about.html              # About school
│   ├── gallery.html            # Photo gallery
│   ├── admission.html          # Admission info
│   ├── contact.html            # Contact form
│   ├── faculty.html            # Faculty listing
│   ├── toppers.html            # Board of fame
│   ├── syllabus.html           # Syllabus viewer
│   ├── result.html             # Result checker
│   └── activity.html           # Activities
│
├── Admin Pages (HTML)
│   ├── admin.html              # Dashboard
│   ├── admin-about.html        # About editor
│   ├── admin-notices.html      # Notices management
│   ├── admin-events.html       # Events management
│   ├── admin-gallery.html      # Gallery management
│   ├── admin-downloads.html    # Files management
│   ├── admin-fee.html          # Fee structure
│   ├── admin-results.html      # Results upload
│   ├── admin-syllabus.html     # Syllabus management
│   ├── admin-toppers.html      # Toppers management
│   └── admin-faculty.html      # Faculty management
│
├── JavaScript (js/)
│   ├── script.js               # Shared functionality
│   ├── api-service.js          # API communication
│   ├── admin.js                # Admin dashboard
│   ├── faculty.js              # Faculty page
│   ├── syllabus.js             # Syllabus page
│   ├── toppers.js              # Toppers page
│   └── admin-*.js              # Admin page scripts
│
├── Stylesheets (css/)
│   ├── styles.css              # Main styles
│   ├── admin.css               # Admin styles
│   ├── faculty.css             # Faculty styles
│   ├── gallery.css             # Gallery styles
│   └── toppers.css             # Toppers styles
│
├── Backend (backend/)
│   ├── app.py                  # Flask application
│   ├── database_setup.sql      # Database schema
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example            # Environment template
│   └── README.md               # Backend docs
│
├── Assets (assets/)
│   └── images/                 # Event photos, toppers
│
└── Documentation
    ├── README.md               # Project overview
    ├── IMPLEMENTATION_GUIDE.md # Setup guide
    ├── QUICK_IMPLEMENTATION.md # Quick start
    └── CODE_CLEANUP_REPORT.md  # Code quality
```

---

## 4. Features

### 4.1 Public Website Features

#### Homepage
- Hero section with school branding
- Latest notices (3 most recent)
- Upcoming events (3 upcoming)
- Board of fame (4 board toppers)
- Faculty preview (4 members)
- Quick links and contact info

#### About Page
- School history and information
- Mission and vision statements
- Principal's message
- Achievements and affiliations
- Infrastructure details

#### Gallery
- Category-based filtering (Events, Sports, Cultural, Academic)
- Full-screen image viewer
- Lazy loading for performance
- Responsive grid layout
- Click to enlarge functionality

#### Admission
- Online admission form
- Fee structure display
- Downloadable forms
- Admission process information
- Contact details

#### Contact
- Contact form with validation
- School address and map
- Phone and email
- Office hours
- Social media links

#### Faculty
- Grid layout (4 per row on desktop)
- Faculty cards with photos
- Click for detailed view
- Qualification and experience
- Contact information

#### Toppers (Board of Fame)
- **3 Categories**:
  1. **Board Toppers**: Class X and XII board exam toppers
  2. **Yearly Toppers**: 1st, 2nd, 3rd from each class (Nursery to XII)
  3. **Class Toppers**: Current year class toppers
- Year filter for yearly toppers
- Subject-wise marks display
- Modal for detailed view
- Responsive card grid

#### Syllabus
- Class-wise syllabus viewer
- Subject-wise breakdown
- Downloadable PDFs
- Search functionality
- Organized by class

#### Results
- Roll number + DOB verification
- Subject-wise marks display
- Grade calculation
- Print functionality
- PDF download option
- Bulk result upload support

#### Activities
- School activities showcase
- Category-based organization
- Image galleries
- Event descriptions

### 4.2 Admin Panel Features

#### Dashboard
- Statistics overview
- Quick actions
- Recent activity
- System status
- Navigation menu

#### Notices Management
- Create/edit/delete notices
- Priority levels (Normal, High, Urgent)
- Category assignment
- "New" badge toggle
- Date scheduling
- Newest first sorting

#### Events Management
- Add/edit/delete events
- Date and time scheduling
- Location details
- Category badges
- Color coding
- Upcoming events view

#### Gallery Management
- Bulk image upload
- Drag-and-drop support
- Image preview
- Category assignment
- Event details
- Delete functionality
- Newest first sorting

#### Downloads Management
- File upload (PDF, DOC, XLS)
- Category organization
- File size display
- Download tracking
- Delete functionality
- Newest first sorting

#### Fee Structure
- Class-wise fee management
- Session-based fees
- Multiple fee components
- Edit/delete functionality
- Tabular display

#### Results Upload
- Bulk student results
- CSV/Excel import
- Subject-wise marks
- Grade calculation
- Session and exam type
- Roll number management

#### Syllabus Management
- Class-wise syllabus
- Subject addition
- PDF upload
- Edit/delete functionality
- Organized display

#### Toppers Management
- Add/edit/delete toppers
- **3 Categories**: Board, Yearly, Class
- Complete class list (Nursery to XII)
- Section assignment
- Position/rank selection
- Year specification
- Roll number
- Subject-wise marks (JSON)
- Percentage calculation
- Remarks field
- **Smart Sorting**: By class order, then rank (1st, 2nd, 3rd)

#### Faculty Management
- Add/edit/delete faculty
- Name and designation
- Subject/qualification
- Icon selection
- Experience details
- Email and contact
- Remarks
- Grid display (4 per row)
- Newest first sorting

#### About Section Editor
- School information
- Mission and vision
- Principal details
- Establishment year
- Affiliation info
- Real-time preview

---

## 5. Setup Instructions

### 5.1 Prerequisites
```bash
# Required software
- Python 3.8 or higher
- PostgreSQL 13 or higher
- Git
- Modern web browser
- Text editor (VS Code recommended)
```

### 5.2 Backend Setup

#### Step 1: Clone Repository
```bash
git clone <repository-url>
cd amol-chand-public-school
```

#### Step 2: Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

#### Step 3: Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Step 4: Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env file with your settings
DATABASE_URL=postgresql://username:password@localhost:5432/school_db
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-here
```

#### Step 5: Setup Database
```bash
# Create database
createdb school_db

# Run setup script (Windows)
setup_database.bat

# Or manually
psql -U postgres -d school_db -f database_setup.sql
```

#### Step 6: Start Backend Server
```bash
python app.py
# Server runs on http://localhost:5000
```

### 5.3 Frontend Setup

#### Step 1: Configure API Endpoint
Edit `js/api-service.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

#### Step 2: Serve Frontend
```bash
# Option 1: Python HTTP Server
python -m http.server 8000

# Option 2: Node.js HTTP Server
npx http-server -p 8000

# Option 3: VS Code Live Server extension
```

#### Step 3: Access Website
```
Public Site: http://localhost:8000/index.html
Admin Panel: http://localhost:8000/admin.html
```

### 5.4 Default Admin Credentials
```
Username: admin
Password: admin123
```
⚠️ **Change these immediately in production!**

---

## 6. Database Schema

### 6.1 Tables Overview

The database consists of 10 tables:

1. **admins** - Admin user accounts
2. **notices** - School notices
3. **events** - School events
4. **gallery_images** - Photo gallery
5. **download_files** - Downloadable files
6. **fee_structure** - Fee information
7. **student_results** - Exam results
8. **about_section** - School information
9. **toppers** - Board of fame
10. **faculty** - Staff members

### 6.2 Detailed Schema

#### admins
```sql
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(120) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### notices
```sql
CREATE TABLE notices (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'normal',
    is_new BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### events
```sql
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    badge_color VARCHAR(20) DEFAULT 'blue',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### toppers
```sql
CREATE TABLE toppers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    class VARCHAR(50) NOT NULL,
    section VARCHAR(10),
    category VARCHAR(50) NOT NULL,  -- 'board', 'yearly', 'class'
    percentage DECIMAL(5,2) NOT NULL,
    year INTEGER,
    position VARCHAR(100) NOT NULL,
    rank VARCHAR(100),
    roll_number VARCHAR(50),
    subjects JSONB,
    remarks TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### faculty
```sql
CREATE TABLE faculty (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    subject VARCHAR(150) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6.3 Indexes
```sql
CREATE INDEX idx_notices_date ON notices(date DESC);
CREATE INDEX idx_events_date ON events(date ASC);
CREATE INDEX idx_toppers_order ON toppers(display_order ASC, created_at DESC);
CREATE INDEX idx_faculty_order ON faculty(display_order ASC, created_at DESC);
```

---

*Continue to DOCUMENTATION_PART2.md for API Documentation and more...*
