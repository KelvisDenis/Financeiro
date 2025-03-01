import styles from "../card.module.css";

export default function Card({ title, value, icon }) {
    return (
      <div className={styles.card}>
        <div className={styles["card-icon"]}>{icon}</div>
        <h3 className={styles["card-title"]}>{title}</h3>
        <p className={styles["card-value"]}>{value}</p>
      </div>
    );
  }