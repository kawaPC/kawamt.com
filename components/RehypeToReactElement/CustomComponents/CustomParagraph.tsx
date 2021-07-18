type Props = {
  children: string;
};

const CustomParagraph: React.VFC<Props> = ({ children }) => {
  return <div className="my-6 leading-7 customParagpraph">{children}</div>;
};

export { CustomParagraph };
