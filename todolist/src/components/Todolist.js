import React,{useState,useEffect} from 'react'
import  './styletodo.css'
import Axios from "axios";

export default function Todolist() {
  const [value,setvalue]=useState('')
  const [items,setItems]=useState([])


useEffect(()=>{
  Axios.get("http://localhost:8080/todo").then((response)=>{
    setItems(response.data);
  }).catch((error)=>{
    console.log(error);
  })
},[items]);

  const additems=(e)=>{
    e.preventDefault()
    if(value.trim()=== ''){
      alert("Enter a valid todo")
      return
    }
    Axios.post("http://localhost:8080/todo",{todo:value.trim()}).then((response)=>{
      // setItems([...items,value.trim()])
      const { insertId } = response.data; // Extract 'insertId' from the response
      const newTodo = { id: insertId, todo: value.trim() }; // Construct the new todo
      setItems([...items, newTodo]);
    })
    // setItems([...items,value.trim()])
      setvalue('')
  }
  const removeitem=(id)=>{
    Axios.delete(`http://localhost:8080/todo/${id}`);
      console.log("deleted");

      setItems(items.filter(item => item._id !== id));

  }
  return (
    <div>
      <h1>TODOLIST</h1>
    <div className='box'>
      <h4>ADD YOUR TODO</h4>
        <input type="text" value={value} onChange={e=> setvalue(e.target.value)}></input>
        <button onClick={additems}>ADD</button>
        <ol>
          {items.map((item,index) =>(
            <li key={index}>{item.todo}
            <button onClick={()=>removeitem(item.id)}>Del</button>
            </li>
          ))}
        </ol>
    </div>
    </div>
  )
}
