import { Icon } from "@iconify/react/dist/iconify.js";
import "./SettingLayout.scss";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

const SettingLayout = () => {
  return (
    <>
      {" "}
      <Header isCollapsed={false} />
      <section className="layout-setting">
        <aside className="setting-sidebar">
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Icon icon="weui:back-filled" />
            <p>Back</p>
          </div>
          <h1
            style={{
              fontWeight: "bolder",
              fontSize: "1.7rem",
              marginBottom: "2rem",
            }}
          >
            Setting
          </h1>
          <ul
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <li className="setting-list">
              Profile <Icon icon={"oui:arrow-right"} />
            </li>{" "}
            <li className="setting-list">
              Account <Icon icon={"oui:arrow-right"} />
            </li>{" "}
            <li className="setting-list">
              Appearance <Icon icon={"oui:arrow-right"} />
            </li>
            <li className="setting-list">
              Accessibility <Icon icon={"oui:arrow-right"} />
            </li>
          </ul>
        </aside>
        <div>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default SettingLayout;
