import { useState } from "react";
import InputButton from "../InputButton/InputButton";
import { useTranslation } from "react-i18next";
import { loginUser } from "../../features/AuthSlice";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { t } = useTranslation();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (
    e: React.FormEvent<HTMLInputElement | HTMLFormElement>,
  ) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: t("loginfail"),
          text: t("loginfailreason"),
          footer: `<a href="#">${t("checkpassword")}</a>`,
        });
      });
  };
  return (
    <form className="login form" onSubmit={handleSubmit}>
      <InputButton
        onChange={(e) => setemail(e.target.value)}
        name="email"
        value={email}
        label={"Email Address"}
        placholder={"You@example.com"}
      />
      <InputButton
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        type="password"
        value={password}
        label={"Password"}
        placholder={"Enter 6 character or more"}
      />
      <div className="rememberme">
        <input type="checkbox" />
        <p>Remember me</p>
      </div>

      <button type="submit" className="btn login">
        {t("login")}
      </button>
    </form>
  );
};

export default LoginForm;
