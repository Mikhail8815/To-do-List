import * as React from 'react';
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";


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
            <input value={itemTitle}
                   onChange={changeItemTitleHandler}
                   onKeyUp={addItemOnKeyUpHandler}
                   className={error ? 'error' : ''}/>
            <Button onClick={addItemHandler} title={'+'}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};