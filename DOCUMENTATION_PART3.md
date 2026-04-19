# Amol Chand Public School Website
## Complete Documentation - Part 3

---

## 11. Deployment

### 11.1 Production Checklist

#### Security
- [ ] Change default admin password
- [ ] Set strong SECRET_KEY and JWT_SECRET_KEY
- [ ] Enable HTTPS only
- [ ] Configure CORS properly
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Regular security updates

#### Performance
- [ ] Minify CSS files
- [ ] Minify JavaScript files
- [ ] Optimize images (WebP format)
- [ ] Enable Gzip compression
- [ ] Set up CDN for assets
- [ ] Configure caching headers
- [ ] Enable lazy loading

#### Database
- [ ] Set up automated backups
- [ ] Configure connection pooling
- [ ] Optimize indexes
- [ ] Set up monitoring
- [ ] Configure log rotation

### 11.2 Frontend Deployment

#### Option 1: Static Hosting (Netlify, Vercel)

1. **Build Process**:
```bash
# Minify CSS
npx clean-css-cli -o css/styles.min.css css/styles.css

# Minify JavaScript
npx terser js/script.js -o js/script.min.js
```

2. **Update HTML** to use minified files:
```html
<link rel="stylesheet" href="css/styles.min.css">
<script src="js/script.min.js"></script>
```

3. **Deploy**:
```bash
# Netlify
netlify deploy --prod

# Vercel
vercel --prod
```

#### Option 2: Traditional Web Server (Apache/Nginx)

**Apache Configuration**:
```apache
<VirtualHost *:80>
    ServerName school.example.com
    DocumentRoot /var/www/school
    
    <Directory /var/www/school>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Enable compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/css text/javascript
    </IfModule>
    
    # Cache static assets
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType image/jpg "access plus 1 year"
        ExpiresByType image/jpeg "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType text/css "access plus 1 month"
        ExpiresByType application/javascript "access plus 1 month"
    </IfModule>
</VirtualHost>
```

**Nginx Configuration**:
```nginx
server {
    listen 80;
    server_name school.example.com;
    root /var/www/school;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

### 11.3 Backend Deployment

#### Option 1: Heroku

1. **Create Procfile**:
```
web: gunicorn app:app
```

2. **Update requirements.txt**:
```
gunicorn==20.1.0
```

3. **Deploy**:
```bash
heroku create school-api
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

#### Option 2: VPS (DigitalOcean, AWS, etc.)

1. **Install Dependencies**:
```bash
sudo apt update
sudo apt install python3-pip python3-venv postgresql nginx
```

2. **Setup Application**:
```bash
cd /var/www/school-api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
```

3. **Create Systemd Service** (`/etc/systemd/system/school-api.service`):
```ini
[Unit]
Description=School API
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/school-api
Environment="PATH=/var/www/school-api/venv/bin"
ExecStart=/var/www/school-api/venv/bin/gunicorn -w 4 -b 127.0.0.1:5000 app:app

[Install]
WantedBy=multi-user.target
```

4. **Nginx Reverse Proxy**:
```nginx
server {
    listen 80;
    server_name api.school.example.com;
    
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

5. **Start Service**:
```bash
sudo systemctl start school-api
sudo systemctl enable school-api
```

### 11.4 SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d school.example.com -d api.school.example.com

# Auto-renewal
sudo certbot renew --dry-run
```

### 11.5 Environment Variables

**Production .env**:
```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/school_db

# Security
SECRET_KEY=your-very-long-random-secret-key
JWT_SECRET_KEY=another-very-long-random-secret-key

# Flask
FLASK_ENV=production
FLASK_DEBUG=False

# CORS
CORS_ORIGINS=https://school.example.com

# Upload
UPLOAD_FOLDER=/var/www/uploads
MAX_CONTENT_LENGTH=16777216  # 16MB
```

---

## 12. Troubleshooting

### 12.1 Common Issues

#### Issue: API Connection Failed

**Symptoms**: "API unavailable, using localStorage" messages

**Solutions**:
1. Check if backend server is running:
```bash
curl http://localhost:5000/api/notices
```

2. Verify API_BASE_URL in `js/api-service.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

3. Check CORS configuration in `backend/app.py`:
```python
CORS(app, resources={r"/api/*": {"origins": "*"}})
```

4. Check browser console for errors (F12)

#### Issue: Database Connection Error

**Symptoms**: "Connection refused" or "Database does not exist"

**Solutions**:
1. Verify PostgreSQL is running:
```bash
sudo systemctl status postgresql
```

2. Check database exists:
```bash
psql -U postgres -l
```

3. Verify DATABASE_URL in `.env`:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/school_db
```

4. Test connection:
```bash
psql -U username -d school_db
```

#### Issue: Images Not Displaying

