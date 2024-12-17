const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');



const dotenv = require('dotenv');


const authRoutes = require('./routes/authRoutes');



const taskRoutes = require('./routes/taskRoutes'); 


dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000;



app.use(cors({ origin: 'http://localhost:3000', credentials: true })); 

app.use(express.json()); 



mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }

  )
  .then(() => console.log(' connected MongoDB'))
  .catch((err) => console.error('MongoDB giving connection error:',  err));


app.use('/api/auth', authRoutes);

app.use('/api/tasks',taskRoutes);


app.get('/', (req, res) => {
  res.send('Task Manager API  running');
});


app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);
  
});
