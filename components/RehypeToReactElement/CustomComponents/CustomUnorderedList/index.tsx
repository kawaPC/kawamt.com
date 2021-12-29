import styles from "./index.module.scss";

const CustomUnorderedList: React.FC = ({ children }) => {
  return <ul className={`ml-6 ${styles.unorderedList}`}>{children}</ul>;
};

export { CustomUnorderedList };
