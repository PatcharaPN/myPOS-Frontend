import { Route, Routes } from "react-router-dom";
import SettingLayout from "../layouts/SettingLayout/SettingLayout";
import MainSetting from "../pages/Setting/MainSetting/Mainsetting";

const SettingRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SettingLayout />}>
        <Route path="main" element={<MainSetting />} />
      </Route>
    </Routes>
  );
};

export default SettingRoute;
