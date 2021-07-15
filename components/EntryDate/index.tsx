import styles from "./EntryDate.module.css";

type Props = {
  date: string;
};

const EntryDate: React.FC<Props> = ({ date, children }) => {
  return (
    <div className={styles.datebox}>
      <time dateTime={date}>{children}</time>
    </div>
  );
};

export { EntryDate };
