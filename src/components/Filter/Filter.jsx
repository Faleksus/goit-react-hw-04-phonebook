import css from './Filter.module.css';

export const Filter = ({ value, onChange }) => {
    return (
        <section className={css.sectionFilter}>
            <h2 className={css.sectionHeader}>Find contacts by name</h2>
            <input
                className={css.input}
                type="text"
                name="filter"
                value={value}
                onChange={onChange}
            />
        </section>
    )
}