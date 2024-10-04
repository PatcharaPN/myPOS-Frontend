/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import "./ItemList.scss";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { deleteOne, getAllProducts } from "../../features/ProductSlice";
import { motion } from "framer-motion";
import ContainerData from "../../components/ContainerData/ContainerData";
import { useTranslation } from "react-i18next";
import AddItemModal from "../../components/Modal/AddItemModal/AddItemModal";
import Pagination from "../../components/Pagination/Pagination";
import ActionButton from "../../components/ActionButton/ActionButton";
import TableHeaderIcon from "../../components/TableHeaderIcon/TableHeaderIcon";
import CheckBox from "../../components/CheckBox/CheckBox";
import { handleCheckAll } from "../../utils/handleCheckbox";

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
  const fetchAllProducts = useCallback(async () => {
    await dispatch(getAllProducts());
  }, []);
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const { t } = useTranslation();

  const handleDeleteProduct = async (productId: string) => {
    console.log("Deleting product with ID:", productId);

    try {
      await dispatch(deleteOne(productId)).unwrap();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  console.log(products);
  const handleOpenModal = () => {
    setOpenModel(!openModel);
  };
  const totalPages = Math.ceil(products.length / itemPerPage);
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentpage(page);
    }
  };

  const filteredProducts = currentProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckAll(e, currentProducts, setSelectedItem);
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
                      <CheckBox
                        onChange={handleCheck}
                        checked={selectedItem.size === currentProducts.length}
                      />
                    </th>

                    <TableHeaderIcon label="productName" />
                    <TableHeaderIcon label="productID" />
                    <TableHeaderIcon label="category" />
                    <TableHeaderIcon label="addedBy" />
                    <TableHeaderIcon label="available" />
                    <TableHeaderIcon label="reserved" />
                    <TableHeaderIcon label="stock" />
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
                        <CheckBox
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
                            <ActionButton
                              icon="hugeicons:view"
                              className={"view"}
                              onClick={() => {}}
                            />
                            <ActionButton
                              icon="uil:edit"
                              className={"edit"}
                              onClick={() => {}}
                            />
                            <ActionButton
                              icon="material-symbols:delete-outline"
                              className={"delete"}
                              onClick={() => handleDeleteProduct(product._id)}
                            />{" "}
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
      {openModel && (
        <AddItemModal onCloseModal={() => setOpenModel(!openModel)} />
      )}
    </div>
  );
};

export default ItemList;
