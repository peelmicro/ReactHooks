import React, { useState, useEffect, useContext } from 'react';
import TodosContext from '../context';
import axios from 'axios';
import uuidv4 from 'uuid/v4';

export default function TodoForm() {

  const [todo, setTodo] = useState("");
  const { state, dispatch } = useContext(TodosContext);

  useEffect(() => {
    if (state.currentTodo.text) {
      setTodo(state.currentTodo.text);
    } else {
      setTodo("");
    }
  }, [state.currentTodo.id])

  const handleSubmit = async event => {
    event.preventDefault();
    if (!todo) {
      return;
    }
    if (state.todos.findIndex(t => t.text === todo) > -1) {
      return;
    }    
    if (state.currentTodo.text) {
      const response = await axios.patch(`https://todos-api-juwmymcrdh.now.sh/todos/${state.currentTodo.id}`, {
        text: todo
      });
      dispatch({ type: "UPDATE_TODO", payload: response.data});
    } else {
      const response = await axios.post('https://todos-api-juwmymcrdh.now.sh/todos', {
        id: uuidv4(),
        text: todo,
        complete: false
      });
      dispatch({ type: "ADD_TODO", payload: response.data});
    }
    setTodo("");
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex justify-center p-5"
    >
      <input 
        type="text"
        className="border-black border-solid border-2"
        onChange={event => setTodo(event.target.value)}
        value={todo}
      />

    </form>
  )
}