import React, { useState } from "react";
import SmallModal from "../ModalSmall/SmallModal";
import CustomInput from "../../Input/Input";
import { useTranslation } from "react-i18next";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import { createCategory } from "../../../features/CategorySlice";

const AddCategoryModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(); // Destructure t from useTranslation
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData = {
      name,
      description,
      createdBy: currentUser._id,
    };
    onClose();
    dispatch(createCategory(categoryData));
  };
  return (
    <SmallModal header={""} onClose={onClose}>
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
          <button className="btn white" onClick={onClose}>
            {t("discard")}
          </button>
        </div>
      </div>
    </SmallModal>
  );
};

export default AddCategoryModal;
