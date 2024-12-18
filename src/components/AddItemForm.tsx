import * as React from 'react';
// import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button'
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox'



type Props = {
    addItem: (taskTitle: string) => void
};

export const AddItemForm = ({addItem}: Props) => {
    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (itemTitle.trim() !== '') {
            addItem(itemTitle.trim());
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.target.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            {/*<input value={itemTitle}*/}
            {/*       onChange={changeItemTitleHandler}*/}
            {/*       onKeyUp={addItemOnKeyUpHandler}*/}
            {/*       className={error ? 'error' : ''}/>*/}
            {/*<Button onClick={addItemHandler} title={'+'}/>*/}
            <TextField
                label="Enter a title"
                variant={'outlined'}
                // className={error ? 'error' : ''}
                error={!!error}
                helperText={error}
                value={itemTitle}
                size={'small'}
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            <IconButton onClick={addItemHandler} color={'primary'}>
                <AddBoxIcon />
            </IconButton>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    );
};
