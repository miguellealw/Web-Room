import { Path, UseFormRegister } from "react-hook-form";

interface IFormValues {
  categoryName: string;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
};
const CategoryInput: React.FC<InputProps> = ({
  label,
  register,
  required,
  ...props
}) => {
  return (
    <div>
      <label
        htmlFor="name"
        className="text-base lg:text-lg font-bold block mb-1"
      >
        {label}
      </label>
      <input
        type="text"
        id="name"
        placeholder="Tech Channels"
        className="w-full rounded-md p-1 lg:p-2 focus:outline-none"
        {...register(label, { required, minLength: 2, maxLength: 60 })}
      />
    </div>
  );
};

export default CategoryInput;