**Symptoms**: Broken image icons

**Solutions**:
1. Check file paths are correct
2. Verify upload folder permissions:
```bash
chmod 755 /var/www/uploads
```

3. Check image URLs in browser network tab
4. Verify UPLOAD_FOLDER in backend configuration

#### Issue: Admin Login Not Working

**Symptoms**: "Invalid credentials" error

**Solutions**:
1. Verify admin user exists:
```sql
SELECT * FROM admins;
```

2. Reset admin password:
```sql
UPDATE admins 
SET password_hash = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU7667oPK45K'
WHERE username = 'admin';
-- Password: admin123
```

3. Check JWT_SECRET_KEY is set
4. Clear browser cookies and try again

#### Issue: Toppers Not Showing

**Symptoms**: Empty toppers section

**Solutions**:
1. Check if toppers exist in database:
```sql
SELECT * FROM toppers WHERE is_active = true;
```

2. Verify category filter:
```javascript
// Homepage shows only 'board' category
const boardToppers = toppers.filter(t => t.category === 'board');
```

3. Check browser console for JavaScript errors
4. Verify API endpoint is working:
```bash
curl http://localhost:5000/api/toppers
```

#### Issue: Faculty Cards Full Width

**Symptoms**: One faculty card per row

**Solutions**:
1. Verify CSS class is `faculty-grid`:
```html
<div id="facultyGrid" class="faculty-grid">
```

2. Check faculty.css is loaded:
```html
<link rel="stylesheet" href="css/faculty.css">
```

3. Verify grid CSS:
```css
.faculty-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
```

#### Issue: Mobile Menu Not Working

**Symptoms**: Hamburger menu doesn't open

**Solutions**:
1. Check JavaScript is loaded:
```html
<script src="js/script.js"></script>
```

2. Verify hamburger button ID:
```html
<button class="hamburger" id="hamburger">
```

3. Check browser console for errors
4. Test on different browsers

### 12.2 Performance Issues

#### Slow Page Load

**Solutions**:
1. Enable lazy loading for images:
```html
<img loading="lazy" src="image.jpg">
```

2. Minify CSS and JavaScript
3. Enable Gzip compression
4. Use CDN for assets
5. Optimize images (compress, use WebP)
6. Reduce HTTP requests

#### Slow Database Queries

**Solutions**:
1. Add indexes:
```sql
CREATE INDEX idx_name ON table(column);
```

2. Use EXPLAIN to analyze queries:
```sql
EXPLAIN ANALYZE SELECT * FROM toppers;
```

3. Optimize queries (avoid SELECT *)
4. Enable query caching
5. Use connection pooling

### 12.3 Browser Compatibility

#### CSS Not Working in Old Browsers

**Solutions**:
1. Add vendor prefixes:
```css
.element {
  -webkit-transform: translateY(-10px);
  -moz-transform: translateY(-10px);
  transform: translateY(-10px);
}
```

2. Use autoprefixer:
```bash
npx autoprefixer css/styles.css -o css/styles.prefixed.css
```

3. Add polyfills for older browsers

#### JavaScript Errors in IE11

**Solutions**:
1. Transpile ES6+ to ES5 using Babel
2. Add polyfills:
```html
<script src="https://polyfill.io/v3/polyfill.min.js"></script>
```

3. Avoid arrow functions in global scope
4. Use var instead of let/const for IE11

### 12.4 Debugging Tips

#### Enable Debug Mode

**Backend**:
```python
# app.py
app.config['DEBUG'] = True
```

**Frontend**:
```javascript
// Add console logs
console.log('Data:', data);
console.error('Error:', error);
```

#### Browser DevTools

1. **Console Tab**: Check for JavaScript errors
2. **Network Tab**: Monitor API requests
3. **Elements Tab**: Inspect HTML/CSS
4. **Application Tab**: Check localStorage
5. **Performance Tab**: Analyze load times

#### Database Debugging

```sql
-- Check table contents
SELECT * FROM toppers LIMIT 10;

-- Check recent entries
SELECT * FROM notices ORDER BY created_at DESC LIMIT 5;

-- Count records
SELECT COUNT(*) FROM faculty;

-- Check for duplicates
SELECT name, COUNT(*) FROM toppers GROUP BY name HAVING COUNT(*) > 1;
```

---

## 13. Maintenance

### 13.1 Regular Tasks

#### Daily
- Monitor error logs
- Check website uptime
- Verify backups completed

#### Weekly
- Review user feedback
- Update content
- Check for broken links
- Monitor performance

#### Monthly
- Update dependencies
- Security audit
- Database optimization
- Review analytics

#### Quarterly
- Full system backup
- Disaster recovery test
- Performance review
- Feature planning

### 13.2 Backup Strategy

