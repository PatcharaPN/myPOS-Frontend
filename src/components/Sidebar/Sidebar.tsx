import React from "react";
import "./Sidebar.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import MenuList, { menuItems } from "../MenuList";

type SidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-relative">
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <Icon
            width={30}
            color="#2DB67D"
            icon={
              isCollapsed
                ? "fluent:chevron-right-24-filled"
                : "fluent:chevron-left-24-filled"
            }
          />
        </div>
      </div>

      <div className="sidebar-content">
        {isCollapsed ? (
          <div className="sidebar-icon">
            <div className="logo">
              <img width={60} src="/Logo.svg" alt="" />
            </div>
            {menuItems.map((item, index) => (
              <Icon
                key={index}
                icon={item.icon}
                width={30}
                color="#7F5AF0"
                className="menu-item-list"
              />
            ))}
          </div>
        ) : (
          <div className="content">
            <div className="logo">
              <img width={130} src="/Logo.svg" alt="" />
            </div>
            <MenuList isCollapsed={false} />
          </div>
        )}
      </div>
      <div className="version">
        <p>1.0.0-beta.4</p>
        <div className="Donate-me">
          <button className="btn-donate">
            <img src="/assets/Buy Me a Coffee Icon.png" width={30} alt="" />
            Buy me a Coffee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
