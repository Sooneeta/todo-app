import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { TodoContextProvider } from "./context/TodoContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </BrowserRouter>
);
