type Props = {
  date: string;
};

const EntryDate: React.FC<Props> = ({ date, children }) => {
  return (
    <div className="mx-auto py-1 w-28 font-bold text-sm text-white text-center leading-6 rounded-sm bg-gray-900">
      <time dateTime={date}>{children}</time>
    </div>
  );
};

export { EntryDate };
