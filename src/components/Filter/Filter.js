import css from './Filter.module.css';

const Filter = ({ handleFilter }) => {
  return (
    <div className={css.filter}>
      <label htmlFor="filterContact">Find contacts by name</label>
      <input
        className={css.filterInput}
        name="filter"
        type="text"
        id="filterContact"
        onChange={handleFilter}
      />
    </div>
  );
};

export default Filter;
