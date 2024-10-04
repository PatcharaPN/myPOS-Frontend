import React, { useEffect, useState } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { motion } from "framer-motion";
import { createPrice, getPrice } from "../../features/PriceSlice";
import SmallModal from "../../components/Modal/ModalSmall/SmallModal";
import CustomInput from "../../components/Input/Input";
import { useTranslation } from "react-i18next"; // Import the hook
import { handleSingleCheck } from "../../utils/handleSingleCheck";
import CheckBox from "../../components/CheckBox/CheckBox";
import { handleCheckAll } from "../../utils/handleCheckbox";

const PriceType = () => {
  const { t } = useTranslation(); // Destructure t from useTranslation hook
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<Set<string>>(new Set());
  const itemPerPage = 7;
  const indexOfLastItem = currentPage * itemPerPage;
  const itemOfFirstItem = indexOfLastItem - itemPerPage;
  const price = useAppSelector((state: RootState) => state.price.price);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [pricename, setPricename] = useState("");
  const [priceUnit, setPriceUnit] = useState("");
  const currentItem = price.slice(itemOfFirstItem, indexOfLastItem);
  const [description, setDescription] = useState("");
  useEffect(() => {
    dispatch(getPrice());
  }, []);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handldeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const priceData = {
      name: pricename,
      unit: priceUnit,
      description,
      addedBy: currentUser._id,
    };
    dispatch(createPrice(priceData));
    setOpenModal(false);
  };
  const handleCheck = (id: string) => {
    handleSingleCheck(id, setSelectedItem);
  };
  const handleCheckMany = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckAll(e, currentItem, setSelectedItem);
  };
  const filteredPrice = price.filter((price) =>
    price.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <ContainerData
        pagename={t("priceList")}
        Canadd
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClickAdd={handleOpenModal}
      >
        <div className="item-list-wrapper">
          {price.length === 0 ? (
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
                      checked={selectedItem.size === currentItem.length}
                    />
                  </th>
                  <th className="align-header">
                    {t("priceUnit")} <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    {t("priceName")} <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    {t("description")} <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    {t("addedBy")} <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="button-section-action">{t("action")}</th>
                </tr>
              </thead>
              <tbody className="content-wrapper">
                {filteredPrice.map((price) => (
                  <motion.tr
                    whileHover={{
                      scale: 1.005,
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                    }}
                    key={price._id}
                  >
                    <td>
                      <CheckBox
                        onChange={() => handleCheck(price._id)}
                        checked={selectedItem.has(price._id)}
                      />
                    </td>
                    <td>{price.unit}</td>
                    <td>{price.name}</td>
                    <td>{price.description}</td>
                    <td>{price.addedBy?.name}</td>

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
                  value={pricename}
                  onChange={(e) => setPricename(e.target.value)}
                />
                <CustomInput
                  label={t("unit")}
                  value={priceUnit}
                  onChange={(e) => setPriceUnit(e.target.value)}
                />
                <CustomInput
                  label={t("description")}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="btn-section">
            <button className="btn" onClick={handldeSubmit}>
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

export default PriceType;
