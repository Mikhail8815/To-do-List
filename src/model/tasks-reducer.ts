import {v1} from "uuid";
import {FilterValuesType, TasksStateType, TaskType, TodolistType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./torolists-reducer";

//State

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]
}

//Types

export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

export type ActionsType =
    | AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType | UpdateTaskActionType | AddTodolistActionType | RemoveTodolistActionType

//Action Creators


export const addTaskAC = (payload: {title: string, todolistId: string})=> {
    return {
        type: 'ADD-TASK',
        payload: payload
    } as const
}
export const removeTaskAC = (payload: {taskId: string, todolistId: string})=> {
    return {
        type: 'REMOVE-TASK',
        payload: payload
    } as const
}
export const changeTaskStatusAC = (payload: {taskId: string, isDone: boolean, todolistId: string})=> {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: payload
    } as const
}
export const updateTaskAC = (payload: {taskId: string, title: string, todolistId: string})=> {
    return {
        type: 'UPDATE-TASK',
        payload: payload
    } as const
}

//Reducer

export const tasksReducer = (tasks: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const {title, todolistId} = action.payload
            const newTask: TaskType = {id: v1(), title: title, isDone: false};
            return {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        }
        case 'REMOVE-TASK': {
            const {taskId, todolistId} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        }
        case 'CHANGE-TASK-STATUS': {
            const {taskId, isDone, todolistId} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)}
        }
        case 'UPDATE-TASK': {
            const {taskId, title, todolistId} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)}
        }
        case "ADD-TODOLIST": {
            return {...tasks, [action.payload.id]: []}
        }
        case "REMOVE-TODOLIST": {
            delete tasks[action.payload.id]
            return {...tasks}
        }
        default:
            return tasks
    }
}