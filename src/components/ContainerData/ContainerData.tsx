import React, { ReactNode } from "react";
import "./ContainerData.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import Divider from "../Divider/Divider";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

type ContainerProps = {
  pagename: string;
  children?: ReactNode;
  path?: string;
  headerVisible?: boolean;
  value?: string;
  onClickAdd?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Canadd?: boolean;
  pagenameContainer?: boolean;
};

const ContainerData: React.FC<ContainerProps> = ({
  children,
  pagename,
  pagenameContainer = true,
  onClickAdd,
  onChange,
  value,
  Canadd = false,
  headerVisible = true,
}) => {
  const { t } = useTranslation(); // Get translation function

  return (
    <div className="item-list-container-wrapper">
      {pagenameContainer ? (
        <div className="header-menu">
          <h1 className="header">{pagename}</h1>
          <div className="menu-button"></div>
        </div>
      ) : null}
      <div className="item-list-container">
        {headerVisible ? (
          <div>
            <div className="header-top">
              <h3 className="text-header">{t("allItems")}</h3>
              <div className="right-group-btn">
                {Canadd ? (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="add-btn-item"
                    onClick={onClickAdd}
                  >
                    <Icon icon="material-symbols:add" />
                    {t("add")}
                  </motion.div>
                ) : null}
                <div className="searchbar-wrapper">
                  <Icon className="search-icon" icon="iconamoon:search-bold" />
                  <input
                    name="search"
                    placeholder={t("searchProduct")}
                    className="searchbar"
                    value={value}
                    onChange={onChange}
                    type="text"
                  />
                </div>
                <div className="filter-btn">
                  <Icon icon="mage:filter-fill" />
                  {t("filter")}
                </div>
              </div>
            </div>
            <Divider />
          </div>
        ) : null}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default ContainerData;
