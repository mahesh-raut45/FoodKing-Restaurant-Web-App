import styles from "./Button.module.css";
const Button = (props) => {
  // console.log("Button props:", props);
  return (
    <button
      className={`${styles.button} ${props.background ? styles.white_bg : ""}`}
    >
      {props.icon}
      {props.text}
    </button>
  );
};

export { Button };
