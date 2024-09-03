import React, { useEffect, useState } from "react";
import "./Category.scss";
import Divider from "../../components/Divider/Divider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { createCategory, getCategory } from "../../features/CategorySlice";
import ContainerData from "../../components/ContainerData/ContainerData";
import SmallModal from "../../components/Modal/ModalSmall/SmallModal";
import CustomInput from "../../components/Input/Input";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Category = () => {
  const { t } = useTranslation(); // Destructure t from useTranslation
  const category = useAppSelector(
    (state: RootState) => state.category.category
  );
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData = {
      name,
      description,
      createdBy: currentUser._id,
    };
    dispatch(createCategory(categoryData));
    setIsModalOpen(false);
  };
  const filterdCategory = category.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <ContainerData
      onChange={(e) => setSearchTerm(e.target.value)}
      pagename={t("category")}
      Canadd={true}
      onClickAdd={handleOpenModal}
    >
      {isModalOpen ? (
        <SmallModal header={""} onClose={handleCloseModal}>
          <h2 style={{ fontWeight: "bold", marginBottom: "40px" }}>
            {t("newCategory")}
          </h2>
          <CustomInput
            label={t("name")}
            placeholder={t("insertName")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomInput
            label={t("description")}
            placeholder={t("insertDescription")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="additem-content">
            <div className="btn-section">
              <button className="btn" onClick={handleSubmit}>
                {t("save")}
              </button>
              <button className="btn white" onClick={handleCloseModal}>
                {t("discard")}
              </button>
            </div>
          </div>
        </SmallModal>
      ) : null}
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="" id="" />
            </th>
            <th className="align-header">
              {t("categoryName")} <Icon icon="octicon:triangle-down-16" />
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
            <th className="button-section">{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {filterdCategory.map((cat) => (
            <tr key={cat._id}>
              <td>
                <input type="checkbox" />
              </td>
              <td className="table-data">{cat.name}</td>
              <td>{cat.productCount}</td>
              <td>{cat.createdBy.name}</td>
              <td>{cat.createdBy.role}</td>
              <td className="button-section">
                <button className="button-action view">
                  <Icon width={20} icon="hugeicons:view" />
                </button>
                <button className="button-action edit">
                  <Icon width={20} icon="uil:edit" />
                </button>
                <button className="button-action delete" onClick={() => {}}>
                  <Icon width={20} icon="material-symbols:delete-outline" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ContainerData>
  );
};

export default Category;
