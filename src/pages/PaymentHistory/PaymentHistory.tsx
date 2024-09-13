import { useEffect, useState } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { getAllPayments } from "../../features/paymentSlice";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import "./PaymentHistory.scss";

const PaymentHistory = () => {
  const { t } = useTranslation(); // Get translation function
  const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;
  const [currentpage, setCurrentpage] = useState<number>(1);
  const itemPerPage = 7;
  const dispatch = useAppDispatch();
  const paymentHistory = useAppSelector(
    (state: RootState) => state.payment.payments,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const indexOfLastPayment = currentpage * itemPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemPerPage;
  const currentPayments = paymentHistory.slice(
    indexOfFirstPayment,
    indexOfLastPayment,
  );
  const totalPages = Math.ceil(paymentHistory.length / itemPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentpage(page);
    }
  };

  useEffect(() => {
    dispatch(getAllPayments()).unwrap();
  }, [dispatch]);

  if (paymentHistory.length === 0) {
    return (
      <ContainerData pagename={t("paymentHistory")}>
        <p>{t("noPaymentHistory")}</p>
      </ContainerData>
    );
  }
  const filteredHistory = Array.isArray(currentPayments)
    ? currentPayments.filter((payment) =>
        payment.createdBy.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  return (
    <ContainerData
      value={searchTerm}
      pagename={t("paymentHistory")}
      onChange={(e) => setSearchTerm(e.target.value)}
    >
      <div className="layout-table">
        <table className="table-container-list">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th className="align-header">
                {t("dateAndTime")} <Icon icon="octicon:triangle-down-16" />
              </th>
              <th className="align-header">
                {t("products")} <Icon icon="octicon:triangle-down-16" />
              </th>
              <th className="align-header">
                {t("createdBy")} <Icon icon="octicon:triangle-down-16" />
              </th>
              <th className="align-header">
                {t("role")} <Icon icon="octicon:triangle-down-16" />
              </th>
              <th className="align-header">
                {t("status")} <Icon icon="octicon:triangle-down-16" />
              </th>
              <th className="button-section-action">{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((history) => (
              <tr key={history._id} className="history-list">
                <td>
                  <input type="checkbox" />
                </td>
                <td className="table-data">
                  <img
                    width={50}
                    src={`${serviceURL}/${history.products.productImage}`}
                    alt=""
                  />
                  {new Date(history.createdAt).toLocaleString()}
                </td>
                <td>{history.products.name}</td>
                <td>{history.createdBy.name}</td>
                <td>{history.createdBy.role || "N/A"}</td>
                <td>
                  <div className="status-banner">
                    {history.status.toLowerCase()}
                  </div>
                </td>
                <td>
                  <div className="button-section-wrapper">
                    <div className="button-section">
                      <button className="button-action view">
                        <Icon width={20} icon="hugeicons:view" />
                      </button>
                      <button className="button-action edit" onClick={() => {}}>
                        <Icon width={20} icon="uil:edit" />
                      </button>
                      <button
                        className="button-action delete"
                        onClick={() => {}}
                      >
                        <Icon
                          width={20}
                          icon="material-symbols:delete-outline"
                        />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <div className="button">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentpage - 1)}
              disabled={currentpage === 1}
            >
              <Icon icon="iconamoon:arrow-left-2-bold" />
            </button>
            <span>
              {t("page")} {currentpage} {t("of")} {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentpage + 1)}
              disabled={currentpage === totalPages}
            >
              <Icon icon="iconamoon:arrow-right-2-bold" />
            </button>
          </div>
        </div>
      </div>
    </ContainerData>
  );
};

export default PaymentHistory;
