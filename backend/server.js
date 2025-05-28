const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const parentRoutes = require('./Routes/parentAuth.js');
app.use('/api/parents', parentRoutes);

app.get('/',(req,res)=>{
  res.send('Welcome to Minds that Matter Backend ~inspired by felix')
});

// Connect to MongoDB WITHOUT deprecated options
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    
    // Use process.env.PORT or fallback to 5000
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));

