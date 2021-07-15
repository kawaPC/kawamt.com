type Props = {
  date: string;
};

const EntryDate: React.FC<Props> = ({ date, children }) => {
  return (
    <div className="datebox">
      <time dateTime={date}>{children}</time>
    </div>
  );
};

export { EntryDate };
