import PropTypes from "prop-types";
import { useTodo } from "../context/TodoContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/components.css";
import WarningIcon from "../assets/images/warning.svg";

const TodoForm = (props) => {
  const { title, btnText, updatedTodo } = props;
  const [inputValue, setInputValue] = useState("");
  const { addTodo, updateTodo } = useTodo();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (updatedTodo) {
      setInputValue(updatedTodo?.todo);
    }
  }, [updatedTodo]);

  const handleFormBtn = () => {
    if (inputValue.trim() === "") {
      setError("Please enter a todo");
      return;
    }
    setError(" ");

    if (title.includes("Add")) {
      addTodo(inputValue);
    } else {
      updateTodo({ ...updatedTodo, todo: inputValue });
    }

    navigate("/");
  };

  return (
    <div className="todo-form-wrapper">
      <h2>{title}</h2>
      <div>
        <textarea
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {error && (
          <div
            style={{
              display: "flex",
              gap: "0.5em",
              color: "red",
              paddingLeft: "1em",
              alignItems: "center",
            }}
          >
            <img
              src={WarningIcon}
              alt="empty-warning-icon"
              className="empty-warning-icon"
            />
            <p style={{}}>{error}</p>
          </div>
        )}
        <button onClick={handleFormBtn}>{btnText}</button>
      </div>
    </div>
  );
};

TodoForm.propTypes = {
  title: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  updatedTodo: PropTypes.shape({
    todo: PropTypes.string.isRequired,
  }),
};

export default TodoForm;
