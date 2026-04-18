# Production Setup Guide
## Amol Chand Public School Website

**Last Updated:** April 18, 2026  
**Version:** 1.0.0

---

## 📋 Overview

This guide will help you deploy the school website to production with all necessary security and performance optimizations.

---

## 🚀 Quick Start (Production Deployment)

### Step 1: Review Production Readiness

```bash
# Read the production readiness report
cat PRODUCTION_READINESS_REPORT.md
```

**Key Points:**
- 6 Critical issues identified
- 6 Important issues identified
- All have solutions provided

### Step 2: Apply Database Fixes

```bash
# Connect to PostgreSQL
psql -U postgres -d school_db

# Run production fixes
\i backend/production_fixes.sql

# Verify constraints
\d toppers
\d student_results
```

### Step 3: Update Backend Dependencies

```bash
cd backend

# Update requirements.txt
cat >> requirements.txt << EOF
Flask-Migrate==4.0.5
Flask-Limiter==3.5.0
gunicorn==21.2.0
EOF

# Install new dependencies
pip install -r requirements.txt
```

### Step 4: Configure Production Environment

```bash
# Create production .env file
cp .env.example .env.production

# Edit with production values
nano .env.production
```

**Production .env:**
```env
# Database
DATABASE_URL=postgresql://school_user:STRONG_PASSWORD_HERE@localhost:5432/school_db

# Security - Generate with: python -c "import secrets; print(secrets.token_urlsafe(50))"
SECRET_KEY=YOUR_GENERATED_SECRET_KEY_HERE_AT_LEAST_50_CHARACTERS
JWT_SECRET_KEY=ANOTHER_GENERATED_SECRET_KEY_DIFFERENT_FROM_ABOVE

# Flask
FLASK_ENV=production
FLASK_DEBUG=False

# CORS - Your actual domain
CORS_ORIGINS=https://school.example.com,https://www.school.example.com

# Upload
UPLOAD_FOLDER=/var/www/school/uploads
MAX_CONTENT_LENGTH=10485760

# Logging
LOG_LEVEL=INFO
LOG_FILE=/var/log/school_api/app.log
```

### Step 5: Generate Secret Keys

```bash
# Generate SECRET_KEY
python3 -c "import secrets; print('SECRET_KEY=' + secrets.token_urlsafe(50))"

# Generate JWT_SECRET_KEY
python3 -c "import secrets; print('JWT_SECRET_KEY=' + secrets.token_urlsafe(50))"

# Copy these to your .env.production file
```

### Step 6: Change Default Admin Password

```bash
# Connect to database
psql -U postgres -d school_db

# Generate new password hash
python3 -c "from werkzeug.security import generate_password_hash; print(generate_password_hash('YOUR_NEW_STRONG_PASSWORD'))"

# Update admin password
UPDATE admins 
SET password_hash = 'PASTE_GENERATED_HASH_HERE'
WHERE username = 'admin';
```

### Step 7: Set Up Gunicorn

```bash
# Create Gunicorn config
cat > backend/gunicorn_config.py << EOF
import multiprocessing

bind = "127.0.0.1:5000"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2

# Logging
accesslog = "/var/log/school_api/access.log"
errorlog = "/var/log/school_api/error.log"
loglevel = "info"

# Process naming
proc_name = "school_api"

# Server mechanics
daemon = False
pidfile = "/var/run/school_api.pid"
EOF

# Create log directory
sudo mkdir -p /var/log/school_api
sudo chown $USER:$USER /var/log/school_api
```

### Step 8: Create Systemd Service

```bash
# Create service file
sudo nano /etc/systemd/system/school-api.service
```

**Service File Content:**
```ini
[Unit]
Description=School Management API
After=network.target postgresql.service

[Service]
Type=notify
User=www-data
Group=www-data
WorkingDirectory=/var/www/school/backend
Environment="PATH=/var/www/school/backend/venv/bin"
EnvironmentFile=/var/www/school/backend/.env.production
ExecStart=/var/www/school/backend/venv/bin/gunicorn \
    --config gunicorn_config.py \
    app:app
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=mixed
TimeoutStopSec=5
PrivateTmp=true
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable school-api
sudo systemctl start school-api
sudo systemctl status school-api
```

