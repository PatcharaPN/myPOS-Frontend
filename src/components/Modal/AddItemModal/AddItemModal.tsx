/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import CustomInput from "../../Input/Input";
import { t } from "i18next";
import CurrencyInput from "../../Input/CurrencyInput/CurrencyInput";
import TextAreaInput from "../../Input/Description/Description";
import Longinput from "../../Input/LongInput/Longinput";
import { getCategory } from "../../../features/CategorySlice";
import { getPrice } from "../../../features/PriceSlice";
import {
  addItem,
  getAllProducts,
  getBrand,
} from "../../../features/ProductSlice";
import { getAllStore } from "../../../features/StoreSlice";
import { getAllUnit } from "../../../features/UnitSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import SelectInput from "../../Input/Selecter/Selecter";

export const unitType: WeightUnit[] = [{ value: "Pcs", label: "Pcs" }];

export const allweightUnit: WeightUnit[] = [
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
  { value: "lb", label: "lb" },
  { value: "oz", label: "oz" },
];
interface AddItemModalProp {
  onCloseModal: () => void;
}
interface WeightUnit {
  value: string;
  label: string;
}

const AddItemModal = ({ onCloseModal }: AddItemModalProp) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser,
  );
  const store = useAppSelector((state: RootState) => state.store.store);
  const category = useAppSelector(
    (state: RootState) => state.category.category,
  );
  const brand = useAppSelector((state: RootState) => state.product.brand);
  const [available] = useState("1");
  const [image, setImage] = useState<File | null>(null);
  const [itemName, setItemName] = useState("");
  const [sku, setSku] = useState("");
  const [unit, setUnit] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [weightUnit, setweightUnit] = useState("");
  const [weight, setweight] = useState("");
  const currentcy = useAppSelector((state: RootState) => state.price.price);
  const [stock] = useState("");
  const [categoryType, setcategoryType] = useState("");
  const [manufacturer, setmanufacturer] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [currency, setCurrency] = useState("");
  // const [currentProduct, setcurrentProduct] = useState<Product | any>();

  const unitOption = unitType.map((unit) => ({
    value: unit.value || "",
    label: unit.label || "Unnamed Price",
  }));
  const categoryOption = category.map((cat) => ({
    value: cat._id || "",
    label: cat.name || "Unnamed Price",
  }));

  const currencyOption = currentcy.map((cur) => ({
    value: cur.unit || "",
    label: cur.unit || "Unnamed Price",
  }));
  const brandOptions = brand.map((brand) => ({
    value: brand._id || "",
    label: brand.name || "Unnamed Brand",
  }));

  const storeOptions = store.map((store) => ({
    value: store._id || "",
    label: store.storename || "Unnamed Store",
  }));

  useEffect(() => {
    const fetchData = () => {
      dispatch(getAllProducts());
      dispatch(getAllUnit());
      dispatch(getAllStore());
      dispatch(getPrice());
      dispatch(getBrand());
      dispatch(getCategory());
      dispatch(getPrice());
    };
    fetchData();
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedStore);
    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("unit", unit);
    formData.append("sku", sku);
    formData.append("store", selectedStore);
    formData.append("weight", weight);
    formData.append("weightunit", weightUnit);
    formData.append("category", categoryType);
    formData.append("brand", selectedBrand);
    formData.append("price", priceValue);
    formData.append("priceunit", currency);
    formData.append("manufacturer", manufacturer);
    formData.append("stock", stock);
    formData.append("available", available);
    formData.append("createdBy", currentUser._id);
    if (image) {
      formData.append("productImage", image);
    }

    try {
      const result = await dispatch(addItem(formData)).unwrap();
      console.log(result);
      // setOpenModel(false);
      onCloseModal();
      dispatch(getAllProducts());
    } catch (error) {
      console.error("Error adding item", error);
    }
  };

  // const handleCloseModal = () => {
  //   setOpenModel(false);
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.size > 15000000) {
        alert("File size should be less than 15MB.");
        return;
      }
      setImage(file);
    }
  };

  // onClose={handleCloseModal}
  return (
    <Modal>
      <div className="additem-content">
        <div className="additem-topmenu">
          <h2 style={{ fontWeight: "bold" }}>{t("newItem")}</h2>
        </div>
        <div className="additem-form">
          <form className="additems-grid">
            <div className="create-iten-input">
              <div className="option-1">
                <div className="name-unit">
                  <div className="input-name-section">
                    <div className="image-drag-wrapper">
                      <div className="image-upload-section">
                        <div className="image-input-border">
                          <div className="upload-text">
                            <p>Drag image here</p> <br /> <p>or</p> <br />{" "}
                            <p style={{ color: "#7F5AF0" }}>Browse Image</p>
                          </div>
                          <input type="file" onChange={handleFileChange} />
                        </div>
                        <p style={{ fontWeight: "500" }}>File (Max: 15MB)</p>
                      </div>
                    </div>{" "}
                    <div className="additem-input-form">
                      <div className="section-left">
                        <CustomInput
                          required={true}
                          label={"Name*"}
                          value={itemName}
                          placeholder="Name"
                          onChange={(e) => setItemName(e.target.value)}
                        />{" "}
                        <SelectInput
                          label={"Unit"}
                          options={unitOption}
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          placeholder={"Select unit"}
                        />{" "}
                        <CustomInput
                          required={false}
                          label={"SKU"}
                          value={sku}
                          placeholder="Enter SKU"
                          onChange={(e) => setSku(e.target.value)}
                        />{" "}
                        <SelectInput
                          label={"Store"}
                          options={storeOptions}
                          value={selectedStore}
                          onChange={(e) => setSelectedStore(e.target.value)}
                          placeholder={"Select Store"}
                        />
                        <Longinput
                          currency={""}
                          amount={weight}
                          label={"Weight"}
                          value={weightUnit}
                          options={allweightUnit}
                          onChange={(e) => setweightUnit(e.target.value)} // For the unit selector
                          onChangeText={(e) => setweight(e.target.value)} // For the actual weight input
                        />
                        <CustomInput
                          required={false}
                          label={"Manufacturer"}
                          value={manufacturer}
                          placeholder="Enter manufacturer name"
                          onChange={(e) => setmanufacturer(e.target.value)}
                        />
                      </div>
                      <div className="section-right">
                        <SelectInput
                          label={"Taxes"}
                          options={categoryOption}
                          value={categoryType}
                          onChange={(e) => setcategoryType(e.target.value)}
                          placeholder={"Price Type"}
                        />
                        <SelectInput
                          label={"Brand"}
                          options={brandOptions}
                          value={selectedBrand}
                          onChange={(e) => setSelectedBrand(e.target.value)}
                          placeholder={"Select Brand"}
                        />
                        <SelectInput
                          label={"Category"}
                          options={categoryOption}
                          value={categoryType}
                          onChange={(e) => setcategoryType(e.target.value)}
                          placeholder={"Price Type"}
                        />
                        <CurrencyInput
                          currency={currentcy[0]?.unit || ""}
                          options={currencyOption}
                          value={currency}
                          amount={priceValue}
                          label={"Sales Price"}
                          onChange={(e) => {
                            setCurrency(e.target.value);
                          }}
                          onChangeText={(e) => {
                            setPriceValue(e.target.value);
                          }}
                        />
                        <SelectInput
                          label={"Taxes"}
                          options={categoryOption}
                          value={categoryType}
                          onChange={(e) => setcategoryType(e.target.value)}
                          placeholder={"Price Type"}
                        />
                        <TextAreaInput label={"Description"} value={""} />
                      </div>
                    </div>
                    <div className="btn-section">
                      <button className="btn" onClick={handleSubmit}>
                        Save
                      </button>
                      <button className="btn white" onClick={onCloseModal}>
                        Discard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddItemModal;
