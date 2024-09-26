import React, { useState, useEffect } from "react";
import "./Login.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch } from "../../store/store";
import { loginUser } from "../../features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  const [slideOut, setSlideOut] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const loginfail = useAppSelector(
  //   (state: RootState) => state.auth.loginFailed,
  // );

  useEffect(() => {
    return () => setSlideOut(true);
  }, []);

  return (
    <div className={`auth-container ${slideOut ? "slide-out" : ""}`}>
      <div className="auth-form">
        <div className="form">
          <div className="auth-section">
            <p className="header-text">Login</p>
            <LoginForm />
            <div className="social-login">
              <div className="social-btn">
                <Icon width={50} icon="devicon:google" />
              </div>
              <div className="social-btn">
                <Icon width={50} icon="logos:facebook" />
              </div>
            </div>
          </div>
        </div>
        <div className="image-section">
          <img
            src="/assets/undraw_login_re_4vu2.svg"
            width={400}
            height={400}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
