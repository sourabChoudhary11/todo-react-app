import "../styles/todoItem.css"

const TodoItem = ({ id, isCompleted, title, description, checkedHandler, deleteHandler }) => {
    return <div className="todoItem">
        <div className="viewingSection">
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
        <div className="updationSection">
            <input type="checkbox" checked={isCompleted}  onChange={() => { checkedHandler(id) }} />
            <button className="btn" onClick={()=>{deleteHandler(id)}}>Delete</button>
        </div>
    </div>
};
export default TodoItem