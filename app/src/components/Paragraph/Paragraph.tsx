interface ParagraphProps {
  children?: React.ReactNode;
}

export const Paragraph = ({ children }: ParagraphProps) => {
  return (
    <p className={"font-poppins text-sm font-medium text-white"}>{children}</p>
  );
};
