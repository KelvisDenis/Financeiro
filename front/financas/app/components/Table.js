import styles from "../Table.module.css";

export default function Table({ data }) {
  return (
    <div className={styles.tableContainer}>
        <h3 className={styles.titleh2}>Historico</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>Data</th>
            <th className={styles.header}>Tipo</th>
            <th className={styles.header}>Descrição</th>
            <th className={styles.header}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className={styles.rowHover}>
                <td className={styles.cell}>{item.date}</td>
                <td className={`${styles.cell} ${styles[item.type.toLowerCase()]}`}>{item.type}</td>
                <td className={styles.cell}>{item.description}</td>
                <td className={styles.cell}>{item.value}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.cell}>
                Nenhuma transação registrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
