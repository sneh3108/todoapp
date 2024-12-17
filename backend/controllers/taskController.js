 const Task =  require('../models/Task');


const  createTask =  async (req, res) => {
  try {

     const { title,  description } = req.body;

     const task = new Task({ title,  description, user: req.userId });
      await task.save();

     res.status(201).json(task);
  } 
  
  catch (err) {
     res.status(500).json({  message: 'Error creating task'  });
  }


};


const getTasks = async (req, res) => {

  try {

     const tasks =  await Task.find({ user: req.userId });
     res.status(200).json(tasks);
  } 

  catch (err) {
      res.status(500).json({ message:  'Error fetching tasks' });
  }

};




 const  updateTask =  async (req, res) => {

  try {

     const { id } =  req.params;
      const { title,  description, completed } = req.body;



    const task = await Task.findOneAndUpdate(

       { _id: id, user: req.userId },
       { title, description, completed },
      { new: true }

    );


    if (!task) {
       return res.status(404).json({ message:  'Task not found' });
    }

     res.status(200).json(task);
  } 
  
  catch (err) {
     res.status(500).json({ message:  'Error updating task' });
  }

};


 const deleteTask =  async (req, res) => {
  try {

     const { id } = req.params;

    const task =  await Task.findOneAndDelete({ _id: id, user: req.userId });

    
    if (!task) {
       return res.status(404).json({ message:  'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  }
  
  catch (err) {
     res.status(500).json({ message: 'Error deleting task' });
  }

};



module.exports = {  createTask, getTasks, updateTask, deleteTask };
