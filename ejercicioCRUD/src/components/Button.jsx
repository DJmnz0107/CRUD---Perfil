import '../css/button.css';

const Button = ({ type, onClick, text, variant = "primary", size = "medium" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size}`}
    >
      {text}
    </button>
  );
};

export default Button;