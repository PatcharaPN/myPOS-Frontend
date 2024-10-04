import ContainerData from "../../components/ContainerData/ContainerData";
import { useTranslation } from "react-i18next";

const LowstockPage = () => {
  const { t } = useTranslation();
  //API Fetch Product Where Stock below 10
  return <ContainerData pagename={t("lowStock")}></ContainerData>;
};

export default LowstockPage;
