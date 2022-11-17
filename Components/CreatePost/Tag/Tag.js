import styles from "./Tag.module.css";
const Tag = (props) => {
  return (
    <div className={`${styles.tag} ${styles.blue}`}>
      <div className={styles.text}>{props.Tag}</div>
      <img
        src="../images/Desktop/cross.svg"
        alt=""
        onClick={props.Delete}
        className={styles.cross}
      />
    </div>
  );
};
export default Tag;
