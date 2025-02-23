import { IoWarning } from "react-icons/io5";
import PropTypes from "prop-types";
import { useTodo } from "../context/TodoContext";
import "../styles/components.css";

const DeleteDialog = ({ todo, setShowDeleteDialog }) => {
  const { deleteTodo } = useTodo();
  const handleCancel = (e) => {
    e.preventDefault;
    setShowDeleteDialog(false);
  };
  return (
    <div className="delete-dialog-container">
      <IoWarning className="warning-icon" />

      <h5>Are you sure you want to delete "{todo.todo}" todo?</h5>
      <section>
        <button onClick={(e) => handleCancel(e)} className="cancel-button">
          Cancel
        </button>
        <button
          onClick={() => {
            deleteTodo(todo);
            setShowDeleteDialog(false);
          }}
          className="delete-button"
        >
          Delete
        </button>
      </section>
    </div>
  );
};

DeleteDialog.propTypes = {
  todo: PropTypes.object.isRequired,
  setShowDeleteDialog: PropTypes.func,
};

export default DeleteDialog;
