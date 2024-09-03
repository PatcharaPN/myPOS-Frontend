import { useTranslation } from "react-i18next";
import ContainerData from "../../components/ContainerData/ContainerData";
import "./Customers.scss";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { createCustomer, getAllCustomer } from "../../features/customerSlice";
import SmallModal from "../../components/Modal/ModalSmall/SmallModal";
import CustomInput from "../../components/Input/Input";

type Props = {};

const Customers = (props: Props) => {
  const customer = useAppSelector(
    (state: RootState) => state.customer.customer
  );
  const { t } = useTranslation();
  const [contactData, setContactData] = useState({
    customername: "",
    email: "",
    phone: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const itemPerPage = 7;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const indexOfLastCustomer = currentPage * itemPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemPerPage;
  const currentCustomers = customer.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCustomer());
  }, [dispatch]);

  const filteredCustomer = customer.filter((customer) =>
    customer.customername.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomer.length / itemPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customerData = {
      customername: contactData.customername,
      email: contactData.email,
      phone: contactData.phone,
    };
    dispatch(createCustomer(customerData)).then(() => {
      setModalOpen(false);
      setContactData({ customername: "", email: "", phone: "" });
    });
  };

  return (
    <ContainerData
      Canadd={true}
      onClickAdd={() => {
        setModalOpen(true);
      }}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      pagename={t("customers")}
    >
      <div className="layout-table">
        <div className="item-list-wrapper">
          {filteredCustomer.length === 0 ? (
            <div className="empty-img">
              <img
                width={450}
                src="/assets/undraw_empty_re_opql.svg"
                alt="Empty"
              />
              <h2 className="text-alert">
                Oops! Your inventory is empty. Try adding new items.
              </h2>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" name="" id="" />
                  </th>
                  <th className="align-header">
                    {t("customername")} <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    {t("email")} <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    {t("phonenumber")} <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="button-section">{t("action")}</th>
                </tr>
              </thead>
              <tbody className="content-wrapper">
                {currentCustomers.map((customer) => (
                  <motion.tr
                    className="hover"
                    whileHover={{
                      scale: 1.005,
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                    }}
                    key={customer.customername}
                  >
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{customer.customername}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
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
        <div className="pagination">
          <div className="button">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Icon icon="iconamoon:arrow-left-2-bold" />
            </button>
            <span>
              {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Icon icon="iconamoon:arrow-right-2-bold" />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <SmallModal
          header=""
          onClose={() => setModalOpen(false)} // Corrected onClose handler
        >
          <h1>Add Customer</h1>
          <form className="input-group" onSubmit={handleSubmit}>
            <CustomInput
              label={"Name"}
              value={contactData.customername}
              onChange={(e) =>
                setContactData({ ...contactData, customername: e.target.value })
              }
            />
            <CustomInput
              label={"Email"}
              value={contactData.email}
              onChange={(e) =>
                setContactData({ ...contactData, email: e.target.value })
              }
            />
            <CustomInput
              label={"Phone"}
              value={contactData.phone}
              onChange={(e) =>
                setContactData({ ...contactData, phone: e.target.value })
              }
            />
            <div className="flex-btn">
              <div className="btn-section">
                <button className="btn" type="submit">
                  Save
                </button>
                <button
                  className="btn white"
                  type="button"
                  onClick={() => setModalOpen(false)}
                >
                  Discard
                </button>
              </div>
            </div>
          </form>
        </SmallModal>
      )}
    </ContainerData>
  );
};

export default Customers;
