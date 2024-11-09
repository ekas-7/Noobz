import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/db.js';

//app config
const app = express();
const port = process.env.PORT || 3000
connectDB();


//middlewares
app.use(express.json())
app.use(cors())

//Server health 
app.get('/',(req,res) => {
    res.send("API WORKING")
})

// Listener 
app.listen(port,() => {
    console.log(`server stated on http://localhost:${port}`);
    
})