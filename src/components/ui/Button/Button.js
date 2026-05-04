import styles from "./Button.module.css";

function Button({ type = "button", variant, onClick, children, ...props }) {
  const variantClass = variant ? styles[variant] : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${variantClass}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
