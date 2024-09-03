/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { createStore, getAllStore } from "../../features/StoreSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import TableComponent from "../../components/TableContainer/TableContainer";
import Modal from "../../components/Modal/Modal";
import SelectInput from "../../components/Input/Selecter/Selecter";
import CustomInput from "../../components/Input/Input";
import SmallModal from "../../components/Modal/ModalSmall/SmallModal";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const products: any = [];

const Store = () => {
  const { t } = useTranslation(); // Get translation function

  const store = useAppSelector((state: RootState) => state.store.store);
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser,
  );

  const dispatch = useAppDispatch();
  const [storename, setStoreName] = useState("");
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    dispatch(getAllStore());
  }, [dispatch]);

  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setSelectedItems(() =>
      products.reduce(
        (acc: any, item: any) => {
          acc[item.id] = isChecked;
          return acc;
        },
        {} as { [key: string]: boolean },
      ),
    );
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems, [id]: !prevItems[id] };
      setSelectAll(Object.values(updatedItems).every(Boolean));
      return updatedItems;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storeData = {
      storename,
      location,
      owner: currentUser._id,
    };
    dispatch(createStore(storeData));
  };
  const filteredStore = store.filter((str) =>
    str.storename.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <ContainerData
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        pagename={t("store")}
        Canadd={true}
        onClickAdd={handleOpenModal}
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
                  <th className="align-header">
                    {t("storeName")} <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    {t("location")} <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    {t("addedBy")} <Icon icon="octicon:triangle-down-16" />
                  </th>

                  <th className="button-section">{t("action")}</th>
                </tr>
              </thead>
              <tbody className="content-wrapper">
                {store.map((items, index) => (
                  <motion.tr
                    whileHover={{
                      scale: 1.005,
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                    }}
                    key={`${items._id}-${index}`}
                  >
                    <td>
                      <input type="checkbox" />
                    </td>

                    <td>{items.storename || ""}</td>
                    <td>{items.location}</td>
                    <td>{items.owner?.username}</td>
                    <td>
                      <div className="button-section-wrapper">
                        <div className="button-section">
                          <button className="button-action view">
                            <Icon width={20} icon="hugeicons:view" />
                          </button>
                          <button className="button-action edit">
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
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </ContainerData>
      {openModal ? (
        <SmallModal header={""} onClose={handleCloseModal}>
          <div className="additem-content">
            <div className="additem-topmenu">
              <h2 style={{ fontWeight: "bold" }}>{t("newStore")}</h2>
            </div>
            <div className="additem-form">
              <form className="form-grid">
                <CustomInput
                  label={t("name")}
                  value={storename}
                  onChange={(e) => setStoreName(e.target.value)}
                />
                <CustomInput
                  label={t("address")}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="btn-section">
            <button className="btn" onClick={handleSubmit}>
              {t("save")}
            </button>
            <button className="btn white" onClick={handleCloseModal}>
              {t("discard")}
            </button>
          </div>
        </SmallModal>
      ) : null}
    </div>
  );
};

export default Store;
