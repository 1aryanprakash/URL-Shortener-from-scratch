import express from 'express';
import connectDB from './backend/src/config/db.js';
import urlRoutes from './backend/src/routes/urlRoutes.js';
import cors from 'cors';

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/",urlRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});