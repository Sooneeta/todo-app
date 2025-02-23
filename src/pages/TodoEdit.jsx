import TodoForm from "../components/TodoForm";
import { useLocation } from "react-router-dom";
import { useTodo } from "../context/TodoContext";
import { useState, useEffect } from "react";

const TodoEdit = () => {
  const { todos } = useTodo();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const todoId = queryParams.get("todoId");
  const [updatedValue, setUpdatedValue] = useState(null);

  useEffect(() => {
    const findTodo = todos?.find((todo) => todo.id === todoId);

    if (findTodo) {
      setUpdatedValue(findTodo);
    }
  }, [todos, todoId]);

  return (
    <>
      <TodoForm title="Edit Todo" btnText="Edit" updatedTodo={updatedValue} />
    </>
  );
};

export default TodoEdit;
