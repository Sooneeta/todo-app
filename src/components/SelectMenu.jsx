import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../context/TodoContext";
import { GiCheckMark } from "react-icons/gi";
import "../styles/components.css";

const SelectMenu = ({ menu, selectedTodo, setShowDeleteDialog }) => {
  const [menuSubString, setMenuSubString] = useState("");
  const { updateTodo, filterTodo, selectedFilter, setOriginalTodos } =
    useTodo();
  const navigate = useNavigate();

  const handleMenu = (option, e) => {
    e.preventDefault();
    e.stopPropagation();
    switch (option) {
      case "Edit":
        navigate(`/edit?todoId=${selectedTodo.id}`);
        break;
      case "Delete":
        setShowDeleteDialog(true);
        break;
      case "Mark as":
        setOriginalTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === selectedTodo.id
              ? { ...todo, isComplete: !todo.isComplete }
              : todo
          )
        );
        break;
      case "All":
        filterTodo("All");
        break;
      case "Completed TODOs":
        filterTodo("Completed TODOs");
        break;
      case "Incompleted TODOs":
        filterTodo("Incompleted TODOs");
        break;
      default:
    }
  };

  useEffect(() => {
    if (menu.includes("Mark as")) {
      setMenuSubString(selectedTodo?.isComplete ? "Incomplete" : "Complete");
    }
  }, [menu, selectedTodo]);

  return (
    <>
      <ul className="menu">
        {menu?.map((value, index) => (
          <li key={index} onClick={(e) => handleMenu(value, e)}>
            {value}
            {index === menu.length - 1 && menuSubString && (
              <span>&nbsp;{menuSubString}</span>
            )}
            <span
              className={`checkmark ${
                selectedFilter === value ? "visible" : ""
              }`}
            >
              <GiCheckMark />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

SelectMenu.propTypes = {
  menu: PropTypes.array,
  selectedTodo: PropTypes.object,
  setShowDeleteDialog: PropTypes.func,
};

export default SelectMenu;
