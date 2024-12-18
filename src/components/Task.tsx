import * as React from 'react';
import {ChangeEvent} from "react";
import { EditableSpan } from './EditableSpan';
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import {getListItemSx} from "./Todolist.styles";

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
        <ListItem key={taskId}
                  disableGutters
                  disablePadding
                  sx={getListItemSx(isDone)}
        >
            <div>
                <Checkbox checked={isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan title={title} onChange={(title)=>changeTaskTitleHandler(taskId, title)}/>
            </div>
            {/*<Button title={'X'} onClick={removeTaskHandler}/>*/}
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>

            {/*<button onClick={()=>removeTask(id)}>X</button>*/}
        </ListItem>

    )
}