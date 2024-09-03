import React from "react";
import "./NoSidebarLayout.scss";

type NoSidebarLayoutProps = {
  children: React.ReactNode;
};

const NoSidebarLayout: React.FC<NoSidebarLayoutProps> = ({ children }) => {
  return <div className="no sidebar-layout">{children}</div>;
};

export default NoSidebarLayout;
