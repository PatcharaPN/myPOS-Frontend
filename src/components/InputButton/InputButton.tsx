import { TextField } from "@mui/material";
import React from "react";

type InputProps = {
  label: string;
  placholder: string;
  value: string;
  type?: "text" | "password" | "email" | "number";
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputButton: React.FC<InputProps> = ({
  label,
  placholder,
  value,
  type,
  name,
  onChange,
}) => {
  return (
    <TextField
      name={name}
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placholder}
      sx={{
        width: "300px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#7F5AF0",
            borderWidth: "2px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#7F5AF0",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#7F5AF0",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#000000",
        },
        "& .MuiInputBase-input": {
          color: "#94A1B2",
        },
        "& .MuiInputBase-input::placeholder": {
          color: "#94A1B2",
        },
      }}
    />
  );
};

export default InputButton;
