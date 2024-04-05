import React, {useCallback, useEffect} from 'react';
import s from '../app/App.module.css'
import {useAppDispatch} from "../utils/useAppDispatch";
import {v1} from "uuid";
import {contactsActions, contactsThunk, ContactType} from "../app/app-reducer";
import {SubmitHandler, useForm} from "react-hook-form";

type PropsType = {
    editContact?: ContactType
    editMode?: boolean
    changeEditMode?: (editMode: boolean) => void
    editContactHandler?: (data: Omit<ContactType, 'id'>) => void
}

type Inputs = {
    name: string
    phoneNumber: string
    email: string
}

export const ContactForm: React.FC<PropsType> = ({changeEditMode, editMode, editContactHandler, editContact}) => {

    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isSubmitSuccessful},
        reset,
        setValue
    } = useForm<Inputs>({
        defaultValues: {
            name: editContact?.name || '',
            phoneNumber: editContact?.phoneNumber || '',
            email: editContact?.email || ''
        }
    })

    useEffect(() => {
        if (editContact && editMode) {
            setValue('name', editContact.name);
            setValue('phoneNumber', editContact.phoneNumber);
            setValue('email', editContact.email);
        } else if (isSubmitSuccessful) {
            reset();
        }
    }, [editContact, editMode, isSubmitSuccessful]);



    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (editMode) {
            if (editContactHandler) editContactHandler(data)
            if (changeEditMode) changeEditMode(!editMode)
            let resID = editContact?.id ? editContact.id : ''
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
            <input  {...register("name")} />

            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("phoneNumber", {required: false})} />
            {/* errors will return when field validation fails  */}
            {errors.phoneNumber && <span>This field is required</span>}

            <input {...register("email", {required: true})} />

            <input type="submit"/>
        </form>
    )
};
