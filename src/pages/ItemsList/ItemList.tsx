/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import "./ItemList.scss";
import { Icon } from "@iconify/react/dist/iconify.js";

import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { deleteOne } from "../../features/ProductSlice";
import { motion } from "framer-motion";
import ContainerData from "../../components/ContainerData/ContainerData";
import { useTranslation } from "react-i18next";
import AddItemModal from "../../components/Modal/AddItemModal/AddItemModal";
import Pagination from "../../components/Pagination/Pagination";

const ItemList = () => {
  //const unitType = useAppSelector((state: RootState) => state.unit.unit);
  const products = useAppSelector((state: RootState) => state.product.products);

  const dispatch = useAppDispatch();
  const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;

  const [currentpage, setCurrentpage] = useState<number>(1);
  const itemPerPage = 7;
  const [openModel, setOpenModel] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Set<string>>(new Set());
  const indexOfLastPayment = currentpage * itemPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemPerPage;
  const [searchTerm, setSerchTerm] = useState("");
  const currentProducts = products.slice(
    indexOfFirstPayment,
    indexOfLastPayment,
  );

  const { t } = useTranslation();

  const handleDeleteProduct = async (productId: string) => {
    console.log("Deleting product with ID:", productId);

    try {
      await dispatch(deleteOne(productId)).unwrap();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  // const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   setweight(e.target.value);
  // };

  const handleOpenModal = () => {
    setOpenModel(!openModel);
  };
  const totalPages = Math.ceil(products.length / itemPerPage);
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentpage(page);
    }
  };
  // const handleOpenEditModal = (id: string) => {
  //   fetchCurrentProduct(id);
  //   console.log(id);
  //   setEditModal(true);
  // };

  // const handleCloseEditModal = () => {
  //   setEditModal(false);
  //   setcurrentProduct(null);
  // };

  // const fetchCurrentProduct = useCallback(async (id: string) => {
  //   try {
  //     const response = await axios.get(`${serviceURL}/api/products/${id}`);
  //     console.log(response.data);
  //     setcurrentProduct(response.data);
  //   } catch (err) {
  //     throw new Error("Failed to get Prodeuct");
  //   } finally {
  //     console.log("Fetch complete");
  //   }
  // }, []);
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
    <div className="content-form-wrapper">
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
                              onClick={() => {}}
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
          <Pagination
            currentPage={currentpage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </ContainerData>{" "}
      {openModel ? (
        <AddItemModal onCloseModal={() => setOpenModel(!openModel)} />
      ) : null}
    </div>
  );
};

export default ItemList;
