// @flow
import * as React from 'react';
import {Button} from "./Button";

type TaskType = {
    id: string,
    title: string;
    isDone: boolean;
    removeTaskHandler: ()=>void
};

export const Task = ({id, title, isDone, removeTaskHandler}: TaskType) => {
    return (
        <li key={id}>
            <Button title={'X'} onClick={removeTaskHandler}/>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
            {/*<button onClick={()=>removeTask(id)}>X</button>*/}
        </li>

    )
}