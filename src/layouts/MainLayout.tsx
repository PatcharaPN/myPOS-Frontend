import React, { useState } from "react";
import "./MainLayout.scss";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

type MainLayoutProps = {
  children?: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`layout ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      <main className="main-content">
        <Header isCollapsed={false} />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
