import styles from "./HeaderComponent.module.css";

const HeaderComponent = (props) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bg_img}>
          <h1 className={styles.heading}>{props.title}</h1>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
