import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';  // Import the Calendar component
import { Box, VStack, HStack, Input, Button, Text, Checkbox, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div className="profile">
          <img src="path_to_profile_image" alt="Profile" className="profile-img" />
          <h1>Hello, Jane</h1>
        </div>
      </header>

      <section className="course-page">
        <h2>Courses</h2>
        <div className="courses">
          <div className="course-item" style={{ backgroundColor: '#ccff00' }}>
            <h3>Course1</h3>
            <p>Course Code</p>
            <p>⭐ 4.7 | 147 Hours | 10k People</p>
          </div>
          <div className="course-item" style={{ backgroundColor: '#ffcc99' }}>
            <h3>SMM & Marketing</h3>
            <p>400$</p>
            <p>⭐ 4.3 | 125 Hours | 7k People</p>
          </div>
        </div>
      </section>

      <section className="deadlines-section">
        <h2>Upcoming Deadlines</h2>
        <div className="deadlines">
          <Calendar />
        </div>
      </section>

      <section className="todo-section">
        <h2>To do</h2>
        <div className="todo">
          <div className="todo-card" style={{ backgroundColor: '#ffcc99', padding: '20px' }}>
            <Box>
              <HStack mb={4}>
                <Input 
                  value={newTodo} 
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new task"
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                />
                <Button onClick={addTodo} colorScheme="teal">Add</Button>
              </HStack>
              <VStack align="stretch" spacing={4}>
                {todos.map(todo => (
                  <HStack key={todo.id} p={2} bg="white" borderRadius="md" alignItems="center">
                    {/* Checkbox on the left */}
                    <Checkbox 
                      isChecked={todo.completed} 
                      onChange={() => toggleTodo(todo.id)}
                      size="lg"
                    />
                    {/* Task text */}
                    <Text
                      flex={1}
                      textDecoration={todo.completed ? 'line-through' : 'none'}
                      color={todo.completed ? 'gray.500' : 'black'}
                    >
                      {todo.text}
                    </Text>
                    {/* Delete button */}
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => deleteTodo(todo.id)}
                      aria-label="Delete todo"
                      size="sm"
                    />
                  </HStack>
                ))}
              </VStack>
              {/* Completed tasks count */}
              <Text mt={4} color="gray.600">
                {todos.filter(todo => todo.completed).length} of {todos.length} tasks completed
              </Text>
            </Box>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-menu">
          <button>Home</button>
          <button>Calendar</button>
          <button>Courses</button>
          <button>Account</button>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;