import '../css/inputtext.css';

const InputText = ({ name, label, placeholder, type = "text", register, error }) => {
  return (
    <div className="input-container">
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <div className="input-wrapper">
        <input
          id={name}
          {...register(name, { required: `${label} is required` })}
          placeholder={placeholder}
          type={type}
          className={`input-field ${error ? 'input-error' : ''}`}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default InputText;