import React from 'react';

import s from '../app/App.module.css'
import {Contact} from "../components/Contact";
import {useSelector} from "react-redux";
import {selectorContacts} from "../utils/contacts-selector";
import {useAppDispatch} from "../utils/useAppDispatch";
import {contactsActions, contactsThunk, ContactType} from "../app/app-reducer";


const ContactList = () => {
    const dispatch = useAppDispatch()


    const removeContact = (id: string) => {
        // dispatch(contactsActions.deleteContact({id}))
        dispatch(contactsThunk.deleteContact({id}))
    }

    const editContact = (contact: ContactType) => {
        // dispatch(contactsActions.editContact({editContact: contact}))
    }

    const contacts =  useSelector(selectorContacts)

    return (
        <div className={s.contactList}>
            {contacts.contacts.map((el) => (
                <Contact
                    key={el.id}
                    name={el.name}
                    email={el.email}
                    id={el.id}
                    phoneNumber={el.phoneNumber}
                    removeContact={removeContact}
                    editContact={editContact}
                />
            ))}
        </div>
    );
};

export default ContactList;