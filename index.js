import express from 'express';
import connectDB from './backend/src/config/db.js';
import urlRoutes from './backend/src/routes/urlRoutes.js';
connectDB();
const app = express();
app.use(express.json())
app.use("/",urlRoutes);


app.listen(4000,()=>{
    console.log("Server is running on port 4000");
    
});