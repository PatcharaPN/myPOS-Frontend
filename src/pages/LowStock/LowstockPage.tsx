import React from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import { useTranslation } from "react-i18next";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";

type Props = {};

const LowstockPage = (props: Props) => {
  const { t } = useTranslation(); 
  const dispatch = useAppDispatch();
  const lowProducts = useAppSelector(
    (state: RootState) => state.product.lowStock
  );
  return <ContainerData pagename={t("lowStock")}>

  </ContainerData>;
};

export default LowstockPage;
