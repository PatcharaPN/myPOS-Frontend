import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import MainLayout from "./layouts/MainLayout";
import NoSidebarLayout from "./layouts/NoSidebarLayout";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { RootState, useAppSelector } from "./store/store";
import "./i18n";
const App: React.FC = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.currentUser !== null
  );
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <NoSidebarLayout>
              <Login />
            </NoSidebarLayout>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <AppRoutes />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
