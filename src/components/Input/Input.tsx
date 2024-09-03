import React from "react";
import "./Input.scss";
type InputProps = {
  label: string;
  name?: string;
  type?: "text" | "number" | "password" | "email";
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput: React.FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className="input">
      <p
        style={required ? { color: "red" } : { color: "black" }}
        className="input-name"
      >
        {label}
      </p>
      <input
        name={name}
        type={type}
        className="additem-input-text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;
