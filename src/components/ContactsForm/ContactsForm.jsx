import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import css from '../ContactsForm/ContactsForm.module.css';
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { addContact, getContactsItem } from "redux/contactsSlice";

const phoneRegExp = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = yup.object().shape({
  name: yup.string().min(2, 'Your name is too short').required(),
  number: yup.string().matches(phoneRegExp, 'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +').required(),
})

const ContactsForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(getContactsItem);

    const handleSubmit = ({ name, number }, { resetForm }) => {
        const id = nanoid();
        const contactsMatch = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
        if (contactsMatch) {
            alert(`${name} is already in contacts`);
        } else {
            dispatch(addContact({ name, number, id }));
            resetForm();}
  };

    return <Formik initialValues={{name: '', number: ''}} validationSchema={schema} onSubmit={handleSubmit}>
        <Form autoComplete='on'>
        <label className={css.contact} htmlFor='name'>
            Name
            <Field className={css.contactInput}type='text' name='name'/>
            <ErrorMessage className={css.contactError} name='name' component='div'/>
        </label>
        <label className={css.contact} htmlFor='number'>
            Number
            <Field className={css.contactInput}type="tel" name="number"/>
            <ErrorMessage className={css.contactError} name='number' component='div'/>
        </label>
        <button type='submit' className={css.contactButton}>Add contact</button>
        </Form>
    </Formik>
}

export default ContactsForm;


