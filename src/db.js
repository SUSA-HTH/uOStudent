import Dexie from 'dexie';

// Create a new instance of Dexie for the database
const db = new Dexie('UserDatabase');

// Define the schema
db.version(1).stores({
  users: '++id, fullname, email, password', // Auto-incremented ID, fullname, email, and encoded password
  todo_list: '++id, title, duration, time, date, userId', // To-do list with relation to user (userId)
  courses: '++id, userId, title, deliverables, exams, grades' // Courses with userId as relation
});

// Example data structures:
// Deliverables: [{ title: 'Assignment 1', dueDate: '2024-09-20', weight: 10 }]
// Exams: [{ title: 'Midterm', date: '2024-09-22', weight: 20 }]
// Grades: [{ deliverable: 'Assignment 1', marks: 90 }]

export default db;
