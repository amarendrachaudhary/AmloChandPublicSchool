# Amol Chand Public School Website
## Complete Documentation - Part 2

---

## 7. API Documentation

### 7.1 Base URL
```
http://localhost:5000/api
```

### 7.2 Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "admin": {
    "id": 1,
    "username": "admin",
    "name": "Administrator"
  }
}
```

#### Protected Routes
Include JWT token in headers:
```http
Authorization: Bearer <token>
```

### 7.3 API Endpoints

#### Notices
```http
# Get all notices
GET /api/notices

# Create notice (requires auth)
POST /api/notices
{
  "title": "Notice Title",
  "category": "Academic",
  "date": "2026-04-20",
  "description": "Notice description",
  "priority": "normal",
  "isNew": true
}

# Delete notice (requires auth)
DELETE /api/notices/:id
```

#### Events
```http
# Get all events
GET /api/events

# Create event (requires auth)
POST /api/events
{
  "name": "Event Name",
  "date": "2026-05-01",
  "time": "10:00 AM",
  "location": "School Auditorium",
  "description": "Event description",
  "category": "Cultural",
  "badgeColor": "blue"
}

# Delete event (requires auth)
DELETE /api/events/:id
```

#### Toppers
```http
# Get all toppers
GET /api/toppers

# Create topper (requires auth)
POST /api/toppers
{
  "name": "Student Name",
  "class": "XII - Science",
  "section": "A",
  "category": "board",
  "percentage": 98.5,
  "year": 2026,
  "position": "Board Topper",
  "rollNumber": "2026001",
  "subjects": {
    "Physics": 98,
    "Chemistry": 99,
    "Mathematics": 100
  },
  "remarks": "Outstanding performance"
}

# Delete topper (requires auth)
DELETE /api/toppers/:id
```

#### Faculty
```http
# Get all faculty
GET /api/faculty

# Create faculty (requires auth)
POST /api/faculty
{
  "name": "Teacher Name",
  "designation": "Head - Mathematics",
  "subject": "M.Sc. Mathematics",
  "icon": "fa-calculator"
}

# Delete faculty (requires auth)
DELETE /api/faculty/:id
```

#### Gallery
```http
# Get all images
GET /api/gallery

# Upload images (requires auth)
POST /api/gallery
Content-Type: multipart/form-data
{
  "images": [file1, file2],
  "category": "Events",
  "eventName": "Annual Day",
  "eventDate": "2026-04-15",
  "photographer": "John Doe",
  "description": "Event photos"
}

# Delete image (requires auth)
DELETE /api/gallery/:id
```

#### Downloads
```http
# Get all files
GET /api/downloads

# Upload file (requires auth)
POST /api/downloads
Content-Type: multipart/form-data
{
  "file": file,
  "title": "File Title",
  "category": "Forms",
  "description": "File description"
}

# Delete file (requires auth)
DELETE /api/downloads/:id
```

#### Fee Structure
```http
# Get all fees
GET /api/fee-structure

# Create fee (requires auth)
POST /api/fee-structure
{
  "class": "Class X",
  "session": "2026-27",
  "admissionFee": 5000,
  "tuitionFee": 3000,
  "annualCharges": 2000,
  "transportFee": "Optional"
}

# Delete fee (requires auth)
DELETE /api/fee-structure/:id
```

#### Results
```http
# Search result
POST /api/results/search
{
  "rollNumber": "2026001",
  "dob": "2010-05-15"
}

# Upload results (requires auth)
POST /api/results/upload
{
  "session": "2025-26",
  "class": "X",
  "examType": "Annual",
  "students": [
    {
      "rollNumber": "2026001",
      "studentName": "Student Name",
      "dob": "2010-05-15",
      "subjects": [
        {"name": "Math", "marks": 95, "maxMarks": 100}
      ],
      "totalMarks": 475,
      "maxMarks": 500,
      "percentage": 95.0,
      "status": "PASS"
    }
  ]
}
```

#### About Section
```http
# Get about info
GET /api/about

