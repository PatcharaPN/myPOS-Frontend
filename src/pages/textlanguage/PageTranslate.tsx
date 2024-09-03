import { t } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

type Props = {};

const PageTranslate = (props: Props) => {
  const { t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // สลับภาษา
  };
  return (
    <div className="dashboard-menu">
      <div>
        <h1>{t("welcome")}</h1>
        <button onClick={() => changeLanguage("th")}>Change</button>
      </div>
    </div>
  );
};

export default PageTranslate;
