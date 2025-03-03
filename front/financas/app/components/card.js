import styles from "../Card.module.css";

export default function Card({ date, type, description, value }) {
  return (
    <div className={`${styles.card} ${styles[type.toLowerCase()]}`}>
      <div className={styles.cardHeader}>
        <span className={styles.cardDate}>{date}</span>
        <span className={styles.cardType}>{type}</span>
      </div>
      <p className={styles.cardDescription}>{description}</p>
      <p className={styles.cardValue}>{value}</p>
    </div>
  );
}
