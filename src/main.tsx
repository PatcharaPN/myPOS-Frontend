import ReactDOM from "react-dom/client";
import "./index.scss";

import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
