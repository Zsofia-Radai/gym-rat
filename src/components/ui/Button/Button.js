import "./Button.css";

function Button({
  type = "button",
  variant,
  onClick,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
