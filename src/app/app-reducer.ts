import {v1} from "uuid";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../utils/create-app-thunk";
import {contactsApi} from "../components/contact-api";


const initialState: InitialType = {
    contacts: [
        // {name: 'Vania', phoneNumber: '80295712345', email: 'velvet99@mail.ru', id: v1()},
        // {name: 'Alice', phoneNumber: '1234567890', email: 'alice@example.com', id: v1()},
        // {name: 'Bob', phoneNumber: '2345678901', email: 'bob@example.com', id: v1()},
        // {name: 'Charlie', phoneNumber: '3456789012', email: 'charlie@example.com', id: v1()},
        // {name: 'David', phoneNumber: '4567890123', email: 'david@example.com', id: v1()},
    ]
};

type InitialType = {
    contacts: ContactType[]
}

export type ContactType = {
    name: string
    phoneNumber: string
    email: string
    id: string
}

const slice = createSlice(
    {
        name: 'contacts',
        initialState,
        reducers: {
            // addContact: (state, action: PayloadAction<{newContact: ContactType}>) => {
            //      state.contacts.unshift(action.payload.newContact)
            // },
            // deleteContact: (state, action: PayloadAction<{id: string}>) => {
            //    const index =  state.contacts.findIndex(el => el.id === action.payload.id)
            //     if(index !== -1) {
            //         state.contacts.splice(index, 1)
            //     }
            // },
            editContact: (state, action: PayloadAction<{ editContact: ContactType }>) => {
                const index = state.contacts.findIndex(el => el.id === action.payload.editContact.id)
                if (index !== -1) state.contacts[index] = action.payload.editContact
            }
        },
        extraReducers: builder => {
            builder
                .addCase(getContacts.fulfilled, (state, action) => {
                    state.contacts = action.payload.contacts
                })
                .addCase(addContact.fulfilled, (state, action) => {
                    console.log(action.payload.contact, 'ADD CASE')
                    state.contacts.unshift(action.payload.contact)
                })
                .addCase(deleteContact.fulfilled, (state, action) => {
                    const index = state.contacts.findIndex(el => {
                        return el.id === action.payload.id
                    })

                    if (index !== -1) {
                        state.contacts.splice(index, 1)
                    }
                })
                .addCase(updateContact.fulfilled, (state, action) => {
                    const index = state.contacts.findIndex(el => el.id === action.payload.updatedContact.id)
                    if (index !== -1) {
                        state.contacts[index] = action.payload.updatedContact
                    }
                })
        }
    }
)


const getContacts = createAppAsyncThunk(
    `${slice.name}/getContacts`,
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI

        const res = await contactsApi.getContacts()

        return {contacts: res.data}
    }
)


const addContact = createAppAsyncThunk<{ contact: ContactType }, any>(
    `${slice.name}/addContact`,
    async (arg, thunkAPI) => {

        const res = await contactsApi.addContact(arg.contact)
        console.log(res.data, 'add thunk')
        return {contact: res.data}

    }
)

const deleteContact = createAppAsyncThunk<{ id: string }, { id: string }>(
    `${slice.name}/deleteContact`,
    async (arg, thunkAPI) => {
        const res = await contactsApi.deleteContact(arg.id)
        console.log(res.data, 'deletcotact')
        return res.data
    }
)

const updateContact = createAppAsyncThunk<{updatedContact: ContactType}, {updatedContact: ContactType}>(
    `${slice.name}/updateContact`,
    async (arg, thunkAPI) => {
        const res = await contactsApi.updateContact(arg.updatedContact.id, arg.updatedContact)
        return {updatedContact: res.data}
    }
)

export const contactsReducer = slice.reducer
export const contactsActions = slice.actions
export const contactsThunk = {getContacts, addContact, deleteContact, updateContact}