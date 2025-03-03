import styles from "../Table.module.css";
import Card from "./card";

export default function Table({ data }) {
  return (
    <div className={styles.tableContainer}>
      <h3 className={styles.title}>Histórico</h3>
      <div className={styles.cardGrid}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <Card
              key={index}
              date={item.date}
              type={item.type}
              description={item.description}
              value={item.value}
            />
          ))
        ) : (
          <p className={styles.noTransactions}>Nenhuma transação registrada</p>
        )}
      </div>
    </div>
  );
}
