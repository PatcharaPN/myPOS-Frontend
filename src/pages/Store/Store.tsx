/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import "./Store.scss";
import ContainerData from "../../components/ContainerData/ContainerData";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { getAllStore } from "../../features/StoreSlice";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import AddStoreModal from "../../components/Modal/AddStoreModal/AddStoreModal";
import TableHeaderIcon from "../../components/TableHeaderIcon/TableHeaderIcon";
import ActionButton from "../../components/ActionButton/ActionButton";

const Store = () => {
  const { t } = useTranslation(); // Get translation function
  const store = useAppSelector((state: RootState) => state.store.store);
  const dispatch = useAppDispatch();
  const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = useCallback(() => {
    setOpenModal((prev) => !prev);
  }, []);
  useEffect(() => {
    dispatch(getAllStore());
  }, [dispatch]);
  const filteredStore = store.filter((str) => {
    if (!str || !str.storename) {
      return false; // Skip undefined or missing storename
    }
    return str.storename.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <ContainerData
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        pagename={t("store")}
        Canadd={true}
        onClickAdd={toggleModal}
      >
        <div className="item-list-wrapper">
          {filteredStore.length === 0 ? (
            <div className="empty-img">
              <img
                width={450}
                src="/assets/undraw_empty_re_opql.svg"
                alt="Empty"
              />
              <h2 className="text-alert">{t("emptyInventory")}</h2>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" name="" id="" />
                  </th>
                  <TableHeaderIcon label="storeName" />
                  <TableHeaderIcon label="location" />
                  <TableHeaderIcon label="addedBy" />
                  <th className="button-section">{t("action")}</th>
                </tr>
              </thead>
              <tbody className="content-wrapper">
                {filteredStore.map((items) => (
                  <motion.tr
                    whileHover={{
                      scale: 1.005,
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                    }}
                    key={items._id}
                  >
                    <td>
                      <input type="checkbox" />
                    </td>

                    <td className="table-data">
                      <img
                        className="store-list-img"
                        width={20}
                        src={`${serviceURL}/${items.storeImage}`}
                      />{" "}
                      {items?.storename || ""}
                    </td>
                    <td>{items?.location}</td>
                    <td>{items.owner?.username}</td>
                    <td>
                      <div className="button-section-wrapper">
                        <div className="button-section">
                          <ActionButton
                            icon="hugeicons:view"
                            className={"view"}
                            onClick={() => {}}
                          />
                          <ActionButton
                            icon="uil:edit"
                            className={"edit"}
                            onClick={() => {}}
                          />
                          <ActionButton
                            icon="material-symbols:delete-outline"
                            className={"delete"}
                            onClick={() => {}}
                          />
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </ContainerData>
      {openModal && <AddStoreModal onClose={toggleModal} />}
    </div>
  );
};

export default Store;
