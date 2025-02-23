import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../context/TodoContext";
import { GiCheckMark } from "react-icons/gi";
import "../styles/components.css";

const SelectMenu = ({ menu, selectedTodo, setShowDeleteDialog }) => {
  const [menuSubString, setMenuSubString] = useState("");
  const { updateTodo, filterTodo } = useTodo();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const handleMenu = (option, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedOption(option);
    switch (option) {
      case "Edit":
        navigate(`/edit?todoId=${selectedTodo.id}`);
        break;
      case "Delete":
        setShowDeleteDialog(true);
        break;
      case "Mark as":
        updateTodo({ ...selectedTodo, isComplete: !selectedTodo.isComplete });
        navigate("/");
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
              <span> {menuSubString}</span>
            )}
            <span
              className={`checkmark ${
                selectedOption === value ? "visible" : ""
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
