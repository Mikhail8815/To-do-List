import {Container, Grid2} from "@mui/material";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import React from "react";
import {useAppDispatch} from "./hooks";
import {addTodolistAC} from "../features/todolists/model/torolists-reducer";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";

export const Main = () => {

    const dispatch = useAppDispatch()

    //Функции для тудулиста

    const addTodolist = (title: string) => {

        const action = addTodolistAC(title)
        dispatch(action)
    }

    return (
        <Container fixed>
            <Grid2 container sx={{mb: '30px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid2>
            <Grid2 container spacing={3}>
                <Todolists />
            </Grid2>
        </Container>
    )
}
