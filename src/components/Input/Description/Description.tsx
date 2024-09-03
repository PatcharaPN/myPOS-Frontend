import React from "react";
import "../Input.scss";
type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextAreaInput: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className="input-label">
      <p
        style={required ? { color: "red" } : { color: "black" }}
        className="input-name"
      >
        {label}
      </p>
      <textarea
        className="description"
        onChange={onChange}
        value={value}
      ></textarea>
    </div>
  );
};

export default TextAreaInput;
