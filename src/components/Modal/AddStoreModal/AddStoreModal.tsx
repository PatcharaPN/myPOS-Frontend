import { useState } from "react";
import "./AddStoreModal.scss";
import CustomInput from "../../Input/Input";
import SmallModal from "../ModalSmall/SmallModal";
import { useTranslation } from "react-i18next";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import { createStore, getAllStore } from "../../../features/StoreSlice";

const AddStoreModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation(); // Get translation function
  const dispatch = useAppDispatch();
  const [storename, setStoreName] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [file, setFile] = useState<File | null>(null);
  const MAX_FILE_SIZE = 15000000;
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser,
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!storename || !location) {
      alert("Field cannot be empty");
      return;
    }

    setIsSubmitting(true);
    const storeData = {
      storename,
      location,
      storeImage: file,
      owner: currentUser._id,
    };

    await dispatch(createStore(storeData))
      .then(() => {
        setStoreName("");
        setLocation("");
        setFile(null);
        setIsSubmitting(false);
        onClose();
      })
      .catch(() => {
        alert("Submit failed");
        setIsSubmitting(false);
      });
    dispatch(getAllStore());
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > MAX_FILE_SIZE) {
        alert("File too large");
        onClose();
        setFile(null);
        return;
      }
      setFile(file);
      console.log(file);
    }
  };
  return (
    <SmallModal header={""} onClose={onClose}>
      <div className="additem-content">
        <div className="additem-topmenu">
          <h2 style={{ fontWeight: "bold" }}>{t("newStore")}</h2>
        </div>
        <div className="additem-form">
          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="store-img">
              <input type="file" onChange={handleFileChange} />
            </div>
            <div className="form-layout">
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
            </div>
            <div className="btn-section">
              <button
                className="btn-small"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("saving") : t("save")}
              </button>
              <button className="btn-small white" onClick={onClose}>
                {t("discard")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </SmallModal>
  );
};

export default AddStoreModal;
