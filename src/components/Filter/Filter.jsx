import css from '../Filter/Filter.module.css';
import { useSelector, useDispatch } from "react-redux";
import { filterContacts } from "redux/contactsSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter);

  const changeFilter = (evt) => {
    dispatch(filterContacts(evt.currentTarget.value))
  };
  
  return <label className={css.filterName} htmlFor='text'>
      Find contacts by name
      <input autoComplete='off' className={css.filter} type='text' value={filter} name='filter' onChange={changeFilter} />
    </label>
}

export default Filter;


