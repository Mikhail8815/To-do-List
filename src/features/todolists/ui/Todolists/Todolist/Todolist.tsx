import React from 'react';
// import {Button} from "./Button";
import {TodolistType} from "../../../../../App/App";
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {addTaskAC} from "../../../model/tasks-reducer";
import {useAppDispatch} from "../../../../../App/hooks";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {Tasks} from "./Tasks/Tasks";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";

type PropsType = {
    todolist: TodolistType
}


export const Todolist = ({todolist}: PropsType) => {
    // const inputRef = useRef<HTMLInputElement>(null)

    // const [taskTitle, setTaskTitle] = useState('')
    // const [error, setError] = useState<string | null>(null)
    const {id: todolistId, filter} = todolist

    const dispatch = useAppDispatch()


    const addTask = (title: string) => {
        dispatch(addTaskAC({title: title, todolistId: todolistId}))
    }

    return (
        <div className="App">
            <div>
                <TodolistTitle todolist={todolist}/>
                <div>
                    <AddItemForm addItem={addTask}/>
                </div>
                <Tasks todolist={todolist}/>
                <FilterTasksButtons todolist={todolist}/>
                {/*<FilterTasksButtons todolist={todolist}/>*/}
            </div>
        </div>
    );
};
