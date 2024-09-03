import React, { useEffect, useState } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { getTotalComposite } from "../../features/CategorySlice";
import SmallModal from "../../components/Modal/ModalSmall/SmallModal";
import CustomInput from "../../components/Input/Input";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const CompositeItem = () => {
  const { t } = useTranslation(); // Get translation function
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const getTotal = useAppSelector(
    (state: RootState) => state.category.composite
  );
  const [isModalOpen, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getTotalComposite());
  }, [dispatch]);
  const filteredComposite = getTotal.filter((Composite) =>
    Composite.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      {isModalOpen ? (
        <SmallModal
          header={t("addCompositeItem")}
          onClose={() => setOpenModal(false)}
        >
          <h2 style={{ marginBottom: "20px", fontWeight: "bold" }}>
            {t("addCompositeItem")}
          </h2>
          <CustomInput label={t("name")} value={""} />
        </SmallModal>
      ) : null}
      <ContainerData
        value={searchTerm}
        pagename={t("compositeItem")}
        onChange={(e) => setSearchTerm(e.target.value)}
        Canadd
      >
        <div className="item-list-wrapper">
          {filteredComposite.length === 0 ? (
            <div className="empty-img">
              <img
                width={450}
                src="/assets/undraw_empty_re_opql.svg"
                alt="Empty"
              />
              <h2 className="text-alert">{t("emptyInventory")}</h2>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" name="" id="" />
                  </th>
                  <th className="align-header">
                    {t("name")} <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    {t("productCount")} <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    {t("addedBy")} <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    {t("role")} <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="button-section-action">
                    {t("action")} <Icon icon="octicon:triangle-down-16" />
                  </th>
                </tr>
              </thead>
              <tbody className="content-wrapper">
                {getTotal.map((total) => (
                  <motion.tr
                    whileHover={{
                      scale: 1.005,
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                    }}
                    key={total._id}
                  >
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{total.name}</td>
                    <td>{total.productCount}</td>
                    <td>{total.addedBy.username}</td>
                    <td>{total.addedBy.role}</td>
                    <td>
                      <div className="button-section-wrapper">
                        <div className="button-section">
                          <button className="button-action view">
                            <Icon width={20} icon="hugeicons:view" />
                          </button>
                          <button className="button-action edit">
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
      </ContainerData>
    </div>
  );
};

export default CompositeItem;
