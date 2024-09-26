import { CheckBoxProp } from "../../types/interface";

const CheckBox = ({ onChange, checked }: CheckBoxProp) => {
  return (
    <input
      type="checkbox"
      name=""
      id=""
      onChange={onChange}
      checked={checked}
    />
  );
};

export default CheckBox;
