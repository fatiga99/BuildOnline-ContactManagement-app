"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = __importDefault(require("mysql2/promise"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const customError_1 = require("./utils/customError");
const userRepository_1 = require("./repositories/userRepository");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
const userRepository = new userRepository_1.UserRepository();
//db connection pool
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.default = pool;
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
function createPreloadedUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = [
            { email: 'testuser1@example.com', password: 'password123' },
            { email: 'testuser2@example.com', password: 'password456' }
        ];
        for (const user of users) {
            const existingUser = yield userRepository.getUserByEmail(user.email);
            if (!existingUser) {
                yield userRepository.createUser(user.email, user.password);
            }
        }
    });
}
createPreloadedUsers();
//Custom Error
app.use((err, req, res, next) => {
    const status = err instanceof customError_1.CustomError ? err.status : 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
});
//Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express_1.default.json({ limit: '10mb' }));
//Routes
app.use('/api/login', authRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
app.use('/api/contacts', contactRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
