import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TodoAdd from "./pages/TodoAdd";
import TodoEdit from "./pages/TodoEdit";

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<TodoAdd />} />
        <Route path="/edit" element={<TodoEdit />} />
      </Routes>
    </>
  );
};
