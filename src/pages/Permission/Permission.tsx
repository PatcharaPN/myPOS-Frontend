import { Icon } from "@iconify/react/dist/iconify.js";
import ContainerData from "../../components/ContainerData/ContainerData";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { ChangeEvent, useEffect, useState } from "react";
import { getAllUsers, upDatedUser } from "../../features/AuthSlice";
import { useTranslation } from "react-i18next";
import SmallModal from "../../components/Modal/ModalSmall/SmallModal";
import CustomInput from "../../components/Input/Input";
import SelectInput from "../../components/Input/Selecter/Selecter";

const PermissionPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.auth.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    role: "",
  });

  const handleEditClick = (userId: string) => {
    const user = users.find((u) => u._id === userId);
    if (user) {
      setFormData({
        username: user.username,
        name: user.name,
        role: user.role,
      });
      setSelectedUser(userId);
      console.log(selectedUser);
      console.log(formData.role);

      setModalOpen(true);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(formData.role);

  const handleSubmit = () => {
    if (selectedUser && formData.role) {
      dispatch(upDatedUser({ userId: selectedUser, role: formData.role }))
        .unwrap()
        .then(() => {
          dispatch(getAllUsers());
          setModalOpen(false);
        })
        .catch((error) => {
          console.error("Failed to update user:", error);
        });
    } else {
      console.error("UserId or role is missing");
    }
  };

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "customer", label: "Customer" },
    { value: "manager", label: "Manager" },
    { value: "staff", label: "Staff" },
  ];

  return (
    <ContainerData pagename={t("permision")}>
      {isModalOpen && (
        <SmallModal onClose={() => setModalOpen(false)}>
          <div
            
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <h1>{t("editUserPermission")}</h1>
            <div className="flex-btn">
              <div className="btn-section">
                <button className="btn" type="submit" onClick={handleSubmit}>
                  {t("save")}
                </button>
                <button
                  className="btn white"
                  type="button"
                  onClick={() => setModalOpen(false)}
                >
                  {t("discard")}
                </button>
              
              </div>
            </div>
          </div>

          <div
            className="edit-form"
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <CustomInput
              label={t("username")}
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <CustomInput
              label={t("name")}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <SelectInput
              label={t("role")}
              name="role"
              options={roleOptions}
              value={formData.role}
              onChange={handleInputChange}
            />
          </div>
        </SmallModal>
      )}
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th className="align-header">
              {t("username")} <Icon icon="octicon:triangle-down-16" />
            </th>
            <th className="align-header">
              {t("name")} <Icon icon="octicon:triangle-down-16" />
            </th>
            <th className="align-header">
              {t("role")} <Icon icon="octicon:triangle-down-16" />
            </th>
            <th className="button-section">{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <input type="checkbox" />
              </td>
              <td className="table-data">{user.username}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td className="button-section">
                <button className="button-action view">
                  <Icon width={20} icon="hugeicons:view" />
                </button>
                <button
                  className="button-action edit"
                  onClick={() => handleEditClick(user._id)}
                >
                  <Icon width={20} icon="uil:edit" />
                </button>
                <button className="button-action delete" onClick={() => {}}>
                  <Icon width={20} icon="material-symbols:delete-outline" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ContainerData>
  );
};

export default PermissionPage;
