type Props = {
  children: string;
};

const CustomParagraph: React.VFC<Props> = ({ children }) => {
  return <div className="my-6">{children}</div>;
};

export { CustomParagraph };
