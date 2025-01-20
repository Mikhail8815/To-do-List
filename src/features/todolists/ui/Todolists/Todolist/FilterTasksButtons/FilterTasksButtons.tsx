
import {FilterValuesType, TodolistType} from "../../../../../../App/App";
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import {Box, IconButton, Stack} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../../../../model/torolists-reducer";
import {useAppDispatch} from "../../../../../../App/hooks";
import Button from "@mui/material/Button";
import {filterButtonsContainerSx} from "./FilterTasksButtons.styles";

type PropsType = {
    todolist: TodolistType
}


export const FilterTasksButtons = ({todolist}: PropsType) => {
    const dispatch = useAppDispatch()

    const {filter, id} = todolist

    const changeFilter = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    return (
        <Box sx={filterButtonsContainerSx}>
            <Stack spacing={1} direction="row">
                <Button color={'inherit'}
                        variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={() => changeFilter('all')}>
                    ALL
                </Button>
                <Button color={'primary'}
                        variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={() => changeFilter('active')}>
                    Active
                </Button>
                <Button color={'secondary'}
                        variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={() => changeFilter('completed')}>
                    Completed
                </Button>
            </Stack>


            {/*<Button className={filter === 'all' ? 'active-filter' : ''} title={"All"} onClick={() => changeFilterTasksHandler('all')}/>*/}
            {/*<Button className={filter === 'active' ? 'active-filter' : ''} title={"Active"} onClick={() => changeFilterTasksHandler('active')}/>*/}
            {/*<Button className={filter === 'completed' ? 'active-filter' : ''} title={"Completed"} onClick={() => changeFilterTasksHandler('completed')}/>*/}
        </Box>
    );
};
