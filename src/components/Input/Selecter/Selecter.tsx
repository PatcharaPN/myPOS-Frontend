import React from "react";
import "./Selecter.scss";

type SelectInputProps = {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  name?: string;
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  value,
  name,
  onChange,
  placeholder = "Select an option",
}) => {
  return (
    <div className="input-selector">
      <p className="selector-input-name">{label || placeholder}</p>
      <select
        className="input-select"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
