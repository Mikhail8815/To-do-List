import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Container, createTheme, Grid2, IconButton, Paper, ThemeProvider, Toolbar} from "@mui/material";
import {MenuButton} from "./components/MenuButton";
import MenuIcon from '@mui/icons-material/Menu'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/torolists-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskAC} from "./model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, store} from "./State/store";

type ThemeMode = 'dark' | 'light'

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TodolistType = {
    title: string,
    filter: FilterValuesType,
    id: string
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    //Функции для тудулиста
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }

    const addTodolist = (title: string) => {
        // const newTodolistId = v1()
        // const newTodolist: TodolistType = {
        //     id: newTodolistId,
        //     title: title,
        //     filter: 'all'
        // }
        const action = addTodolistAC(title)
        dispatch(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const updateTitleTodolist = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }


    //Функции для тасок
    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({taskId: taskId, todolistId: todolistId}))
    }

    const addTask = (title: string, todolistId: string) => {
       dispatch(addTaskAC({title: title, todolistId: todolistId}))
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, isDone: taskStatus, todolistId}))
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskAC({taskId, todolistId, title}))
    }



    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#1E90FF',
            },
        },})

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }


    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" sx={{ mb: '30px' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <MenuButton>Login</MenuButton>
                            <MenuButton>Logout</MenuButton>
                            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                            <Switch color={'default'} onChange={changeModeHandler} />
                        </div>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid2 container sx={{ mb: '30px' }}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid2>
                    <Grid2 container spacing={3}>
                        {todolists.map((tl) => {
                            let tasksForTodoList = tasks[tl.id];

                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter((task: TaskType) => task.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter((task: TaskType) => task.isDone === true)
                            }
                            return <Grid2 key={tl.id}>
                                <Paper sx={{ p: '0 20px 20px 20px' }}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTitleTodolist={updateTitleTodolist}
                                    />
                                </Paper>
                            </Grid2>
                        })}
                    </Grid2>

                </Container>
            </ThemeProvider>
        </div>
    )
}

export default AppWithRedux;
