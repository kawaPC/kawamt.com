type Props = {
  children: React.ReactNode;
};

const CustomParagraph: React.FC<Props> = ({ children }) => {
  return <div className="mt-3 paragpraph">{children}</div>;
};

export { CustomParagraph };
