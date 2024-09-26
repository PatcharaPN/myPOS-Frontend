import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import i18n from "../../i18n";
import { menuItemsMobile } from "../MenuList";
import { useTranslation } from "react-i18next";

type MenuListProps = {
  isCollapsed: boolean;
};

const Header: React.FC<MenuListProps> = ({ isCollapsed }) => {
  const [isPopover, setPopover] = useState(false);
  const [language, setLanguage] = useState(i18n.language);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<number | null>(null);
  const { t } = useTranslation();
  const toggleSubmenu = (index: number) => {
    setExpandedMenus((prev) => (prev === index ? null : index));
  };
  const navigate = useNavigate();
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  const getUserInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length > 1) {
      return names[0][0] + names[1][0];
    }
    return names[0][0] + names[0][4];
  };

  const logout = async () => {
    dispatch(logout);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleMenuClick = (item: any, index: number) => {
    if (item.submenu) {
      toggleSubmenu(index);
    } else {
      setIsDrawerOpen(false);
    }
  };

  const handleSubmenuClick = (submenu: any) => {
    setIsDrawerOpen(false);
    submenu.onClick?.();
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang).then(() => {
      setLanguage(newLang); // Update state to reflect the change
      localStorage.setItem("language", newLang); // Save to localStorage
    });
  };

  useEffect(() => {
    // Retrieve the saved language from localStorage
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const languages = [
    { code: "en", label: "EN" },
    { code: "th", label: "TH" },
  ];

  return (
    <div className="head-container">
      <div className="menu-icon-mobiles">
        <div className="user-section-mobile">
          <div
            className="user-pic"
            style={{
              border:
                currentUser.role === "admin" ? "solid 2px #00FF95" : "none",
            }}
          >
            {getUserInitials(currentUser.username).toUpperCase()}
          </div>{" "}
          <p>
            {currentUser.username} ({currentUser.role})
          </p>
        </div>
        <Icon
          icon="charm:menu-hamburger"
          width={35}
          color="#2DB67D"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        />
      </div>
      <div className="user-container">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="header-logo"
          src="/Logo.svg"
          width={50}
          height={50}
        />
        <div className="user-menu-group">
          <Icon
            color="#7F5AF0"
            icon="uil:setting"
            width={30}
            onClick={() => {
              navigate("/Setting/main");
            }}
          />
          <Icon color="#7F5AF0" icon="material-symbols:mail" width={30} />
          <select
            className="language-Change"
            onChange={handleLanguageChange}
            value={language}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
          <div className="popover-user">
            <p>
              {currentUser.username} ({currentUser.role})
            </p>
            <Icon
              onClick={() => setPopover(!isPopover)}
              icon="iconamoon:arrow-down-2-duotone"
            />
          </div>
          <div className={`popover-menu ${isPopover ? "show" : ""}`}>
            <ul>
              <li className="menu" onClick={logout}>
                <Icon icon="iconamoon:profile" /> Edit Profile
              </li>
              <li className="menu" onClick={logout}>
                <Icon icon="uil:setting" /> Setting
              </li>
              <li className="menu" onClick={logout}>
                <Icon icon="material-symbols:login" /> Log out
              </li>
            </ul>
          </div>
          <div
            className="user-pic"
            style={{
              border:
                currentUser.role === "admin" ? "solid 2px #00FF95" : "none",
            }}
          >
            {getUserInitials(currentUser.username).toUpperCase()}
          </div>
        </div>
      </div>

      <div className={`drawer-menu-mobile ${isDrawerOpen ? "open" : ""}`}>
        <div className="menu-list">
          <ul className="menu-ul">
            {menuItemsMobile.map((item, index) => (
              <li
                key={item.label}
                className={`menu-item ${
                  expandedMenus === index ? "expanded" : ""
                }`}
              >
                <Link to={item.path || "#"}>
                  <div
                    className="menu-item-content"
                    onClick={() => handleMenuClick(item, index)}
                  >
                    <div
                      className="menu-items"
                      onClick={() => !item.submenu && setIsDrawerOpen(false)}
                    >
                      <Icon color="#7F5AF0" icon={item.icon} width={25} />
                      {t(`menuItems.${item.label}`)}
                    </div>
                    {item.submenu && (
                      <Icon
                        icon={
                          expandedMenus === index
                            ? "octicon:triangle-down-16"
                            : "octicon:triangle-right-16"
                        }
                        color="#2DB67D"
                        width={25}
                        className="submenu-toggle"
                      />
                    )}
                  </div>
                </Link>
                {item.submenu && !isCollapsed && (
                  <ul className="submenu">
                    {item.submenu.map((subItem) => (
                      <Link key={subItem.label} to={subItem.path || "#"}>
                        <li
                          className="submenu-item"
                          onClick={() => handleSubmenuClick(subItem)}
                        >
                          {t(`menuItems.${subItem.label}`)}
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
