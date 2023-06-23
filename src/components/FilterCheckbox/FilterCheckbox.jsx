import "./FilterCheckbox.css";

export default function FilterCheckbox({ checked, onChange, label = '' }) {
  return (
    <div className="filter-checkbox">
      <span
        type="button"
        className={`filter-checkbox__switch ${checked ? 'filter-checkbox__switch_on' : ''}`}
        onClick={onChange}
      ></span>
      <span className="filter-checkbox__label">{label}</span>
    </div>
  );
};