# Update about (requires auth)
PUT /api/about
{
  "schoolInfo": {
    "name": "School Name",
    "establishedYear": 1985,
    "affiliation": "CBSE",
    "description": "School description"
  },
  "missionVision": {
    "mission": "Mission statement",
    "vision": "Vision statement"
  },
  "principal": {
    "name": "Principal Name",
    "designation": "Principal",
    "message": "Principal's message"
  }
}
```

---

## 8. Frontend Components

### 8.1 Shared Components

#### Navigation Header
```html
<header class="site-header" id="navbar">
  <nav>
    <a href="index.html" class="logo-container">
      <div class="logo-icon">AC</div>
      <div>
        <div class="school-name">Amol Chand Public School</div>
        <div class="school-tagline">Empowering Future Leaders</div>
      </div>
    </a>
    <ul class="nav-links" id="nav-links">
      <!-- Navigation items -->
    </ul>
    <button class="hamburger" id="hamburger">
      <i class="fas fa-bars"></i>
    </button>
  </nav>
</header>
```

Features:
- Sticky header on scroll
- Mobile hamburger menu
- Dropdown menus
- Active link highlighting
- Smooth transitions

#### Footer
```html
<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <!-- School branding -->
    </div>
    <div class="footer-col">
      <!-- Quick links -->
    </div>
    <div class="footer-col">
      <!-- Resources -->
    </div>
    <div class="footer-col">
      <!-- Contact -->
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; <span data-current-year>2026</span> School Name</p>
  </div>
</footer>
```

#### Modal Component
```html
<div id="modalId" class="modal">
  <div class="modal-overlay"></div>
  <div class="modal-content glass">
    <button class="modal-close">
      <i class="fas fa-times"></i>
    </button>
    <!-- Modal content -->
  </div>
</div>
```

JavaScript:
```javascript
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('active');
  document.body.style.overflow = '';
}
```

### 8.2 Card Components

#### Glass Card
```html
<div class="glass glass-card">
  <!-- Content -->
</div>
```

#### Topper Card
```html
<div class="topper-card-large glass glass-card clickable">
  <div class="topper-rank-badge">1st Position</div>
  <div class="topper-avatar-large">R</div>
  <h3>Student Name</h3>
  <p>Class XII - Science</p>
  <div class="topper-percentage-large">98.5%</div>
  <div class="topper-view-details">
    <i class="fas fa-arrow-right"></i> View Details
  </div>
</div>
```

#### Faculty Card
```html
<div class="faculty-card glass glass-card clickable">
  <div class="faculty-avatar-large">
    <i class="fas fa-user-tie"></i>
  </div>
  <h3>Faculty Name</h3>
  <p class="designation">Principal</p>
  <p class="subject">M.Ed, Ph.D</p>
  <div class="topper-view-details">
    <i class="fas fa-arrow-right"></i> View Details
  </div>
</div>
```

### 8.3 Form Components

#### Glass Form
```html
<form class="glass-form" id="formId">
  <div class="form-row">
    <div class="form-group">
      <label class="form-label">Label</label>
      <input type="text" class="glass-input" placeholder="Placeholder">
    </div>
  </div>
  
  <div id="formMsg" class="form-status"></div>
  
  <button type="submit" class="btn">
    <i class="fas fa-icon"></i> Submit
  </button>
</form>
```

Form Validation:
```javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const data = {
    field: document.getElementById('field').value
  };
  
  try {
    const response = await api.endpoint(data);
    showMessage('formMsg', 'success', 'Success message');
    form.reset();
  } catch (error) {
    showMessage('formMsg', 'error', 'Error message');
  }
});
```

### 8.4 Grid Layouts

#### Responsive Grid
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

@media (min-width: 1200px) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

#### Toppers Grid
```css
.toppers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
```

#### Faculty Grid
```css
.faculty-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
```

---

## 9. Admin Panel

### 9.1 Admin Navigation

The admin panel features a dropdown-based navigation:

```html
<ul class="nav-links">
  <li><a href="admin.html">Dashboard</a></li>
  
  <li class="nav-dropdown">
    <a href="#"><span>Academics</span> <i class="fas fa-chevron-down"></i></a>
    <ul class="dropdown-menu">
      <li><a href="admin-syllabus.html">Syllabus</a></li>
      <li><a href="admin-results.html">Results</a></li>
      <li><a href="admin-toppers.html">Toppers</a></li>
      <li><a href="admin-faculty.html">Faculty</a></li>
    </ul>
  </li>
  
  <li class="nav-dropdown">
    <a href="#"><span>Announcements</span> <i class="fas fa-chevron-down"></i></a>
    <ul class="dropdown-menu">
      <li><a href="admin-events.html">Events</a></li>
      <li><a href="admin-notices.html">Notices</a></li>
    </ul>
  </li>
  
  <li><a href="admin-gallery.html">Gallery</a></li>
  <li><a href="admin-fee.html">Fee</a></li>
  <li><a href="admin-downloads.html">Downloads</a></li>
  <li><a href="admin-about.html">About</a></li>
