export type InputFieldProps = {
  label: string;
  setValue: (value: string) => void;
  // TODO: USE ENUM
  type: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, type, setValue }) => {
  return (
    <div className="pb-3 flex flex-col">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
        }}
        style={{ textIndent: "5px" }}
      />
    </div>
  );
};

export default InputField;
