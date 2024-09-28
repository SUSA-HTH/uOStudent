import db from './db';
import bcrypt from 'bcryptjs'; // You need to install this with npm install bcryptjs for password hashing

// Helper to create a new user
export const addUser = async (fullname, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  return db.users.add({
    fullname,
    email,
    password: hashedPassword
  });
};

// Helper to check user credentials for login
export const loginUser = async (email, password) => {
  const user = await db.users.get({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  } else {
    throw new Error('Invalid email or password');
  }
};

// Add a to-do item for a specific user
export const addToDo = async (title, duration, time, date, userId) => {
  return db.todo_list.add({
    title,
    duration,
    time,
    date,
    userId
  });
};

// Fetch all to-do items for a user
export const getToDoList = async (userId) => {
  return db.todo_list.where('userId').equals(userId).toArray();
};

// Add a course for a user
export const addCourse = async (userId, title, deliverables, exams, grades) => {
  return db.courses.add({
    userId,
    title,
    deliverables, // Array of deliverables [{ title, dueDate, weight }]
    exams,        // Array of exams [{ title, weight, date }]
    grades        // Array of grades [{ deliverable, marks }]
  });
};

// Fetch all courses for a user
export const getCourses = async (userId) => {
  return db.courses.where('userId').equals(userId).toArray();
};

// Update user info (for updating profile)
export const updateUser = async (userId, updatedInfo) => {
  return db.users.update(userId, updatedInfo);
};
