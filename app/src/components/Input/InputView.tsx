interface InputProps {
  placeholder: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  initialValue?: string | number;
}

export const InputView = ({
  onChange,
  label,
  placeholder,
  initialValue,
}: InputProps) => {
  return (
    <div className={"flex w-full flex-col space-y-2"}>
      <label className={`font-poppins text-sm font-medium text-gray-300`}>
        {label}
      </label>
      <input
        type="text"
        className={`rounded-lg border bg-blue-300 p-2.5 text-sm text-gray-200 hover:ring-2 hover:ring-blue-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-400`}
        placeholder={placeholder}
        value={initialValue}
        onChange={onChange}
      />
    </div>
  );
};
