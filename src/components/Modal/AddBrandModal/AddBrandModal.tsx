import React, { useState } from "react";
import SmallModal from "../ModalSmall/SmallModal";
import CustomInput from "../../Input/Input";
import { useTranslation } from "react-i18next";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import { createBrand } from "../../../features/ProductSlice";

const AddBrandModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("");
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const brandData = {
      name,
      prefix,
      addedBy: currentUser._id,
    };

    console.log("Submitting brand data:", brandData);

    dispatch(createBrand(brandData));
    onClose();
  };

  return (
    <SmallModal header={t("addBrand")} onClose={onClose}>
      <div className="modal-wrapper">
        <form onSubmit={handleSubmit} className="from-input">
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
            <button className="btn white" type="button" onClick={onClose}>
              {t("discard")}
            </button>
          </div>
        </form>
      </div>
    </SmallModal>
  );
};

export default AddBrandModal;
