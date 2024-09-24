import { useState } from "react";
import InputButton from "../InputButton/InputButton";
import { useTranslation } from "react-i18next";

const LoginForm = ({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const { t } = useTranslation();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="login form" onSubmit={onSubmit}>
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
