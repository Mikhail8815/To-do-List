// @flow
import * as React from 'react';
import {Button} from "./Button";
import {ChangeEvent} from "react";
import { EditableSpan } from './EditableSpan';

type TaskType = {
    id: string
    taskId: string,
    title: string;
    isDone: boolean;
    removeTaskHandler: ()=>void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void,
    changeTaskTitleHandler: (taskId: string, title: string) => void
};

export const Task = ({taskId, title, isDone, removeTaskHandler, changeTaskStatus, changeTaskTitleHandler, id}: TaskType) => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(taskId, newStatusValue, id)
    }
    return (
        <li key={taskId} className={isDone ? "is-done" : ""}>
            <EditableSpan title={title} onChange={(title)=>changeTaskTitleHandler(taskId, title)}/>
            <Button title={'X'} onClick={removeTaskHandler}/>
            <input type="checkbox" checked={isDone} onChange={changeTaskStatusHandler}/>
            {/*<button onClick={()=>removeTask(id)}>X</button>*/}
        </li>

    )
}