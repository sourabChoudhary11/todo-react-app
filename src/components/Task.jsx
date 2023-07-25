import React from 'react'
import { apiUrl } from '../index';
import { useState } from 'react';
import { useEffect } from 'react';

const Task = () => {

    const [task, setTasks] = useState([]);

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
        try {
            await fetch(`${apiUrl}/tasks/new`, {
                headers: { 'Content-Type': 'application/json' },
                method: "post",
                body: {
                    "title": title,
                    "description": description
                },
                withCredentials: true
            })
            getTasks();
        } catch (error) {
            console.log(error)
        }
    }

    async function getTasks() {
        const fetchingData = await fetch(`${apiUrl}/tasks/all`)
        const fetchedData = await fetchingData.json();
        setTasks(fetchedData)
    }

    const updateTask = async (id)=>{
        try {
            await fetch( `${apiUrl}/tasks/${id}`,{
                method:'put',
                withCredentials:true
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <>
            <form onSubmit={submitHandler}>
                <h2>Create Your Task</h2>
                <input type="text" value={title} onChange={changeHandler} name='title' placeholder='TASK TITLE' required />
                <input type="text" value={description} onChange={changeHandler} name='title' placeholder='TASK DESCRIPTION' required />
                <button type='submit'>Create Task</button>
            </form>
            <div>
                {
                    task.map(i => (
                        <div key={i.id}>
                            <h4>{i.title}</h4>
                            <p>{i.description}</p>
                            <input type="checkbox" name="isCompleted" />
                            <button onClick={()=>{
                                updateTask(i.id);
                            }}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Task
