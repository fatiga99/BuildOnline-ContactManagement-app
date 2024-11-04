import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

import userRoutes from './routes/contactRoutes';
import contactRoutes from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import { CustomError } from './utils/customError';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5001;

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
  
//Custom Error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = err instanceof CustomError ? err.status : 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/login', authRouter);
app.use('/api/user', userRoutes);
app.use('/api/contacts', contactRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});