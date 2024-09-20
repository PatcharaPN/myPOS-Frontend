import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslation } from "react-i18next";

interface TableHeaderIconProp {
  label: string;
  iconType?: string;
}

const TableHeaderIcon = ({ label, iconType }: TableHeaderIconProp) => {
  const { t } = useTranslation(); // Get translation function

  return (
    <th className="align-header">
      {t(label)} <Icon icon={iconType || "octicon:triangle-down-16"} />
    </th>
  );
};

export default TableHeaderIcon;
