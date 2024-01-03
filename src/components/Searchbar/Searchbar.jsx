import s from './Searchbar.module.scss';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={s.bar}>
      <form className={s.form}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
