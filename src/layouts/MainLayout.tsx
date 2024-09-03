import React, { useState } from "react";
import "./MainLayout.scss";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

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
        <Header />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
