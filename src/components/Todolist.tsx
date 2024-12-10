import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {Button} from "./Button";
import {Task} from "./Task";
import {FilterValuesType, TaskType} from "../App";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {AddItemForm} from "./AddItemForm";
import { EditableSpan } from './EditableSpan';

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
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTitleTodolist: (todolistId: string, title: string) => void
}


export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter, id, removeTodolist, updateTask, updateTitleTodolist}: PropsType) => {
    // const inputRef = useRef<HTMLInputElement>(null)

    // const [taskTitle, setTaskTitle] = useState('')
    // const [error, setError] = useState<string | null>(null)

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, id)
    }
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    const addTaskHandler = (title: string) => {
        addTask(title, id)
    }

    const updateTitleHandler = (title: string) => {
        updateTitleTodolist(id, title)
    }
    const changeTaskTitleHandler = (taskId: string, title: string) => {
        updateTask(id, taskId, title)
    }

    const mappedTasks = tasks.map((task: TaskType) => {
        const removeTaskHandler = () => {
            removeTask(task.id, id)
        }
        //     const changeTaskTitleHandler = (title: string) => {
        //         updateTask(id, task.id, title)
        // }
        return <Task
            id={id}
            taskId={task.id}
            title={task.title}
            isDone={task.isDone}
            removeTaskHandler={removeTaskHandler}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitleHandler={changeTaskTitleHandler}/>
    })

    return (
        <div className="App">
            <div>
                <div className={'todolist-title-container'}>
                     <h3><EditableSpan title={title} onChange={updateTitleHandler}/></h3>
                    <Button title={'x'} onClick={removeTodolistHandler}/>
                </div>
                <div>
                    <AddItemForm addItem={addTaskHandler}/>
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
