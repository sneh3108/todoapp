import React,  {  useState,  useEffect  }  from  "react";
import axios from "axios";



function  TodoList ({  onLogout }) 
 {
   const  [ tasks,  setTasks]  =  useState([]);

   const  [newTask,  setNewTask]  =  useState ({  title: "",  description: "" });

   const  [editingTask, setEditingTask]  =  useState(null);

  const  fetchTasks = async () => {

    const  token = localStorage.getItem("token");
    try {

      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: { "x-auth-token": token },

      });

      setTasks(response.data);

    } 

    catch (error) {
       console.error("Error fetching tasks:", error);
     }

  };

    const addTask = async  () =>  {
    const  token =  localStorage.getItem("token");

    try {

       const response = await axios.post(
        "http://localhost:5000/api/tasks",
         newTask,
        {  headers:  {  "x-auth-token": token  } }

      );

       setTasks([ ...tasks,  response.data]);

       setNewTask({ title: "",  description: "" });

    } 
    catch (error) {
       console.error("Error adding task:", error);
    }
  };



  const updateTask = async (id,  updatedFields) => {
     const token = localStorage.getItem("token");


    try 
    {

       const response =  await axios.put(
        `http://localhost:5000/api/tasks/${id}`, updatedFields,

        { headers: { "x-auth-token": token } }
      );

      setTasks(tasks.map((task) => (task._id === id ? response.data : task))
    );


      setEditingTask(null);
    }
    
    catch (error) {
       console.error("Error updating task:", error);
    }

  };


   const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    try {

      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { "x-auth-token": token },
      }
    );

       setTasks(tasks.filter((task) => task._id !== id));

    } 

    catch (error) {
      console.error("Error deleting task:", error);
    }

  };

   const toggleCompletion = (task) => {
    updateTask(task._id, { completed: !task.completed });
  };

  useEffect(() => {

    fetchTasks();
  }, []
);

  return (

     <div className="todo-container">
      <button onClick={onLogout}>
        Logout
        </button>


      <h1>
        To-Do List
        </h1>

      <div>


        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}

        />


        <textarea
           placeholder="Description"
           value={newTask.description}
           onChange={(e) =>
           setNewTask({ ...newTask, description: e.target.value })
          }

        />

        <button onClick={addTask}>
            Add Task
            </button>

      </div>

      <ul>

        {tasks.map((task) =>  (

          <li key={task._id}>

            {editingTask === task._id ? (

              <div>
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) =>

                    setTasks(
                      tasks.map((t) =>
                        t._id === task._id
                          ? { ...t, title: e.target.value }
                          : t
                      )
                    )
                  }
                />


                <textarea

                  value={task.description}

                  onChange={(e) =>
                    setTasks(
                      tasks.map((t) =>
                        t._id === task._id
                          ? { ...t, description: e.target.value }
                          : t
                      )
                    )
                  }
                />

                <button
                  onClick={() =>
                    updateTask(task._id, {
                      title: task.title,
                      description: task.description,
                    }
                )
                  }
                >
                  Save
                </button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </div>
            ) 
            : 
            (
              <div>
                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <button onClick={() => setEditingTask(task._id)}>Edit</button>

                <button onClick={() => deleteTask(task._id)}>Delete</button>

                <button
                onClick={() => toggleCompletion(task)}
             className={`complete-btn ${task.completed ? 'complete' : ''}`}
                  >

            {task.completed ? "Mark as Incomplete" : "Mark as Complete"}

             </button>
              </div>
            )
            }

          </li>

        )
        )}

      </ul>

    </div>

  );
}


export default TodoList;
