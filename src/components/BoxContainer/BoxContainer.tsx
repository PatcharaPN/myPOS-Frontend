import { ReactNode } from "react";
import "./BoxContainer.scss";

interface BoxProps {
  children?: ReactNode;
}
const BoxContainer = ({ children }: BoxProps) => {
  return <div className="box">{children}</div>;
};

export default BoxContainer;
