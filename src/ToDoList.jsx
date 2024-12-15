import { useState, useEffect} from "react";


function ToDoList(){

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("items");
        if (savedTasks === null) return [{ text: "Your first task here", completed: false }];
    
        return JSON.parse(savedTasks);
    });
     
    const [newTask, setNewTask] = useState("");
    
    useEffect(() =>{
        localStorage.setItem("items", JSON.stringify(tasks));
    }, [tasks]);

    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t, { text: newTask, completed: false}]);
            setNewTask("");
        }
    }
    function deleteTask(index){
        const updateTask = tasks.filter((_, i) => i !== index) ;
        setTasks(updateTask);
    }
    
    function handleInputChange(event){
        setNewTask(event.target.value)
    }
    function handleCheckboxChange(index){
            setTasks(() => 
                tasks.map((task, i) => 
                    i === index ? {...task, completed: !task.completed} : task 
                )
            );
    }

    return(
        <div className="container">
            <h2 className="title">To Do List</h2>
            <div className="newtask">
                <input type="text"
                       value={newTask}
                       onChange={handleInputChange} 
                       className="input-task"
                       placeholder="Add new task..."/>
                <button onClick={addTask}
                        className="add-btn">
                        Add 
                </button>

            </div>
            <div className="taskList">
                <div>
                <ul>
                {tasks.map((task, index) => (
                    <li key={index} className="listitem">
                        <input type="checkbox" onClick={() => handleCheckboxChange(index)} />
                        <label className="taskname"
                            style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                        {task.text}
                        </label>
                        <button className="delete-btn" onClick={() => deleteTask(index)}>
                        Delete
                        </button>
                    </li>
                    ))}

                </ul>
                </div>
            </div>

        </div>
    );
}

export default ToDoList