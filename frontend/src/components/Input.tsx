import type { FC } from "react";

type Props = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<Props> = ({ label, type = "text", value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 bg-white text-zinc-500"
      />
    </div>
  );
};

export default Input;
