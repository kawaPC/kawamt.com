const CustomBlockquote: React.FC = ({ children }) => {
  return (
    <blockquote className="mt-5 pl-4 italic border-l-4 border-gray-200">
      {children}
    </blockquote>
  );
};

export { CustomBlockquote };
