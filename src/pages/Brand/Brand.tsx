import React, { useEffect, useState } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { createBrand, getBrand } from "../../features/ProductSlice";
import CustomInput from "../../components/Input/Input";
import SmallModal from "../../components/Modal/ModalSmall/SmallModal";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const BrandPage = () => {
  const { t } = useTranslation(); // Get translation function

  const brand = useAppSelector((state: RootState) => state.product.brand);
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser
  );
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const brandData = {
      name,
      prefix,
      addedBy: currentUser._id,
    };

    console.log("Submitting brand data:", brandData);

    dispatch(createBrand(brandData));
    setIsModalOpen(false);
  };
  const filteredBrand = brand.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <ContainerData
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      pagename={t("brand")}
      Canadd={true}
      onClickAdd={handleOpenModal}
    >
      {isModalOpen && (
        <SmallModal header={t("addBrand")} onClose={handleCloseModal}>
          <div className="modal-wrapper">
            <form onSubmit={handleSubmit}>
              <CustomInput
                label={t("name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <CustomInput
                label={t("prefix")}
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
              />
              <div className="btn-section">
                <button className="btn" type="submit">
                  {t("save")}
                </button>
                <button
                  className="btn white"
                  type="button"
                  onClick={handleCloseModal}
                >
                  {t("discard")}
                </button>
              </div>
            </form>
          </div>
        </SmallModal>
      )}
      <div className="item-list-wrapper">
        {brand.length === 0 ? (
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
                  {t("brand")} <Icon icon="octicon:triangle-down-16" />
                </th>
                <th className="align-header">
                  {t("prefix")} <Icon icon="octicon:triangle-down-16" />
                </th>
                <th className="align-header">
                  {t("description")} <Icon icon="octicon:triangle-down-16" />
                </th>
                <th className="align-header">
                  {t("addedBy")} <Icon icon="octicon:triangle-down-16" />
                </th>
                <th className="align-header">
                  {t("action")} <Icon icon="octicon:triangle-down-16" />
                </th>
              </tr>
            </thead>
            <tbody className="content-wrapper">
              {filteredBrand.map((brand) => (
                <motion.tr
                  whileHover={{
                    scale: 1.005,
                    transition: {
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                  key={brand._id}
                >
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{brand.name}</td>
                  <td>{brand.prefix}</td>
                  <td></td>
                  <td>{brand.addedBy?.username}</td>
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
  );
};

export default BrandPage;
