interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      className={`bg-blue-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