</ul>
```

### 9.2 Dashboard Statistics

```javascript
// Calculate statistics
const stats = {
  totalNotices: notices.length,
  totalEvents: events.length,
  totalFaculty: faculty.length,
  totalToppers: toppers.length
};

// Display in cards
<div class="stats-grid">
  <div class="stat-card">
    <i class="fas fa-bullhorn"></i>
    <h3>${stats.totalNotices}</h3>
    <p>Notices</p>
  </div>
  <!-- More stat cards -->
</div>
```

### 9.3 Data Management Pattern

All admin pages follow this pattern:

```javascript
// 1. Load existing data
async function loadData() {
  try {
    data = await api.getData();
  } catch (error) {
    data = JSON.parse(localStorage.getItem('data')) || [];
  }
  renderData(data);
}

// 2. Create new entry
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newData = getFormData();
  
  try {
    await api.createData(newData);
  } catch (error) {
    // Fallback to localStorage
    saveToLocalStorage(newData);
  }
  
  await loadData();
  form.reset();
});

// 3. Delete entry
async function deleteData(id) {
  if (!confirm('Are you sure?')) return;
  
  try {
    await api.deleteData(id);
  } catch (error) {
    deleteFromLocalStorage(id);
  }
  
  await loadData();
}
```

### 9.4 File Upload Pattern

```javascript
// Image/File upload
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('title', title);
formData.append('category', category);

try {
  const response = await api.uploadFile(formData);
  showMessage('success', 'File uploaded successfully');
} catch (error) {
  showMessage('error', 'Upload failed');
}
```

---

## 10. Customization Guide

### 10.1 Color Scheme

Edit `css/styles.css`:
```css
:root {
  --primary: #2563eb;        /* Main blue */
  --secondary: #ec4899;      /* Pink accent */
  --accent: #10b981;         /* Green accent */
  --bg-deep: #060d1a;        /* Dark background */
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.18);
}
```

### 10.2 Typography

Change fonts in `css/styles.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;600;700&display=swap');

body {
  font-family: 'YourFont', sans-serif;
}
```

### 10.3 School Branding

#### Logo
Replace in HTML files:
```html
<div class="logo-icon">AC</div>
<!-- Or use image -->
<img src="assets/logo.png" alt="School Logo">
```

#### School Name
Update in all HTML files:
```html
<div class="school-name">Your School Name</div>
<div class="school-tagline">Your Tagline</div>
```

### 10.4 Adding New Pages

1. Create HTML file:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Page Title</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- Include header -->
  <!-- Page content -->
  <!-- Include footer -->
  <script src="js/script.js"></script>
</body>
</html>
```

2. Add navigation link:
```html
<li><a href="new-page.html">New Page</a></li>
```

3. Create JavaScript file if needed:
```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Page initialization
});
```

### 10.5 Modifying Toppers Categories

To add/modify topper categories, update:

1. **admin-toppers.html**:
```html
<select id="category">
  <option value="board">Board Topper</option>
  <option value="yearly">Yearly Topper</option>
  <option value="class">Class Topper</option>
  <option value="custom">Custom Category</option>
</select>
```

2. **js/toppers.js**:
```javascript
if (mode === 'custom') {
  displayCustomToppers();
}
```

3. **Database**: Update category field validation

---

*Continue to DOCUMENTATION_PART3.md for Deployment and Troubleshooting...*
