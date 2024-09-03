import ContainerData from "../../components/ContainerData/ContainerData";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { getPackage } from "../../features/packageSlice";
import { useEffect } from "react";

const Package = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  const packagelist = useAppSelector(
    (state: RootState) => state.package.products
  );

  useEffect(() => {
    dispatch(getPackage());
  }, [dispatch]);

  const { t } = useTranslation();
  return (
    <ContainerData Canadd={true} pagename={t("package")}>
      <div className="item-list-wrapper">
        {packagelist.length === 0 ? (
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
                  {t("packageName")} <Icon icon="octicon:triangle-down-16" />
                </th>
                <th className="align-header">
                  {t("packageID")} <Icon icon="octicon:triangle-down-16" />
                </th>

                <th className="align-header">
                  {t("time")} <Icon icon="octicon:triangle-down-16" />
                </th>
                <th className="align-header">
                  {t("owner")} <Icon icon="octicon:triangle-down-16" />
                </th>
                <th className="button-section-action">{t("action")}</th>
              </tr>
            </thead>
            <tbody className="content-wrapper">
              {packagelist.map((packages) => (
                <motion.tr
                  whileHover={{
                    scale: 1.005,
                    transition: {
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                  key={packages._id}
                >
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{packages.name}</td>
                  <td>{packages.owner.name}</td>
                  <td>{new Date(packages.createdAt).toISOString()}</td>
                  <td>{packages._id}</td>

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
  );
};

export default Package;
