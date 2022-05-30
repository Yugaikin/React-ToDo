import "../styles/Button.css";

const Button = ({ body, callback, locked }) => {
  return (
    <button
      disabled={locked}
      onClick={callback}
      className={locked ? "btn-disabled" : "btn"}
    >
      {body}
    </button>
  );
};

export default Button;