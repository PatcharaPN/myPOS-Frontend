import React, { useEffect, useState } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import { Icon } from "@iconify/react";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { motion } from "framer-motion";
import { getHistory } from "../../features/AuthSlice";
import { useTranslation } from "react-i18next";

const LoginHistory = () => {
  const { t } = useTranslation();
  const loginHistory = useAppSelector(
    (state: RootState) => state.auth.loginHistory
  );
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  const itemPerPage = 7;
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = loginHistory.slice(indexOfFirstItem, indexOfLastItem);

  const filteredUser = currentItem.filter((user) =>
    user.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <ContainerData
      pagename={t("loginHistory")}
      value={searchTerm}
      onChange={handleSearchChange}
    >
      <div className="item-list-wrapper">
        {filteredUser.length === 0 ? (
          <div className="empty-img">
            <img
              width={450}
              src="/assets/undraw_empty_re_opql.svg"
              alt={t("emptyInventoryMessage")}
            />
            <h2 className="text-alert">{t("emptyInventoryMessage")}</h2>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" aria-label={t("selectAll")} />
                </th>
                <th className="align-header" scope="col">
                  {t("loginTime")}
                </th>
                <th className="align-header" scope="col">
                  {t("ipAddress")}
                </th>
                <th className="align-header" scope="col">
                  {t("username")}
                </th>
                <th className="align-header" scope="col">
                  {t("userRole")}
                </th>
                <th className="button-section" scope="col">
                  {t("action")}
                </th>
              </tr>
            </thead>
            <tbody className="content-wrapper">
              {filteredUser.map((history) => {
                const loginDate = new Date(history.loginTime);

                return (
                  <motion.tr
                    whileHover={{
                      scale: 1.005,
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                    }}
                    key={`${history.userId}-${history.loginTime}`}
                  >
                    <td>
                      <input type="checkbox" aria-label={t("selectRow")} />
                    </td>
                    <td>
                      {loginDate.toLocaleDateString()}{" "}
                      {loginDate.toLocaleTimeString()}
                    </td>
                    <td>{history.ipAddress}</td>
                    <td>{history.user.username}</td>
                    <td>{history.user.role}</td>
                    <td>
                      <div className="button-section-wrapper">
                        <div className="button-section">
                          <button className="button-action view">
                            <Icon width={20} icon="hugeicons:view" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </ContainerData>
  );
};

export default LoginHistory;
