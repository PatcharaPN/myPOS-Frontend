/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import "./ItemList.scss";
import { Icon } from "@iconify/react/dist/iconify.js";

import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import {
  addItem,
  deleteOne,
  getAllProducts,
  getBrand,
} from "../../features/ProductSlice";
import { motion } from "framer-motion";
import ContainerData from "../../components/ContainerData/ContainerData";
import CustomInput from "../../components/Input/Input";
import SelectInput from "../../components/Input/Selecter/Selecter";
import { getCategory } from "../../features/CategorySlice";
import { getPrice } from "../../features/PriceSlice";
import { getAllStore } from "../../features/StoreSlice";

import Modal from "../../components/Modal/Modal";
import TextAreaInput from "../../components/Input/Description/Description";
import CurrencyInput from "../../components/Input/CurrencyInput/CurrencyInput";
import Longinput from "../../components/Input/LongInput/Longinput";
import { getAllUnit } from "../../features/UnitSlice";
import { Product } from "../../types/interface";
import axios from "axios";
import { useTranslation } from "react-i18next";
interface WeightUnit {
  value: string;
  label: string;
}

export const unitType: WeightUnit[] = [{ value: "Pcs", label: "Pcs" }];

export const allweightUnit: WeightUnit[] = [
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
  { value: "lb", label: "lb" },
  { value: "oz", label: "oz" },
];
const ItemList = () => {
  const [EditModal, setEditModal] = useState(false);
  //const unitType = useAppSelector((state: RootState) => state.unit.unit);
  const products = useAppSelector((state: RootState) => state.product.products);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser,
  );

  const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;
  const store = useAppSelector((state: RootState) => state.store.store);
  const category = useAppSelector(
    (state: RootState) => state.category.category,
  );
  const brand = useAppSelector((state: RootState) => state.product.brand);

  const [itemName, setItemName] = useState("");
  const [sku, setSku] = useState("");
  const [unit, setUnit] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [weightUnit, setweightUnit] = useState("");
  const [weight, setweight] = useState("");
  const [stock, setStock] = useState("");
  const [currentpage, setCurrentpage] = useState<number>(1);
  const itemPerPage = 7;
  const [available] = useState("1");
  const [categoryType, setcategoryType] = useState("");
  const [manufacturer, setmanufacturer] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [OpenModel, setOpenModel] = useState(false);
  const [currency, setCurrency] = useState("");
  const [currentProduct, setcurrentProduct] = useState<Product | any>();
  const currentcy = useAppSelector((state: RootState) => state.price.price);
  const [selectedItem, setSelectedItem] = useState<Set<string>>(new Set());
  const indexOfLastPayment = currentpage * itemPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemPerPage;
  const [searchTerm, setSerchTerm] = useState("");
  const currentProducts = products.slice(
    indexOfFirstPayment,
    indexOfLastPayment,
  );
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllUnit());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllStore());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPrice());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPrice());
  }, [dispatch]);
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
  const { t } = useTranslation();
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
      setOpenModel(false);
      dispatch(getAllProducts());
    } catch (error) {
      console.error("Error adding item", error);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };
  const handleDeleteProduct = async (productId: string) => {
    console.log("Deleting product with ID:", productId);

    try {
      await dispatch(deleteOne(productId)).unwrap();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.value);
    setweight(e.target.value);
  };

  const handleCloseModal = () => {
    setOpenModel(false);
  };
  const handleOpenModal = () => {
    setOpenModel(!OpenModel);
  };
  const totalPages = Math.ceil(products.length / itemPerPage);
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentpage(page);
    }
  };
  const handleOpenEditModal = (id: string) => {
    fetchCurrentProduct(id);
    console.log(id);
    setEditModal(true);
  };
  const handleCloseEditModal = () => {
    setEditModal(false);
    setcurrentProduct(null);
  };
  const fetchCurrentProduct = useCallback(async (id: string) => {
    try {
      const response = await axios.get(`${serviceURL}/api/products/${id}`);
      console.log(response.data);
      setcurrentProduct(response.data);
    } catch (err) {
      throw new Error("Failed to get Prodeuct");
    } finally {
      console.log("Fetch complete");
    }
  }, []);
  const filteredProducts = currentProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const newSelectedItems = new Set<string>();

    if (checked) {
      currentProducts.forEach((product) => newSelectedItems.add(product._id));
    }
    setSelectedItem(newSelectedItems);
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const newSelectedItems = new Set(selectedItem);

    if (checked) {
      newSelectedItems.add(id);
    } else {
      newSelectedItems.delete(id);
    }
    setSelectedItem(newSelectedItems);
  };
  return (
    <div>
      <ContainerData
        value={searchTerm}
        onChange={(e) => setSerchTerm(e.target.value)}
        pagename={t("Item")}
        path="/Item/AddItem"
        Canadd={true}
        onClickAdd={handleOpenModal}
      >
        <div className="layout-table">
          <div className="item-list-wrapper">
            {products.length === 0 ? (
              <div className="empty-img">
                <img
                  width={450}
                  src="/assets/undraw_empty_re_opql.svg"
                  alt="Empty"
                />
                <h2 className="text-alert">
                  Oops! Your inventory is empty. Try to adding new items.
                </h2>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        onChange={handleCheckAll}
                        checked={selectedItem.size === currentProducts.length}
                      />
                    </th>
                    <th className="align-header">
                      {t("productName")}{" "}
                      <Icon icon="octicon:triangle-down-16" />
                    </th>
                    <th className="align-header">
                      {t("productID")} <Icon icon="octicon:triangle-down-16" />
                    </th>
                    <th className="align-header">
                      {t("category")} <Icon icon="octicon:triangle-down-16" />
                    </th>
                    <th className="align-header">
                      {t("addedBy")} <Icon icon="octicon:triangle-down-16" />
                    </th>
                    <th className="align-header">
                      {t("available")} <Icon icon="octicon:triangle-down-16" />
                    </th>
                    <th className="align-header">
                      {t("reserved")} <Icon icon="octicon:triangle-down-16" />
                    </th>
                    <th className="align-header">
                      {t("stock")} <Icon icon="octicon:triangle-down-16" />
                    </th>
                    <th className="button-section">{t("action")}</th>
                  </tr>
                </thead>
                <tbody className="content-wrapper">
                  {filteredProducts.map((product) => (
                    <motion.tr
                      className="hover"
                      whileHover={{
                        scale: 1.005,
                        transition: {
                          duration: 0.3,
                          ease: "easeInOut",
                        },
                      }}
                      key={product._id}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedItem.has(product._id)}
                          onChange={(e) =>
                            handleCheckboxChange(product._id, e.target.checked)
                          }
                        />
                      </td>
                      <td className="table-data">
                        <img
                          width={50}
                          height={50}
                          src={`${serviceURL}/${product.productImage}`}
                        />
                        {product.name}
                      </td>
                      <td>{product.productID || ""}</td>
                      <td>{product.category?.name}</td>
                      <td>{product.createdBy?.name}</td>
                      <td>{product.available}</td>
                      <td>{product.reserved}</td>
                      <td>{product.stock}</td>
                      <td>
                        <div className="button-section-wrapper">
                          <div className="button-section">
                            <button className="button-action view">
                              <Icon width={20} icon="hugeicons:view" />
                            </button>
                            <button
                              className="button-action edit"
                              onClick={() => handleOpenEditModal(product._id)}
                            >
                              <Icon width={20} icon="uil:edit" />
                            </button>
                            <button
                              className="button-action delete"
                              onClick={() => handleDeleteProduct(product._id)}
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
          <div className="pagination">
            <div className="button">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentpage - 1)}
                disabled={currentpage === 1}
              >
                <Icon icon="iconamoon:arrow-left-2-bold" />
              </button>
              <span>
                {currentpage} of {totalPages}
              </span>
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentpage + 1)}
                disabled={currentpage === totalPages}
              >
                <Icon icon="iconamoon:arrow-right-2-bold" />
              </button>
            </div>
          </div>
        </div>
      </ContainerData>{" "}
      {OpenModel ? (
        <Modal header={""} onClose={handleCloseModal}>
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
                        <div className="btn-section">
                          <button className="btn" onClick={handleSubmit}>
                            Save
                          </button>
                          <button
                            className="btn white"
                            onClick={handleCloseModal}
                          >
                            Discard
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<Longinput
                      currency={""}
                      amount={""}
                      label={""}
                      value={""}
                      options={[]}
                      onChange={function (
                        e: React.ChangeEvent<HTMLSelectElement>
                      ): void {
                        throw new Error("Function not implemented.");
                      }}
                      onChangeText={function (
                        e: React.ChangeEvent<HTMLInputElement>
                      ): void {
                        throw new Error("Function not implemented.");
                      }}
                    />*/}
                </div>
              </form>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default ItemList;
