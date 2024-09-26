import React, { useEffect, useState } from "react";
import "./Category.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { createCategory, getCategory } from "../../features/CategorySlice";
import ContainerData from "../../components/ContainerData/ContainerData";
import SmallModal from "../../components/Modal/ModalSmall/SmallModal";
import CustomInput from "../../components/Input/Input";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import AddCategoryModal from "../../components/Modal/AddCategoryModal/AddCategoryModal";
import { handleSingleCheck } from "../../utils/handleSingleCheck";
import CheckBox from "../../components/CheckBox/CheckBox";
import { handleCheckAll } from "../../utils/handleCheckbox";

const Category = () => {
  const { t } = useTranslation(); // Destructure t from useTranslation
  const category = useAppSelector(
    (state: RootState) => state.category.category
  );
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerPage = 7;
  const [selectedItem, setSelectedItem] = useState<Set<string>>(new Set());
  const IndexOfLastItem = currentPage * itemPerPage;
  const IndexOfFirstItem = IndexOfLastItem - itemPerPage;
  const currentItem = category.slice(IndexOfFirstItem, IndexOfLastItem);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const filterdCategory = category.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleCheck = (id: string) => {
    handleSingleCheck(id, setSelectedItem);
  };
  const handleCheckMany = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckAll(e, currentItem, setSelectedItem);
  };
  return (
    <ContainerData
      onChange={(e) => setSearchTerm(e.target.value)}
      pagename={t("category")}
      Canadd={true}
      onClickAdd={handleOpenModal}
    >
      {isModalOpen ? <AddCategoryModal onClose={handleCloseModal} /> : null}
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
                <CheckBox
                  onChange={() => handleCheck(cat._id)}
                  checked={selectedItem.has(cat._id)}
                />
              </td>
              <td className="table-data">{cat.name ?? ""}</td>
              <td>{cat?.productCount ?? "N/A"}</td>
              <td>{cat?.createdBy?.name ?? ""}</td>
              <td>{cat?.createdBy?.role ?? ""}</td>{" "}
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
