import "./selectinput.css";

const SelectInput = ({ name, label, options, register, error }) => {
  return (
    <div className="select-container">
      <label htmlFor={name} className="select-label">
        {label}
      </label>
      <select
        id={name}
        {...register(name, { required: `${label} is required` })}
        className={`select-input ${error ? "select-error" : ""}`}
      >
        <option value="">Seleccione una opción</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SelectInput;
