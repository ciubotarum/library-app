import React, { useState } from 'react';
import './App.css';
// import TodoRowItem from './components/TodoRowItem';
import { TodoTable } from './components/TodoTable';
import { NewTodoForm } from './components/NewTodoForm';

export const App = () =>  {

  const [showAddTodoForm, setShowAddTodoForm] = useState(false);

  // const todos = [
  const [todos, setTodos] = useState([
    { rowNumber: 1, rowDescription: 'Feed puppy', rowAssigned: 'User One' },
    { rowNumber: 2, rowDescription: 'Water plants', rowAssigned: 'User Two' },
    { rowNumber: 3, rowDescription: 'Make dinner', rowAssigned: 'User One' },
    { rowNumber: 4, rowDescription: 'Change phone battery', rowAssigned: 'User One' }

  ]
  )

  const addTodo = (description: string, assigned: string) => {
    // console.log('Our addTodo btn has been clicked!');  // just print the message in the inspect console on browser
    let rowNumber = 0;
    if (todos.length > 0) {
      rowNumber = todos[todos.length - 1].rowNumber + 1;
    } else {
      rowNumber = 1;
    }
    const newTodo = {
      // rowNumber: todos.length + 1, 
      rowNumber: rowNumber,
      // rowDescription: 'New Todo',
      rowDescription: description,
      // rowAssigned: 'User Three'
      rowAssigned: assigned
    };
    // todos.push(newTodo);
    setTodos(todos => [...todos, newTodo])
    // console.log(todos);

  }

  const deleteTodo = (deleteTodoRowNumber: number) => {
    let filtered = todos.filter(function (value) {
      return value.rowNumber !== deleteTodoRowNumber;
    });
    setTodos(filtered);
  }

  return (
    <div className='mt-5 cointainer'>
      <div className="card">
        <div className="card-header">
          Your Todo's
        </div>
        <div className="card-body">

          {/* <table className="table table-hover">
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Description</th>
                <th scope='col'>Assigned</th>
              </tr>
            </thead>
            <tbody> 
              <TodoRowItem 
              rowNumber={todos[0].rowNumber} 
              rowDescription={todos[0].rowDescription} 
              rowAssigned={todos[0].rowAssigned}
              />
              <TodoRowItem 
              rowNumber={todos[1].rowNumber} 
              rowDescription={todos[1].rowDescription} 
              rowAssigned={todos[1].rowAssigned}
              />
              <TodoRowItem 
              rowNumber={todos[2].rowNumber} 
              rowDescription={todos[2].rowDescription} 
              rowAssigned={todos[2].rowAssigned}
              />
            </tbody>
          </table> */}
          {/* <TodoTable todos={todos}/> */}
          <TodoTable todos={todos} deleteTodo={deleteTodo} />
          {/* <button className='btn btn-primary' onClick={addTodo} > */}
          {/* <button className='btn btn-primary'> */}
          {/* <button className='btn btn-primary' onClick={() => {console.log('test')}} >  anonimous  function call */}
          {/* Add new todo */}
          <button onClick={() => setShowAddTodoForm(!showAddTodoForm)} className='btn btn-primary'>
            {/* New Todo */}
            {showAddTodoForm ? 'Close New Todo' : 'New Todo'}
          </button>
          {/* <NewTodoForm/> */}
          {showAddTodoForm &&
            <NewTodoForm addTodo={addTodo} />
          }

        </div>
      </div>
    </div>
  );
}

// export default App;