#### Database Backup
```bash
# Daily automated backup
pg_dump school_db > backup_$(date +%Y%m%d).sql

# Restore from backup
psql school_db < backup_20260418.sql
```

#### File Backup
```bash
# Backup uploads folder
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz /var/www/uploads

# Restore
tar -xzf uploads_backup_20260418.tar.gz -C /var/www/
```

#### Full System Backup
```bash
# Backup everything
tar -czf full_backup_$(date +%Y%m%d).tar.gz \
  /var/www/school \
  /var/www/school-api \
  /var/www/uploads

# Automated with cron
0 2 * * * /path/to/backup-script.sh
```

### 13.3 Monitoring

#### Server Monitoring
```bash
# Check disk space
df -h

# Check memory usage
free -m

# Check CPU usage
top

# Check running processes
ps aux | grep python
```

#### Application Monitoring
- Use tools like:
  - **Uptime Robot**: Website uptime monitoring
  - **Google Analytics**: User analytics
  - **Sentry**: Error tracking
  - **New Relic**: Performance monitoring

### 13.4 Updates

#### Updating Dependencies

**Backend**:
```bash
pip list --outdated
pip install --upgrade package-name
pip freeze > requirements.txt
```

**Frontend**:
```bash
# Update CDN links in HTML
# Check for new versions of Font Awesome, etc.
```

#### Database Migrations

```sql
-- Add new column
ALTER TABLE toppers ADD COLUMN new_field VARCHAR(100);

-- Modify column
ALTER TABLE toppers ALTER COLUMN percentage TYPE DECIMAL(6,2);

-- Add index
CREATE INDEX idx_new ON toppers(new_field);
```

---

## 14. Best Practices

### 14.1 Code Quality

- ✅ Use consistent naming conventions
- ✅ Write meaningful comments
- ✅ Follow DRY principle
- ✅ Keep functions small and focused
- ✅ Use async/await for asynchronous code
- ✅ Handle errors gracefully
- ✅ Validate user input
- ✅ Sanitize data before display

### 14.2 Security

- ✅ Never store passwords in plain text
- ✅ Use HTTPS in production
- ✅ Validate and sanitize all inputs
- ✅ Use parameterized queries
- ✅ Implement rate limiting
- ✅ Keep dependencies updated
- ✅ Use environment variables for secrets
- ✅ Implement CSRF protection

### 14.3 Performance

- ✅ Minimize HTTP requests
- ✅ Optimize images
- ✅ Use lazy loading
- ✅ Enable caching
- ✅ Minify CSS/JS
- ✅ Use CDN for assets
- ✅ Optimize database queries
- ✅ Use connection pooling

### 14.4 Accessibility

- ✅ Use semantic HTML
- ✅ Add ARIA labels
- ✅ Ensure keyboard navigation
- ✅ Provide alt text for images
- ✅ Maintain color contrast
- ✅ Support screen readers
- ✅ Test with accessibility tools

---

## 15. Support & Resources

### 15.1 Documentation Files

- **README.md**: Project overview
- **IMPLEMENTATION_GUIDE.md**: Detailed setup
- **QUICK_IMPLEMENTATION.md**: Quick start
- **CODE_CLEANUP_REPORT.md**: Code quality report
- **DOCUMENTATION_PART1.md**: Overview & setup
- **DOCUMENTATION_PART2.md**: API & components
- **DOCUMENTATION_PART3.md**: Deployment & troubleshooting

### 15.2 Useful Links

- **Flask Documentation**: https://flask.palletsprojects.com/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **MDN Web Docs**: https://developer.mozilla.org/
- **Font Awesome Icons**: https://fontawesome.com/icons
- **Google Fonts**: https://fonts.google.com/

### 15.3 Contact

For technical support:
- Review documentation files
- Check troubleshooting section
- Test in development environment first
- Keep backups before making changes

---

## 16. Changelog

### Version 1.0.0 (April 18, 2026)
- ✅ Initial release
- ✅ Complete public website
- ✅ Full admin panel
- ✅ Backend API with PostgreSQL
- ✅ Toppers system with 3 categories
- ✅ Faculty management
- ✅ Gallery with image viewer
- ✅ Results checker
- ✅ Responsive design
- ✅ Offline capability
- ✅ Production-ready code

---

## 17. License

This project is proprietary software developed for Amol Chand Public School.

---

## 18. Credits

**Developed by**: Development Team  
**Design**: Custom glassmorphism design  
**Icons**: Font Awesome 6.4.0  
**Fonts**: Google Fonts (Poppins, Playfair Display)  
**Framework**: Flask + Vanilla JavaScript  
**Database**: PostgreSQL

---

**End of Documentation**

For questions or support, refer to the troubleshooting section or contact the development team.

**Last Updated**: April 18, 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
