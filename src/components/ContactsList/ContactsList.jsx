import ContactItem from 'components/ContactItem/ContactItem';
import { deleteContacts, getContactsItem } from "redux/contactsSlice";
import { useSelector, useDispatch } from "react-redux";

const ContactsList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(getContactsItem);
    const filter = useSelector(state => state.contacts.filter);

    const getFilteredContacts = () => {    
      return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    };

    const deleteContact = (contactId) => {
    dispatch(deleteContacts(contactId));
    };
    
    return <ul>
        {getFilteredContacts().map(({ id, name, number }) => <ContactItem key={id} id={id} name={name} number={number} onDeleteContact={deleteContact}/>)}
    </ul>
}

export default ContactsList;
