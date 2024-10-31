import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

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
  
  

// Middleware
// app.use(cors());
// app.use(express.json());

// // Rutas
// // import userRoutes from './src/routes/userRoutes';
// // import contactRoutes from './src/routes/contactRoutes';

// app.use('/api/users', userRoutes);
// app.use('/api/contacts', contactRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});