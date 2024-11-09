import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

import contactRoutes from './routes/contactRoutes';
import userRoutes from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import { CustomError } from './utils/customError';
import { UserRepository } from './repositories/userRepository';


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5001;

const userRepository = new UserRepository();

//db connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  export default pool;

  // app.get('/api/test-db', async (req, res) => {
  //   try {
  //     const [rows] = await pool.query<RowDataPacket[]>('SELECT 1 + 1 AS solution');
  //     res.json({ message: 'Database connection successful', solution: rows[0].solution });
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       res.status(500).json({ error: 'Database connection failed', details: error.message });
  //     } else {
  //       res.status(500).json({ error: 'Unknown error occurred' });
  //     }
  //   }
  // });

  async function createPreloadedUsers() {
    const users = [
        { email: 'testuser1@example.com', password: 'password123' },
        { email: 'testuser2@example.com', password: 'password456' }
    ];

    for (const user of users) {
        const existingUser = await userRepository.getUserByEmail(user.email);
        if (!existingUser) {
            await userRepository.createUser(user.email, user.password);
        }
    }
}

createPreloadedUsers();
  
//Custom Error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = err instanceof CustomError ? err.status : 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

//Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

//Routes
app.use('/api/login', authRouter);
app.use('/api/user', userRoutes);
app.use('/api/contacts', contactRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});