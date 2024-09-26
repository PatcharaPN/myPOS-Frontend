import React, { useEffect, useState } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { createBrand, getBrand } from "../../features/ProductSlice";
import CustomInput from "../../components/Input/Input";
import SmallModal from "../../components/Modal/ModalSmall/SmallModal";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import "./Brand.scss";
import { handleCheckAll } from "../../utils/handleCheckbox";
import CheckBox from "../../components/CheckBox/CheckBox";
import { handleSingleCheck } from "../../utils/handleSingleCheck";
import AddBrandModal from "../../components/Modal/AddBrandModal/AddBrandModal";

const BrandPage = () => {
  const { t } = useTranslation(); // Get translation function

  const brand = useAppSelector((state: RootState) => state.product.brand);

  const itemPerPage = 7;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const indexOfLastItem = currentPage * itemPerPage;
  const [selectedItem, setSelectedItem] = useState<Set<string>>(new Set());
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = brand.slice(indexOfFirstItem, indexOfLastItem);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const filteredBrand = brand.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleCheck = (id: string) => {
    handleSingleCheck(id, setSelectedItem);
  };
  const handleCheckMany = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckAll(e, currentItem, setSelectedItem);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <ContainerData
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      pagename={t("brand")}
      Canadd={true}
      onClickAdd={handleOpenModal}
    >
      {/*Modal*/}
      {isModalOpen && <AddBrandModal onClose={handleCloseModal} />}
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
                  <CheckBox
                    onChange={handleCheckMany}
                    checked={selectedItem.size === currentItem.length}
                  />
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
                    <CheckBox
                      onChange={() => handleCheck(brand._id)}
                      checked={selectedItem.has(brand._id)}
                    />
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
