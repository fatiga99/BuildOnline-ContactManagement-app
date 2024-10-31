import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

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