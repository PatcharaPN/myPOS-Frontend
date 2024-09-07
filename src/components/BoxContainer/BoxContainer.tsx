import { ReactNode } from "react";
import "./BoxContainer.scss";

interface BoxProps {
  children?: ReactNode;
  width?: string;
  height?: string;
}
const BoxContainer = ({ children, width, height }: BoxProps) => {
  return (
    <div style={{ width: width, height: height }} className="box">
      {children}
    </div>
  );
};

export default BoxContainer;
