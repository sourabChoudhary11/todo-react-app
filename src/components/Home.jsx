import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext, ourServer } from "../index";
import { toast } from "react-hot-toast";
import TodoItem from "./TodoItem";

const Home = () => {

    const {isAuthenticated} = useContext(DataContext);
    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState([])

    const [form, setForm] = useState({
        title: "",
        description: ""
    })

    const { title, description } = form;

    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${ourServer}/tasks/new`, {
                title,
                description
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Method": "POST"
                },
                withCredentials: true
            })
            setForm({
                title: "",
                description: ""
            })
            toast.success(response.data.message)
            setLoading(false);

        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false);
        }
    }

    const checkedHandler = (id) => {
        axios.put(`${ourServer}/tasks/${id}`,{}, {
            headers:{
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Method": "PUT"
            },
            withCredentials: true
        }).then(res=>{
            toast.success(res.data.message)
        }).catch(err=>{
            toast.error(err.response.data.message);
        })
    }
    
    const deleteHandler = (id)=>{
        axios.delete(`${ourServer}/tasks/${id}`, {
            headers:{
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Method": "DELETE"
            },
            withCredentials: true
        }).then(res=>{
            toast.success(res.data.message)
        }).catch(err=>{
            toast.error(err.response.data.message);
        })
    }

    useEffect(() => {
        axios.get(`${ourServer}/tasks/all`, {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Method": "GET"
            },
            withCredentials: true
        }).then(res => {
            setTasks(res.data.tasks)
        }).catch(error => {
            console.log(error);
        })
    }, [tasks])

    return (
        <div>
            <main>
                <form onSubmit={submitHandler}>

                    <h2>Create your Task</h2>

                    <input type='text' value={title} onChange={changeHandler} name="title" placeholder='TITLE' required />

                    <input type='text' value={description} onChange={changeHandler} name='description' placeholder='DESCRIPTION' required />

                    <button type='submit' disabled={loading}>Create Task</button>

                </form>
        </main>
            <section className="todosContainer">
                {
                    isAuthenticated &&
                    tasks.map(i => (
                        <TodoItem key={i._id} id={i._id} title={i.title} description={i.description} isCompleted={i.isCompleted} checkedHandler={checkedHandler} deleteHandler={deleteHandler} />
                    ))
                }
            </section>
        </div>
    )
}

export default Home
