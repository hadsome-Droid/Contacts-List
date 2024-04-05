import React, {useCallback, useEffect} from 'react';
import s from '../app/App.module.css'
import {useAppDispatch} from "../utils/useAppDispatch";
import {v1} from "uuid";
import {contactsActions, contactsThunk, ContactType} from "../app/app-reducer";
import {SubmitHandler, useForm} from "react-hook-form";

type PropsType = {
    id?: string
    editMode?: boolean
    changeEditMode?: (editMode: boolean) => void
    editContact?: (data: Omit<ContactType, 'id'>) => void
}

type Inputs = {
    name: string
    phoneNumber: string
    email: string
}

export const ContactForm: React.FC<PropsType> = ({changeEditMode, id, editMode, editContact}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isSubmitSuccessful},
        reset
    } = useForm<Inputs>()

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful]);

    const dispatch = useAppDispatch()

    const onClickHandler = useCallback(() => {
        const newContact = {name: 'Test', phoneNumber: '8999999999', email: 'Test99@mail.ru', id: v1()}
        // dispatch(contactsActions.addContact({newContact}))
    }, [])


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (editMode) {
            if (editContact) editContact(data)
            if (changeEditMode) changeEditMode(!editMode)
            let resID = id ? id : ''
            let updateDate = {...data, id: resID}
            dispatch(contactsThunk.updateContact({updatedContact: updateDate}))
            console.log(data, '++')
        } else {

            dispatch(contactsThunk.addContact({contact: data}))
            console.log(data, '---')
        }



    }


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)} className={s.contactForm}>
            {/* register your input into the hook by invoking the "register" function */}
            <input {...register("name")} />

            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("phoneNumber", {required: false})} />
            {/* errors will return when field validation fails  */}
            {errors.phoneNumber && <span>This field is required</span>}

            <input {...register("email", {required: true})} />

            <input type="submit"/>
        </form>
    )
};
