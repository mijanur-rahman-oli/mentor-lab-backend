const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database - In-memory storage
let courses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js and more',
    fullDescription: 'Master web development from scratch with this comprehensive bootcamp. You will learn HTML5, CSS3, JavaScript ES6+, React.js, Node.js, Express, MongoDB, and modern development practices. Build real-world projects and deploy them to production.',
    price: 89.99,
    instructor: 'John Smith',
    duration: '40 hours',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    students: 12453,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Advanced React and Redux',
    description: 'Master React hooks, context, Redux toolkit and more',
    fullDescription: 'Take your React skills to the next level with advanced patterns, performance optimization, Redux Toolkit, server-side rendering, and testing strategies. Build scalable applications with confidence.',
    price: 79.99,
    instructor: 'Sarah Johnson',
    duration: '30 hours',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    students: 8932,
    rating: 4.9
  },
  {
    id: '3',
    title: 'Python for Data Science',
    description: 'Data analysis, visualization, and machine learning',
    fullDescription: 'Learn Python programming for data science. Master NumPy, Pandas, Matplotlib, Seaborn, and scikit-learn. Perform data analysis, create stunning visualizations, and build machine learning models.',
    price: 94.99,
    instructor: 'Michael Chen',
    duration: '35 hours',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    students: 15678,
    rating: 4.7
  },
  {
    id: '4',
    title: 'UI/UX Design Masterclass',
    description: 'Create beautiful and user-friendly interfaces',
    fullDescription: 'Master the principles of UI/UX design. Learn user research, wireframing, prototyping, and visual design. Use Figma to create professional designs that users love.',
    price: 69.99,
    instructor: 'Emily Rodriguez',
    duration: '25 hours',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    students: 9234,
    rating: 4.8
  },
  {
    id: '5',
    title: 'Mobile App Development with React Native',
    description: 'Build iOS and Android apps with JavaScript',
    fullDescription: 'Create native mobile applications using React Native. Learn navigation, animations, native modules, and app deployment. Build cross-platform apps with a single codebase.',
    price: 84.99,
    instructor: 'David Park',
    duration: '38 hours',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    students: 7845,
    rating: 4.6
  },
  {
    id: '6',
    title: 'DevOps and Cloud Computing',
    description: 'Master AWS, Docker, Kubernetes, and CI/CD',
    fullDescription: 'Learn modern DevOps practices and cloud infrastructure. Master Docker containerization, Kubernetes orchestration, AWS services, CI/CD pipelines, and infrastructure as code.',
    price: 99.99,
    instructor: 'Alex Turner',
    duration: '45 hours',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    students: 11234,
    rating: 4.9
  }
];

// API Routes

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Course Platform API is running!' });
});

// Get all courses
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Get single course by ID
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Add new course
app.post('/api/courses', (req, res) => {
  const newCourse = {
    id: String(courses.length + 1),
    ...req.body,
    students: 0,
    rating: 0
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// Update course
app.put('/api/courses/:id', (req, res) => {
  const index = courses.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    courses[index] = { ...courses[index], ...req.body };
    res.json(courses[index]);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Delete course
app.delete('/api/courses/:id', (req, res) => {
  const index = courses.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    courses.splice(index, 1);
    res.json({ message: 'Course deleted successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📚 API available at http://localhost:${PORT}/api/courses`);
});