### Step 9: Configure Nginx

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/school
```

**Nginx Configuration:**
```nginx
# API Backend
upstream school_api {
    server 127.0.0.1:5000 fail_timeout=0;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name school.example.com www.school.example.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    server_name school.example.com www.school.example.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/school.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/school.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval';" always;
    
    # Frontend Static Files
    root /var/www/school/public;
    index index.html;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;
    
    # Static Files Caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API Proxy
    location /api/ {
        proxy_pass http://school_api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Health Check
    location /health {
        proxy_pass http://school_api;
        access_log off;
    }
    
    # Main Application
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/school /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 10: Set Up SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d school.example.com -d www.school.example.com

# Test auto-renewal
sudo certbot renew --dry-run

# Auto-renewal is set up automatically via cron
```

### Step 11: Set Up Database Backups

```bash
# Create backup script
sudo nano /usr/local/bin/backup-school-db.sh
```

**Backup Script:**
```bash
#!/bin/bash

# Configuration
DB_NAME="school_db"
DB_USER="postgres"
BACKUP_DIR="/var/backups/school_db"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/school_db_$DATE.sql"
RETENTION_DAYS=30

# Create backup directory
mkdir -p $BACKUP_DIR

# Perform backup
pg_dump -U $DB_USER $DB_NAME > $BACKUP_FILE

# Compress backup
gzip $BACKUP_FILE

# Delete old backups
find $BACKUP_DIR -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete

# Log
echo "$(date): Backup completed - $BACKUP_FILE.gz" >> /var/log/school_db_backup.log
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-school-db.sh

# Add to crontab (daily at 2 AM)
sudo crontab -e

# Add this line:
0 2 * * * /usr/local/bin/backup-school-db.sh
```

### Step 12: Set Up Monitoring

```bash
# Install monitoring tools
sudo apt install htop iotop nethogs

# Set up log rotation
sudo nano /etc/logrotate.d/school-api
```

**Log Rotation Config:**
```
/var/log/school_api/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        systemctl reload school-api > /dev/null 2>&1 || true
    endscript
}
```

### Step 13: Final Security Checks

```bash
# Update firewall
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable

# Secure PostgreSQL
sudo nano /etc/postgresql/*/main/pg_hba.conf
# Change: host all all 0.0.0.0/0 md5
# To:     host all all 127.0.0.1/32 md5

# Restart PostgreSQL
sudo systemctl restart postgresql

# Set file permissions
sudo chown -R www-data:www-data /var/www/school
sudo chmod -R 755 /var/www/school
sudo chmod -R 775 /var/www/school/uploads
```

### Step 14: Test Everything

```bash
# Test API health
curl https://school.example.com/health

# Test API version
curl https://school.example.com/api/version

# Test login (should fail with rate limit after 5 attempts)
curl -X POST https://school.example.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"wrong"}'

# Check logs
sudo journalctl -u school-api -f
tail -f /var/log/school_api/app.log
```

---

## 📊 Post-Deployment Checklist

- [ ] Database constraints applied
- [ ] Production .env configured
- [ ] Secret keys generated and set
- [ ] Admin password changed
- [ ] Gunicorn configured and running
- [ ] Systemd service enabled
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Database backups scheduled
- [ ] Log rotation configured
- [ ] All endpoints tested
- [ ] Monitoring set up
- [ ] Documentation updated

---

## 🔍 Monitoring Commands

```bash
# Check API status
sudo systemctl status school-api

# View API logs
sudo journalctl -u school-api -n 100 --no-pager

# Check Nginx status
sudo systemctl status nginx

# View Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Check database connections
sudo -u postgres psql -c "SELECT count(*) FROM pg_stat_activity WHERE datname='school_db';"

# Check disk space
df -h

# Check memory usage
free -h

# Check CPU usage
top
```

---

## 🐛 Troubleshooting

### API Not Starting

```bash
# Check logs
sudo journalctl -u school-api -n 50

# Check if port is in use
sudo netstat -tulpn | grep 5000

# Test manually
cd /var/www/school/backend
source venv/bin/activate
python app.py
```

### Database Connection Issues

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test connection
psql -U postgres -d school_db -c "SELECT 1;"

# Check pg_hba.conf
sudo cat /etc/postgresql/*/main/pg_hba.conf
```

### SSL Certificate Issues

```bash
# Check certificate
sudo certbot certificates

# Renew manually
sudo certbot renew

# Check Nginx config
sudo nginx -t
```

---

## 📈 Performance Optimization

### Enable Redis Caching (Optional)

```bash
# Install Redis
sudo apt install redis-server

# Configure Redis
sudo nano /etc/redis/redis.conf
# Set: maxmemory 256mb
# Set: maxmemory-policy allkeys-lru

# Restart Redis
sudo systemctl restart redis

# Update requirements.txt
echo "redis==5.0.1" >> backend/requirements.txt
pip install redis
```

### Database Optimization

```sql
-- Run these periodically
VACUUM ANALYZE;
REINDEX DATABASE school_db;

-- Check slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

---

## 🔒 Security Best Practices

1. **Regular Updates**
   ```bash
   sudo apt update && sudo apt upgrade
   ```

2. **Monitor Failed Login Attempts**
   ```bash
   grep "Failed login" /var/log/school_api/app.log
   ```

3. **Review Access Logs**
   ```bash
   sudo tail -f /var/log/nginx/access.log
   ```

4. **Check for Vulnerabilities**
   ```bash
   pip list --outdated
   ```

5. **Backup Verification**
   ```bash
   # Test restore
   gunzip < /var/backups/school_db/latest.sql.gz | psql -U postgres school_db_test
   ```

---

## 📞 Support

For issues:
1. Check logs: `/var/log/school_api/`
2. Review documentation
3. Test in development first
4. Keep backups before changes

---

**Production Setup Complete! 🎉**

Your school website is now production-ready with:
- ✅ Secure configuration
- ✅ Performance optimization
- ✅ Automated backups
- ✅ Monitoring
- ✅ SSL encryption
- ✅ Rate limiting
- ✅ Error handling

---

**Last Updated:** April 18, 2026  
**Version:** 1.0.0
