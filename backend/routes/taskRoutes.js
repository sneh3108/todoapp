const express = require('express');

 const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');


const authMiddleware = require('../middleware/auth');


const router = express.Router();

router.use(authMiddleware); 


router.post('/', createTask);       
router.get('/', getTasks);          
router.put('/:id', updateTask);     
router.delete('/:id', deleteTask);  

module.exports = router;
