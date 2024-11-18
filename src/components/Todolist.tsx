import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {Button} from "./Button";
import {Task} from "./Task";
import {FilterValuesType, TaskType} from "../App";

type PropsType = {
    title: string,
    tasks: TaskType[],
    date?: string,
    removeTask: (taskId: string) => void,
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void,
}


export const Todolist = ({title, tasks, date, removeTask, changeFilter, addTask}: PropsType) => {
    // const inputRef = useRef<HTMLInputElement>(null)

    const [taskTitle, setTaskTitle] = useState('')

    const mappedTasks = tasks.map((task: TaskType) => {
        const removeTaskHandler = () => {
            removeTask(task.id)
        }
        return <Task id={task.id} title={task.title} isDone={task.isDone} removeTaskHandler={removeTaskHandler}/>
    })

    const addTaskHandler = () => {
        addTask(taskTitle);
        setTaskTitle('')
    }

    const changeTaskTitleHandler =(event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.target.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }

    return (
        <div className="App">
            <div>
                <h3>{title}</h3>
                <div>
                    <input value={taskTitle}
                           onChange={changeTaskTitleHandler}
                           onKeyUp={addTaskOnKeyUpHandler}/>
                    <Button onClick={addTaskHandler} title={'+'}/>
                </div>
                {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul>
                        {mappedTasks}
                    </ul>
                )}
                <div>
                    <Button title={"All"} onClick={() => changeFilterTasksHandler('all')}/>
                    <Button title={"Active"} onClick={() => changeFilterTasksHandler('active')}/>
                    <Button title={"Completed"} onClick={() => changeFilterTasksHandler('completed')}/>
                </div>
                <div>
                    {date}
                </div>
            </div>
        </div>
    );
};
