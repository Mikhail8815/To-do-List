
import {TodolistType} from "../../../../../../App/App";
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {changeTodolistTitleAC, removeTodolistAC} from "../../../../model/torolists-reducer";
import {useAppDispatch} from "../../../../../../App/hooks";
import styles from './TodolistTitle.module.css'

type PropsType = {
    todolist: TodolistType
}


export const TodolistTitle = ({todolist}: PropsType) => {

    const {id: todolistId, title} = todolist

    const dispatch = useAppDispatch()

    const removeTodolist = () => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const updateTitleTodolist = (title: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))
    }

    return (
        <div className={styles.container}>
            <h3><EditableSpan title={title} onChange={updateTitleTodolist}/></h3>
            <IconButton onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
            {/*<Button title={'x'} onClick={removeTodolistHandler}/>*/}
        </div>
    );
};
