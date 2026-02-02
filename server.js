// server.js
// Import necessary modules
import express from 'express';
import { PrismaClient } from '../generated/prisma/client'

// Initialize Prisma Client
const prisma = new PrismaClient();

export { prisma };

// Initialize Express app
const app = express();
// Set the port
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express.json());

const users = [];

// GET /users endpoint
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// POST /users endpoint
app.post('/users', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
      }
    });
    res.status(201).json({ message: 'User created / Usuário criado com Sucesso', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});