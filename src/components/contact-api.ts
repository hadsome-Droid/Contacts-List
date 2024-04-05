import {instance} from "../api/common-api";


export const contactsApi = {
    getContacts() {
       return instance.get('/contacts')
    },
    addContact(contact: ContactType) {
        return instance.post('/contacts', contact)
    },
    deleteContact(id: string) {
        return instance.delete(`/contacts/${id}`)
    },
    updateContact(id: string, updatedContact: ContactType) {
        return instance.put(`/contacts/${id}`,updatedContact)
    }

}

type ContactType = {
    name: string
    phoneNumber: string,
    email: string
}