import { useTranslation } from "react-i18next";
import ActivityBox from "../ActivityBox/ActivityBox";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  getAmountSummary,
  lowStock,
} from "../../features/ProductSlice";
import { getAmountCustomer } from "../../features/customerSlice";
import { getAmountOfPayment } from "../../features/paymentSlice";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/interface";

const ActivityMenu = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state: RootState) => state.product.products);
  const [, setNewProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const lowStockProducts = useAppSelector(
    (state: RootState) => state.product.lowStock
  );
  const amountCustomer = useAppSelector(
    (state: RootState) => state.customer.totalcustomer
  );
  const amountPayment = useAppSelector(
    (state: RootState) => state.payment.amount
  );
  const totalAmount = useAppSelector(
    (state: RootState) => state.product.totalAmount
  );

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAmountSummary());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAmountCustomer());
  }, [dispatch]);
  useEffect(() => {
    if (product.length > 0) {
      const lastedSevenday = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const filteredProducts = product.filter(
        (products) => new Date(products.createdAt).getTime() >= lastedSevenday
      );
      const sortedProducts = filteredProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setNewProducts(sortedProducts.slice(0, 4));
    }
  }, [product]);
  useEffect(() => {
    dispatch(getAmountOfPayment());
    dispatch(getAllProducts());
  }, []);
  console.log(amountPayment);

  useEffect(() => {
    dispatch(getAmountSummary());
    dispatch(lowStock());
  }, [dispatch]);
  return (
    <>
      <div className="activity-menu">
        <h2 style={{ fontWeight: 200 }}>Dashboard</h2>
        <div className="box-wrapper" style={{ display: "flex" }}>
          <ActivityBox
            total={lowStockProducts.length > 0 ? lowStockProducts[0].total : 0}
            unit={t("activityBoxUnit.lowStock")}
            type={""}
            showType="warning"
            color={"#2DB67D"}
            text={t("activityBox.lowStock")}
          />
          <ActivityBox
            total={amountPayment}
            unit={t("activityBoxUnit.complete")}
            type={""}
            showType="success"
            color={"#FE4646"}
            text={t("activityBox.complete")}
          />{" "}
          {/* <ActivityBox
          total={totalAmount[0]?.totalStock}
          unit={t("activityBoxUnit.productsSale")}
          type={""}
          showType="info"
          color={"#FE4646"}
          onClick={() => {
            navigate("/item");
          }}
          text={t("activityBox.productsSale")}
        />{" "} */}
          <ActivityBox
            total={0}
            unit={t("activityBoxUnit.pendingRequests")}
            type={""}
            showType="error"
            color={"#FE4646"}
            text={t("activityBox.pendingRequests")}
          />
          <ActivityBox
            onClick={() => navigate("/Customers")}
            total={amountCustomer}
            unit={t("activityBoxUnit.incomingInvoices")}
            type={""}
            showType="incoming"
            color={"#FE4646"}
            text={t("activityBox.incomingInvoices")}
          />
        </div>
      </div>
    </>
  );
};

export default ActivityMenu;
