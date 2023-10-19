interface TitleProps {
  children?: React.ReactNode;
}

export const Title = ({ children }: TitleProps) => {
  return (
    <span className={"font-poppins text-4xl font-semibold text-white"}>
      {children}
    </span>
  );
};
