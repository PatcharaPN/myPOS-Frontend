import React, { useState, ChangeEvent } from "react";
import "./TrippleInput.scss";

interface MeasurementInputProps {
  label?: string;
  option?: { value?: string; label?: string[] };
  onChange?: (values: {
    value1: string;
    value2: string;
    value3: string;
  }) => void;
}

const MeasurementInput: React.FC<MeasurementInputProps> = ({
  label,
  onChange,
}) => {
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [value3, setValue3] = useState<string>("");

  const handleValueChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (index === 1) {
        setValue1(value);
        onChange?.({ value1: value, value2, value3 });
      } else if (index === 2) {
        setValue2(value);
        onChange?.({ value1, value2: value, value3 });
      } else if (index === 3) {
        setValue3(value);
        onChange?.({ value1, value2, value3: value });
      }
    };

  return (
    <div className="input-layout">
      {label && <p className="measurement-input__label">{label}</p>}
      <div className="measurement-input">
        <input
          type="number"
          value={value1}
          onChange={handleValueChange(1)}
          placeholder=""
          className="measurement-input__input measurement-input__input--first"
        />
        <input
          type="number"
          value={value2}
          onChange={handleValueChange(2)}
          placeholder=""
          className="measurement-input__input"
        />
        <input
          type="number"
          value={value3}
          onChange={handleValueChange(3)}
          placeholder=""
          className="measurement-input__input measurement-input__input--last"
        />
        <select className="selector">
          <option value="">THA</option>
        </select>
      </div>
    </div>
  );
};

export default MeasurementInput;
