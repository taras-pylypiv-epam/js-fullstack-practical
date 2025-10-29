import express from 'express';
import quizRoutes from '@/routes/quizRoutes.js';

const app = express();
const port = '3000';

app.use('/quizzes', quizRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
