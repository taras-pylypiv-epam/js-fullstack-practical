import express from 'express';
import cors from 'cors';
import quizRoutes from '@/routes/quizRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3001',
        methods: ['GET', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.use(express.json());
app.use('/quizzes', quizRoutes);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
