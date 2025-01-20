import * as React from 'react';
import {ChangeEvent} from "react";
import { EditableSpan } from '../../../../../../../common/components/EditableSpan/EditableSpan';
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import {changeTaskStatusAC, removeTaskAC, updateTaskAC} from "../../../../../model/tasks-reducer";
import {useAppDispatch, useAppSelector} from "../../../../../../../App/hooks";
import {TaskType, TodolistType} from "../../../../../../../App/App";
import {getListItemSx} from "./Task.style";

;

type PropsType = {
   todolist: TodolistType,
    task: TaskType
};

export const Task = ({todolist, task}: PropsType) => {
    const {id} = todolist

    const dispatch = useAppDispatch()

    const removeTask = () => {
        dispatch(removeTaskAC({taskId: task.id, todolistId: id}))
    }

    const updateTask = (title: string) => {
        dispatch(updateTaskAC({taskId: task.id, todolistId: id, title}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({taskId: task.id, isDone: newStatusValue, todolistId: id}))
    }

    return (
        <ListItem
                  disableGutters
                  disablePadding
                  sx={getListItemSx(task.isDone)}
        >
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan title={task.title} onChange={updateTask}/>
            </div>
            {/*<Button title={'X'} onClick={removeTaskHandler}/>*/}
            <IconButton onClick={removeTask}>
                <DeleteIcon />
            </IconButton>

            {/*<button onClick={()=>removeTask(id)}>X</button>*/}
        </ListItem>

    )
}