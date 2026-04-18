# 🚀 Deployment Guide

## Quick Start

### 1. Frontend (No Backend Required)
Simply open `index.html` in your browser. The website works with localStorage as fallback.

### 2. With Backend (Production)

**Prerequisites:**
- Python 3.8+
- PostgreSQL 12+

**Setup:**
```bash
# 1. Install dependencies
cd backend
pip install -r requirements.txt

# 2. Configure environment
cp .env.example .env
# Edit .env with your database credentials

# 3. Setup database
python -c "from app import db; db.create_all()"

# 4. Create admin user
python -c "from app import *; admin = Admin(username='admin', name='Administrator'); admin.set_password('admin123'); db.session.add(admin); db.session.commit()"

# 5. Run server
python app.py
```

**Access:**
- Frontend: http://localhost:8000
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:8000/admin.html
- Credentials: `admin` / `admin123`

## Production Deployment

See `PRODUCTION_SETUP_GUIDE.md` for detailed production deployment instructions.

## Features

- ✅ Modern glassmorphism UI
- ✅ Responsive design
- ✅ Admin panel for content management
- ✅ Gallery with image upload
- ✅ Student results portal
- ✅ Notice board and events
- ✅ Faculty management
- ✅ Toppers showcase
- ✅ Downloadable resources

## Support

For issues or questions, please create an issue on GitHub.