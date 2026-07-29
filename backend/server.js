const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'fluentx_super_secret_jwt_key_2026';

app.use(cors());
app.use(express.json());

// Request Logging Middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Load Mock Data
const coursesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'courses.json')));
const resourcesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'resources.json')));
const liveClassesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'liveClasses.json')));
const speakingClubData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'speakingClub.json')));

// In-Memory Database for Users & Progress
const usersDB = [
  {
    id: 'usr_demo',
    fullName: 'Alex Morgan',
    email: 'alex@fluentx.org',
    password: 'password123',
    country: 'United States',
    learningGoal: 'Speak English With Confidence',
    streak: 7,
    dailyGoalMinutes: 20,
    dailyProgressMinutes: 15,
    enrolledCourses: ['spoken-english-mastery', 'english-grammar-foundations'],
    completedLessons: ['l1', 'lg1'],
    notes: [
      { id: 'n1', courseTitle: 'Spoken English Mastery', lessonTitle: '1. Breaking the Translation Habit', note: 'Use pauses strategically instead of saying umm or err.' }
    ],
    certificates: [
      { id: 'cert_101', courseId: 'spoken-english-mastery', courseTitle: 'Spoken English Mastery', issueDate: '2026-07-20', grade: 'A+' }
    ]
  }
];

// Helper: JWT verification middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized access' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', platform: 'FluentX - Premium English Learning Platform API', timestamp: new Date() });
});

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { fullName, email, password, country, learningGoal } = req.body;
  if (!email || !password || !fullName) {
    return res.status(400).json({ message: 'Please provide full name, email, and password.' });
  }

  const existingUser = usersDB.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ message: 'An account with this email already exists.' });
  }

  const newUser = {
    id: 'usr_' + Date.now(),
    fullName,
    email,
    password,
    country: country || 'International',
    learningGoal: learningGoal || 'General Fluency',
    streak: 1,
    dailyGoalMinutes: 20,
    dailyProgressMinutes: 5,
    enrolledCourses: ['spoken-english-mastery'],
    completedLessons: [],
    notes: [],
    certificates: []
  };

  usersDB.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });
  const { password: _, ...userData } = newUser;
  res.status(201).json({ token, user: userData });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = usersDB.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  const { password: _, ...userData } = user;
  res.json({ token, user: userData });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = usersDB.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { password, ...userData } = user;
  res.json(userData);
});

// Courses API
app.get('/api/courses', (req, res) => {
  const { category, search } = req.query;
  let filtered = [...coursesData];
  if (category && category !== 'All') {
    filtered = filtered.filter(c => c.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
  }
  res.json(filtered);
});

app.get('/api/courses/:id', (req, res) => {
  const course = coursesData.find(c => c.id === req.params.id || c.slug === req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
});

// Resources API
app.get('/api/resources', (req, res) => {
  res.json(resourcesData);
});

// Live Classes API
app.get('/api/live-classes', (req, res) => {
  res.json(liveClassesData);
});

// Speaking Club API
app.get('/api/speaking-club', (req, res) => {
  res.json(speakingClubData);
});

// User Enroll & Progress API
app.post('/api/user/enroll', authenticateToken, (req, res) => {
  const { courseId } = req.body;
  const user = usersDB.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (!user.enrolledCourses.includes(courseId)) {
    user.enrolledCourses.push(courseId);
  }
  res.json({ message: 'Enrolled successfully', enrolledCourses: user.enrolledCourses });
});

app.post('/api/user/progress', authenticateToken, (req, res) => {
  const { lessonId, minutesSpent } = req.body;
  const user = usersDB.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (lessonId && !user.completedLessons.includes(lessonId)) {
    user.completedLessons.push(lessonId);
  }
  if (minutesSpent) {
    user.dailyProgressMinutes = (user.dailyProgressMinutes || 0) + minutesSpent;
  }
  res.json({
    completedLessons: user.completedLessons,
    dailyProgressMinutes: user.dailyProgressMinutes
  });
});

app.listen(PORT, () => {
  console.log(`FluentX Backend API running on http://localhost:${PORT}`);
});
