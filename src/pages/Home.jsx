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
    .insert([{task, is_complete: false}])
    .select();
    
    if(error){
      console.error('error:', error)
    }else{
      setTask('');
      setTodos((prevTodos) => [...prevTodos, ...data]);
    }
  }

  return(
    <div>
      <h1 className="text-6xl font-semibold mb-4">To Do Lists</h1>
      <ul>
        {todos.map((todo,index)=>(
          <li key={index} className="no-underline">
            {todo.task} - {todo.is_complete ? 'finished' : 'unfinished'}
          </li>
        ))}
      </ul>
      <input
      type = 'text'
      placeholder="Inset the task"
      value={task}
      onChange = {(e) => setTask(e.target.value)}
      className="border-2 border-yellow-300 py-3 mt-4"
      />
      <button onClick={addTask} className="py-3 px-3 mt-4 bg-amber-300 rounded-xl ml-3 text-white font-semibold hover:bg-yellow-600 "> Add the Tasks</button>

    </div>
  )
}