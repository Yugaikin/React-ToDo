import "../styles/Input.css";

const Input = ({
  type,
  placeholder,
  classStyle,
  value,
  callback,
  defaultChecked,
  addEnter,
  checked,
}) => {
  return (
    <input
      type={type}
      className={classStyle}
      placeholder={placeholder}
      defaultChecked={defaultChecked}
      checked={checked}
      value={value}
      onChange={callback}
      onKeyDown={addEnter}
    />
  );
};

export default Input;