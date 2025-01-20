import {Grid2, Paper} from "@mui/material";
import {Todolist} from "./Todolist/Todolist";
import React from "react";
import {useAppSelector} from "../../../../App/hooks";
import {selectTodolists} from "../../model/todolists-selectors";

export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists) //Тудулисты

    return (
        <>
            {todolists.map((tl) => {
                return <Grid2 key={tl.id}>
                    <Paper sx={{p: '0 20px 20px 20px'}}>
                        <Todolist todolist={tl}/>
                    </Paper>
                </Grid2>
            })}
        </>
    )
}
