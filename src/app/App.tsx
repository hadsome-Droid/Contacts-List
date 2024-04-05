import s from './App.module.css'
import ContactList from "../components/ContactList";
import {selectorContacts} from "../utils/contacts-selector";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../utils/useAppDispatch";
import {useCallback, useEffect, useState} from "react";
import {v1} from "uuid";
import {contactsActions, contactsThunk} from "../app/app-reducer";
import {ContactForm} from "../components/ContactForm";
import {contactsApi} from "../components/contact-api";


function App() {
    const contacts = useSelector(selectorContacts)
    const [users, setUsers] = useState([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        // contactsApi.getContacts()
        //     .then(response => {
        //         console.log(response.data)
        //         // setUsers(response.data)
        //     })
        //     .catch(error => console.error(error));
        dispatch(contactsThunk.getContacts())
    }, []);

    console.log(contacts)
    return (
        <div className={s.App}>
            <h1>Contact List</h1>
            <ContactForm/>
            <ContactList/>
        </div>
    )
}

export default App
