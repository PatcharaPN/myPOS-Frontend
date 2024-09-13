import ActivityBox from "../../components/ActivityBox/ActivityBox";
import "./Home.scss";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  getAmountSummary,
  lowStock,
} from "../../features/ProductSlice";
import { getAmountOfPayment } from "../../features/paymentSlice";
import { Product } from "../../types/interface";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { useNavigate } from "react-router-dom";
import { getAmountCustomer } from "../../features/customerSlice";
import BoxContainer from "../../components/BoxContainer/BoxContainer";
import PieChart from "../../components/Graph/Pie/PieChart";
//var CanvasJSReact = require('@canvasjs/react-charts');

const Home = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setNewProducts] = useState<Product[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const amountCustomer = useAppSelector(
    (state: RootState) => state.customer.totalcustomer,
  );
  const amountPayment = useAppSelector(
    (state: RootState) => state.payment.amount,
  );
  const totalAmount = useAppSelector(
    (state: RootState) => state.product.totalAmount,
  );
  const product = useAppSelector((state: RootState) => state.product.products);
  const lowStockProducts = useAppSelector(
    (state: RootState) => state.product.lowStock,
  );

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
        (products) => new Date(products.createdAt).getTime() >= lastedSevenday,
      );
      const sortedProducts = filteredProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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

  console.log(totalAmount);

  return (
    <div className="menu-container">
      <div className="activity-menu">
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
        <ActivityBox
          total={totalAmount[0]?.totalStock}
          unit={t("activityBoxUnit.productsSale")}
          type={""}
          showType="info"
          color={"#FE4646"}
          onClick={() => {
            navigate("/item");
          }}
          text={t("activityBox.productsSale")}
        />{" "}
        <ActivityBox
          total={0}
          unit={t("activityBoxUnit.pendingRequests")}
          type={""}
          showType="error"
          color={"#FE4646"}
          text={t("activityBox.pendingRequests")}
        />{" "}
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
      <section className="graph-section">
        <BoxContainer>
          <div className="indicator-container">
            <div className="status-indicator">
              <div className="indicator-wrapper">
                <div>
                  <div className="indicator-bar">
                    <p>All products</p>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <p>0</p>
                    </div>
                  </div>
                  <div className="indicator-bar">
                    <p>Total payment</p>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <p>0</p>
                    </div>
                  </div>
                  <div className="indicator-bar">
                    <p>Monthly Income</p>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <p>0</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pie-wrapper">
                <PieChart />
              </div>
            </div>
          </div>
        </BoxContainer>
        <section className="topsell-container" style={{ marginTop: "1rem" }}>
          <BoxContainer>
            <div className="topsell-wrapper">
              <div className="top-sell-products">
                <h1>Top Selling Products</h1>
              </div>
            </div>
          </BoxContainer>
        </section>
      </section>
      <section className="order-section" style={{ marginTop: "1rem" }}>
        <BoxContainer>
          <div className="order-wrapper">
            <h1>Incoming Order</h1>
            <div className="order-list"></div>
          </div>
        </BoxContainer>
      </section>
    </div>
  );
};

export default Home;
//WeeklyLineChart
