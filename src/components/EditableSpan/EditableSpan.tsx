import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    value: string,
    onChange: (newValue: string) => void
    type: string
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({value, onChange, type}) => {
    const [editMode, setEditMode] = useState(false)
    const [newValue, setNewValue] = useState(value)


    const activateViewMode = () => {
        setEditMode(false)
        onChange(newValue)
    }

    const activateEditMode = () => {
        setEditMode(true)
        // setNewValue(value)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.currentTarget.value)
    }

    return editMode
        ? <input type={type} value={value} onChange={onChangeHandler} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{value}</span>

};
