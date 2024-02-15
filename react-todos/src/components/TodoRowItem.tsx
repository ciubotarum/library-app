import React from "react"

export const TodoRowItem: React.FC<{
    rowNumber: number, 
    rowDescription: string, 
    rowAssigned: string, 
    deleteTodo: Function
}> = (props) => {
// non dinamic data (canoot change)
    // const rowNumber = 1;
    // const rowDescription = 'Feed dog';
    // const rowAssigned = 'Eric';
    
    return(
        <tr onClick={() => props.deleteTodo(props.rowNumber)}>
            {/* <th scope='row'>{rowNumber}</th>
            <td>{rowDescription}</td>
            <td>{rowAssigned}</td> */}
            <th scope='row'>{props.rowNumber}</th>
            <td>{props.rowDescription}</td>
            <td>{props.rowAssigned}</td>
        </tr>
    )

}

// export default TodoRowItem