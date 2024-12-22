import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Container, createTheme, Grid2, IconButton, Paper, ThemeProvider, Toolbar} from "@mui/material";
import {MenuButton} from "./components/MenuButton";
import MenuIcon from '@mui/icons-material/Menu'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'

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

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => (tl.id === todolistId ? {...tl, filter} : tl)))
    }


    const removeTask = (taskId: string, todolistId: string) => {
        const filteredTasks = tasks[todolistId].filter((task: TaskType) => task.id != taskId)
        setTasks({...tasks, [todolistId]: filteredTasks})
    }

    const addTask = (title: string, totolistId: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [totolistId]: [newTask, ...tasks[totolistId]]})
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodolists)

        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        // const task  = tasks.find((task: TaskType) => task.id === taskId)
        // if (task) {
        //     task.isDone = taskStatus
        //     setTasks([...tasks])
        // }

        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? {...t, isDone: taskStatus} : t))
        }
        setTasks(newTodolistTasks)

        //       let newTasks = tasks.map((task) => {
        //           if (task.id === taskId) {
        //               return {...task, isDone: !task.isDone}
        //           } else return task
        //       })
        // setTasks(newTasks)
    }

    const updateTask = (totolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [totolistId]: tasks[totolistId].map(t => t.id === taskId ? {...t, title} : t)})
    }

    const updateTitleTodolist = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
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

export default App;
