import './App.css';
// import TodoRowItem from './components/TodoRowItem';
import TodoTable from './components/TodoTable';

function App() {

  const todos = [
    {rowNumber: 1, rowDescription: 'Feed puppy', rowAssigned: 'User One'},
    {rowNumber: 2, rowDescription: 'Water plants', rowAssigned: 'User Two'},
    {rowNumber: 3, rowDescription: 'Make dinner', rowAssigned: 'User One'},
    {rowNumber: 4, rowDescription: 'Change phone battery', rowAssigned: 'User One'}
    
  ]

  const addTodo = () => {
    // console.log('Our addTodo btn has been clicked!');  // just print the message in the inspect console on browser
    if (todos.length > 0) {
      const newTodo = {
        rowNumber: todos.length + 1, 
        rowDescription: 'New Todo',
        rowAssigned: 'User Three'
      };
    todos.push(newTodo);
    console.log(todos);
    }
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
          <TodoTable todos={todos}/>
          <button className='btn btn-primary' onClick={addTodo} >
          {/* <button className='btn btn-primary' onClick={() => {console.log('test')}} >  anonimous  function call */}
            Add new todo
          </button>
        </div>
       </div>
    </div>
  );
}

export default App;
