import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {Button} from "./Button";
import {Task} from "./Task";
import {FilterValuesType, TaskType} from "../App";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type PropsType = {
    title: string,
    id: string
    tasks: TaskType[],
    removeTask: (taskId: string, todolistId: string) => void,
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void,
    filter: string,
    removeTodolist: (todolistId: string) => void,
}


export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter, id, removeTodolist}: PropsType) => {
    // const inputRef = useRef<HTMLInputElement>(null)

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const mappedTasks = tasks.map((task: TaskType) => {
        const removeTaskHandler = () => {
            removeTask(task.id, id)
        }
        return <Task
            id={id}
            taskId={task.id}
            title={task.title}
            isDone={task.isDone}
            removeTaskHandler={removeTaskHandler}
            changeTaskStatus={changeTaskStatus}/>
    })

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim(), id);
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.target.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, id)
    }
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    return (
        <div className="App">
            <div>
                <div className={'todolist-title-container'}>
                    <h3>{title}</h3>
                    <Button title={'x'} onClick={removeTodolistHandler}/>
                </div>
                <div>
                    <input value={taskTitle}
                           onChange={changeTaskTitleHandler}
                           onKeyUp={addTaskOnKeyUpHandler}
                           className={error ? 'error' : ''}/>
                    {error && <div className={'error-message'}>{error}</div>}
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
                    <Button className={filter === 'all' ? 'active-filter' : ''} title={"All"} onClick={() => changeFilterTasksHandler('all')}/>
                    <Button className={filter === 'active' ? 'active-filter' : ''} title={"Active"} onClick={() => changeFilterTasksHandler('active')}/>
                    <Button className={filter === 'completed' ? 'active-filter' : ''} title={"Completed"} onClick={() => changeFilterTasksHandler('completed')}/>
                </div>
            </div>
        </div>
    );
};
