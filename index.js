
import 'dotenv/config';
import express from 'express';
import connectDB from './backend/src/config/db.js';
import urlRoutes from './backend/src/routes/urlRoutes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', urlRoutes);

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
