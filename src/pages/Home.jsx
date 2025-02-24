import { useNavigate } from "react-router-dom";
import { useTodo } from "../context/TodoContext";
import { useState, useEffect, useRef } from "react";
import SelectMenu from "../components/SelectMenu";
import FilterIcon from "../assets/images/filter.svg";
import NoResultIcon from "../assets/images/noresult.svg";
import DeleteDialog from "../components/DeleteDialog";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Loader } from "../components/Loader";

const Home = () => {
  const navigate = useNavigate();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();
  const contextMenu = ["Edit", "Delete", "Mark as"];
  const filterMenu = ["All", "Completed TODOs", "Incompleted TODOs"];
  const { todos, updateTodo, setOriginalTodos, loading } = useTodo();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const contextMenuRef = useRef(null);
  const touchTimer = useRef(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const handleAddTodo = () => {
    navigate("/add");
  };

  const handleContextMenu = (todo, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTodo(todo);
    setShowContextMenu(!showContextMenu);
  };

  const handleTouchStart = (todo, e) => {
    e.preventDefault();
    touchTimer.current = setTimeout(() => {
      handleContextMenu(todo, e);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (touchTimer.current) {
      clearTimeout(touchTimer.current);
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.index === source.index) return;

    setOriginalTodos((prevTodos) => {
      const reorderedTodos = Array.from(prevTodos);
      const [movedTodo] = reorderedTodos.splice(source.index, 1);
      reorderedTodos.splice(destination.index, 0, movedTodo);
      return reorderedTodos;
    });
  };

  useEffect(() => {
    setIsPageLoaded(true);
    const handleClickOutside = (e) => {
      e.preventDefault();
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target)
      ) {
        setShowContextMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="homepage-wrapper">
      <div className="todo-list">
        <div className="todo-list-header">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>Todo List</h3>
            <button
              className={`filter-button ${
                showFilterMenu ? "active-filter" : ""
              }`}
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <img src={FilterIcon} className="filter-icon" />
              <p>Filter</p>
            </button>
          </div>
          <div className="filter-menu">
            {showFilterMenu && <SelectMenu menu={filterMenu} />}
          </div>
          <hr />
        </div>
        {loading ? (
          <div className="loader todo-list-item-wrapper">
            <Loader />
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
              droppableId="todoList"
              isDropDisabled={false}
              isCombineEnabled={false}
              ignoreContainerClipping={false}
            >
              {(provided) => (
                <div
                  className={`todo-list-item-wrapper ${
                    isPageLoaded ? "animate-todo-list-item-wrapper" : ""
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {todos?.length > 0 ? (
                    todos.map((todo, index) => (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <section
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`todo-list-item ${
                              showContextMenu && selectedTodo?.id === todo.id
                                ? "active-todo"
                                : ""
                            }`}
                            onContextMenu={(e) => handleContextMenu(todo, e)}
                            onTouchStart={(e) => handleTouchStart(todo, e)}
                            onTouchEnd={handleTouchEnd}
                          >
                            <input
                              type="checkbox"
                              checked={todo.isComplete}
                              onChange={() => {
                                updateTodo(
                                  { ...todo, isComplete: !todo.isComplete },
                                  index
                                );
                              }}
                            />
                            <p>{todo.todo}</p>
                          </section>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <div className="empty-section">
                      <img src={NoResultIcon} className="file-icon" />
                      <p>No Data Found</p>
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
      <button onClick={handleAddTodo}>Add Todo</button>
      <div ref={contextMenuRef} className="context-menu">
        {showContextMenu && (
          <SelectMenu
            menu={contextMenu}
            selectedTodo={selectedTodo}
            setShowDeleteDialog={setShowDeleteDialog}
          />
        )}
      </div>
      <div className="delete-dialog">
        {showDeleteDialog && (
          <DeleteDialog
            todo={selectedTodo}
            setShowDeleteDialog={setShowDeleteDialog}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
