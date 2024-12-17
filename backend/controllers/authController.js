 const bcrypt = require('bcryptjs');

 const jwt =  require('jsonwebtoken');

 const  authMiddleware =  require('../middleware/auth.js');  
 const User =  require('../models/User'); 



 const registerUser = async (req, res) => {

  try {

     console.log("Request Body:",  req.body); 
     const { email, password,  confirmPassword } =  req.body;



     if (!email || !password || !confirmPassword) {

       return res.status(400).json({ error: 'All fields are required' });

    }

     if (password !== confirmPassword) {
       return res.status(400).json({ error:  'Passwords mismatch' });
    }

    const userExist =  await User.findOne({ email });

    if (userExist) {

       return res.status(400).json({ error:   'User already exists' });
    }

     const hashedPassword = await bcrypt.hash(password,  10);

     const  newUser =  new User({  email, password:  hashedPassword }); 


    await newUser.save();

    const  token = jwt.sign({ userId: newUser._id }, 
        process.env.JWT_SECRET, { expiresIn: '1h' });

     res.status(201).json({ token });

  } 
  
  catch (err) {
     console.error(err);
     res.status(500).json({ error:  'Internal server error' });
  }

};



const  loginUser = async (req, res) => {
  try {

     const  { email, password }  =  req.body;
     const  user  =  await  User.findOne({ email });
    

    if (!user) {
      return res.status(400).json({ error:  'User not found' });
    }

    const isMatch =  await bcrypt.compare(password,  user.password);

    if (!isMatch) {

      return res.status(400).json({ error: 'Invalid credentials' });

    }

     const token = jwt.sign({ userId: user._id },
         process.env.JWT_SECRET, { expiresIn: '1h' });

     res.status(200).json({ token });

  } 
  
   catch (err) {
     console.error(err);
     res.status(500).json({ error:  'Internal server error' }); 
  }
};

 module.exports = { registerUser, loginUser };
