import styles from "../Button/Button.module.css";

export default function Button({
  children,
  onClick,
  style = "primary",
  shadow = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[style]} ${shadow && styles.shadow}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
