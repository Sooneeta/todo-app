import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const todoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [originalTodos, setOriginalTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [todos, setTodos] = useState(originalTodos);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(originalTodos));
    setTodos(originalTodos);
  }, [originalTodos]);

  const addTodo = (todo) => {
    setLoading(true);
    const newTodo = {
      id: crypto.randomUUID(),
      todo,
      isComplete: false,
      created: new Date(),
    };
    setOriginalTodos([...originalTodos, newTodo]);
    setTimeout(() => setLoading(false), 3000);
  };

  const updateTodo = (updatedTodo) => {
    setLoading(true);
    setOriginalTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id
          ? { ...updatedTodo, updated: new Date() }
          : todo
      )
    );
    setTimeout(() => setLoading(false), 3000);
  };

  const deleteTodo = (deletedTodo) => {
    setLoading(true);
    setOriginalTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== deletedTodo.id)
    );
    setTimeout(() => setLoading(false), 3000);
  };

  const filterTodo = (filter) => {
    setLoading(true);
    switch (filter) {
      case "Completed TODOs":
        setTodos(originalTodos.filter((todo) => todo.isComplete === true));
        break;
      case "Incompleted TODOs":
        setTodos(originalTodos.filter((todo) => todo.isComplete === false));
        break;
      case "All":
        setTodos(originalTodos);
        break;
      default:
        setTodos(originalTodos);
    }
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <todoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        filterTodo,
        setOriginalTodos,
        loading,
      }}
    >
      {children}
    </todoContext.Provider>
  );
};

TodoContextProvider.propTypes = {
  children: PropTypes.any,
};

export const useTodo = () => useContext(todoContext);
