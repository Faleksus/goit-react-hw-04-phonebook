import { useState } from "react";
import css from "./ContactForm.module.css";

export const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
  });

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    setFormData(prevState => ({
      ...prevState, [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(formData);
    reset();
  };

  const reset = () => {
    setFormData({ name: "", number: "" });
  };

  const { name, number } = formData;

  return (
    <form className={css.formPhonebook} onSubmit={handleSubmit}>
      <h3 className={css.sectionSubHeader}>Name</h3>
      <input
        className={css.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      ></input>

      <h3 className={css.sectionSubHeader}>Number</h3>
      <input
        className={css.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
      />

      <button className={css.btn} type="submit" disabled={!name || !number}>
        Add contact
      </button>
    </form>
  );
};
