import {configureStore} from "@reduxjs/toolkit";
import {contactsReducer} from "../app/app-reducer";


export const store = configureStore({
    reducer: {
        contacts: contactsReducer
    }
})

export type AppRootStateType = ReturnType<typeof store.getState>;

//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;

export type AppDispatch = typeof store.dispatch
// @ts-ignore
window.store = store;
