import styles from "./index.module.scss";

type Props = {
  children: React.ReactNode;
};

const CustomUnorderedList: React.FC<Props> = ({ children }) => {
  return <ul className={`ml-6 ${styles.unorderedList}`}>{children}</ul>;
};

export { CustomUnorderedList };
