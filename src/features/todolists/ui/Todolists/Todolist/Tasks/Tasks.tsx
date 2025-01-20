import {List} from "@mui/material";
import React from "react";
import {TaskType, TodolistType} from "../../../../../../App/App";
import {Task} from "./Task/Task";
import {useAppSelector} from "../../../../../../App/hooks";
import {selectTasks} from "../../../../model/tasks-selectors";


type PropsType = {
  todolist: TodolistType
};

export const Tasks = ({todolist}: PropsType) => {

    const {id: todolistId, filter} = todolist
    const tasks = useAppSelector(selectTasks) // Таски

    let tasksForTodoList = tasks[todolistId];

    if (filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter((task: TaskType) => task.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter((task: TaskType) => task.isDone === true)
    }

    const mappedTasks = tasksForTodoList.map((task: TaskType) => {
        return <Task
            key={task.id}
            todolist={todolist}
            task={task}
        />
    })

    return (
        <>
            {tasksForTodoList.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {mappedTasks}
                </List>
            )}
        </>
    )
}