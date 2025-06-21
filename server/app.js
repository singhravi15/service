const express=require('express');
const orderRoutes = require("./routes/orderRoutes");
const app=express();
const cors=require('cors');
app.use(cors());
const connectDB=require('./db/db.js')
connectDB();
app.get('/',(req,res)=>{
    res.send('Hello world');
})
app.use(express.json());
app.use('/api/service', require('./routes/serviceRoutes.js'));
app.use("/api/service", orderRoutes);
module.exports=app;