import React, {useState} from 'react';
import s from '../app/App.module.css'
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import {ContactType} from "../app/app-reducer";
import {ContactForm} from "../components/ContactForm";

type PropsType = {
    removeContact: (id: string) => void
    editContact: (editContact: ContactType) => void
} & ContactType


export const Contact: React.FC<PropsType> = ({name, id, email, phoneNumber, removeContact, editContact}) => {

const [editMode, setEditMode] = useState(false)

    const onChangeHandler = (data: Omit<ContactType, 'id'>) => {
        let editedContact = {
            name: data.name ? data.name: name,
            phoneNumber: data.phoneNumber ? data.phoneNumber : phoneNumber,
            email: data.email ? data.email : email,
            id: id
        }
        editContact(editedContact)
    }

    return (
        editMode
            ? <ContactForm id={id} editContact={onChangeHandler} editMode={editMode} changeEditMode={(editMode) => setEditMode(editMode)}/>
            : <div className={s.contact}>
                <p>{name}</p>
                <p>{phoneNumber}</p>
                <p>{email}</p>
           {/*<EditableSpan onChange={(newValue) => onChangeHandler(newValue)} value={name} type={'text'}/>*/}
           {/*<EditableSpan onChange={(newValue) => onChangeHandler(newValue)} value={phoneNumber} type={'text'}/>*/}
           {/*<EditableSpan onChange={(newValue) => onChangeHandler(newValue)} value={email} type={'email'}/>*/}
            <div>
                <button onClick={() => setEditMode(!editMode)}>{editMode ? 'Save' : 'Edit'}</button>
                <button onClick={() => removeContact(id)}>Delete</button>
            </div>
        </div>
    );
};
