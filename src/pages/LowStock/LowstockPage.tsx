import ContainerData from "../../components/ContainerData/ContainerData";
import { useTranslation } from "react-i18next";

const LowstockPage = () => {
  const { t } = useTranslation();
  return <ContainerData pagename={t("lowStock")}></ContainerData>;
};

export default LowstockPage;
