import "./NotFound.scss";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="item-list-container-wrapper">
        <div className="notfound-container">
          <div className="img-section">
            <img
              className="Notfound-image"
              width={650}
              src="/assets/404.svg"
              alt=""
            />
          </div>
          <h2>{t("notFound")}</h2>
        </div>
      </div>
    </>
  );
};

export default NotFound;
