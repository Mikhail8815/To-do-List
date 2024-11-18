import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}


function App() {

    const [tasks, setTasks] = React.useState<TaskType[]>(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false}
        ]
    );

    const [filter, setFilter] = React.useState<FilterValuesType>('all')

    let tasksForTodoList = tasks;

    if (filter === 'active') {
        tasksForTodoList = tasks.filter((task: TaskType) => task.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter((task: TaskType) => task.isDone === true)
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }


    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter((task: TaskType) => task.id != taskId)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={tasksForTodoList}
                      date={"03.11.2024"}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    )
}

export default App;
