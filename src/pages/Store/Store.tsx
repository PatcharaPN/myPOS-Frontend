/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import "./Store.scss";
import ContainerData from "../../components/ContainerData/ContainerData";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { deleteStore, getAllStore } from "../../features/StoreSlice";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import AddStoreModal from "../../components/Modal/AddStoreModal/AddStoreModal";
import TableHeaderIcon from "../../components/TableHeaderIcon/TableHeaderIcon";
import ActionButton from "../../components/ActionButton/ActionButton";
import CheckBox from "../../components/CheckBox/CheckBox";
import { handleCheckAll } from "../../utils/handleCheckbox";
import { handleSingleCheck } from "../../utils/handleSingleCheck";

const Store = () => {
  const { t } = useTranslation(); // Get translation function
  const store = useAppSelector((state: RootState) => state.store.store);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useAppDispatch();
  const [currentpage, setCurrentpage] = useState<number>(1);
  const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;
  const itemPerPage = 7;
  const [selectedItem, setSelectedItem] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const indexOfLastPayment = currentpage * itemPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemPerPage;
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = useCallback((currentProductId: string) => {
    setSelectedStore(currentProductId);
    setIsEdit(true);
    setOpenModal(true);
  }, []);
  const handleAddStore = useCallback(() => {
    setIsEdit(false);
    setOpenModal(true);
  }, []);
  useEffect(() => {
    dispatch(getAllStore());
  }, [dispatch]);
  const filteredStore = Array.isArray(store)
    ? store.filter((str) => {
        if (!str || !str.storename) {
          return false;
        }
        return str.storename.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];
  const handleCheckMany = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckAll(e, currentStore, setSelectedItem);
  };
  const currentStore = store.slice(indexOfFirstPayment, indexOfLastPayment);
  const handleCheck = (id: string) => {
    handleSingleCheck(id, setSelectedItem);
  };

  const deleteStoreById = async (storeId: string) => {
    try {
      const result = await dispatch(deleteStore(storeId));
      if (deleteStore.fulfilled.match(result)) {
        await dispatch(getAllStore());
      }
    } catch (error) {
      console.error("error while delete store", error);
    }
  };
  return (
    <div>
      <ContainerData
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        pagename={t("store")}
        Canadd={true}
        onClickAdd={handleAddStore}
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
                    <CheckBox
                      onChange={handleCheckMany}
                      checked={selectedItem.size === currentStore.length}
                    />
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
                      <CheckBox
                        onChange={() => handleCheck(items._id)}
                        checked={selectedItem.has(items._id)}
                      />
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
                            onClick={() => handleEdit(items._id)}
                          />
                          <ActionButton
                            icon="material-symbols:delete-outline"
                            className={"delete"}
                            onClick={() => deleteStoreById(items._id)}
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
      {openModal && (
        <AddStoreModal
          onClose={() => setOpenModal(false)}
          isEdit={isEdit}
          storeId={selectedStore}
        />
      )}
    </div>
  );
};

export default Store;
