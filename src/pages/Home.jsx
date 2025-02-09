import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";


export default function Home(){
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(()=>{
    const fetchTodos = async ()=>{
      const {data, error} = await supabase
      .from('todos')
      .select('*');

      if(error){
        console.error('error', error)
      }else{
        setTodos(data);
      }
    };
    fetchTodos();
  },[]);

  const addTask = async () =>{
    if (!task.trim()) {
      console.error("You have to inset the task");
      return;
    }

    const {data, error} = await supabase
    .from('todos')
    .insert([{task, is_complete: false}]);
    
    if(error){
      console.error('error:', error)
    }else{
      setTask('');
      setTodos((prevTodos) => [...prevTodos, ...data]);
    }
  }

  return(
    <div>
      <h1>To Do Lists</h1>
      <ul>
        {todos.map((todo,index)=>(
          <li key={index}>
            {todo.task} - {todo.is_complete ? 'finished' : 'unfinished'}
          </li>
        ))}
      </ul>
      <input
      type = 'text'
      placeholder="Inset the task"
      value={task}
      onChange = {(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}> Add the Tasks</button>

    </div>
  )
}