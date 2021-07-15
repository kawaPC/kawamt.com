import Link from "next/link";
import styles from "./ReadMore.module.css";

type Props = {
  href: string;
};

const ReadMore: React.VFC<Props> = ({ href }) => {
  return (
    <p className={styles.readMore}>
      <Link href={href}>
        <a className={styles.link}>続きを読む</a>
      </Link>
    </p>
  );
};

export { ReadMore };
