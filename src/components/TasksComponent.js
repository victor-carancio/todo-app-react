import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useGlobalContext } from "../context/context";
import {
  getAllTasks,
  createNewTask,
  deleteTask,
  updateTask,
} from "../Services/Tasks";
import Loading from "./Loading";

import SingleTask from "./SingleTask";

const TasksComponent = () => {
  const {
    tasks,
    setTasks,
    token,
    currFilter,
    handleFilter,
    isLoading,
    setIsLoading,
  } = useGlobalContext();

  const [newTask, setNewTask] = useState("");

  const taskInput = useRef("");

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    if (newTask) {
      handleCreateTask();
      handleGetTasks();
    }
  };

  const handleGetTasks = async () => {
    try {
      setIsLoading(true);
      const data = await getAllTasks(token);
      setTasks(data.task);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTask = async () => {
    try {
      setIsLoading(true);
      await createNewTask(token, { task: newTask });
      setNewTask("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (_id) => {
    try {
      setIsLoading(true);
      await deleteTask(token, _id);
      handleGetTasks();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTask = async (_id, status) => {
    try {
      setIsLoading(true);
      await updateTask(token, _id, { status });
      handleGetTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearComplete = () => {
    tasks
      .filter((item) => item.status === "complete")
      .forEach((task) => handleDeleteTask(task._id));
  };

  useEffect(() => {
    taskInput.current.focus();
    handleGetTasks();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="new-task">
      <div className="tasks-container">
        <form onSubmit={handleTaskSubmit} className="form-task item">
          <div className="check"></div>
          <input
            className="input-task"
            type="text"
            ref={taskInput}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Create a new todo..."
          />
        </form>

        {tasks.length > 0 ? (
          <div className="tasks">
            {currFilter === "All" &&
              tasks.map((task) => {
                return (
                  <SingleTask
                    key={task._id}
                    {...task}
                    updateTask={handleUpdateTask}
                    deleteTask={handleDeleteTask}
                  />
                );
              })}

            {currFilter === "Active" &&
              tasks
                .filter((task) => task.status === "pending")
                .map((task) => {
                  return (
                    <SingleTask
                      key={task._id}
                      {...task}
                      updateTask={handleUpdateTask}
                      deleteTask={handleDeleteTask}
                    />
                  );
                })}

            {currFilter === "Completed" &&
              tasks
                .filter((task) => task.status === "complete")
                .map((task) => {
                  return (
                    <SingleTask
                      key={task._id}
                      {...task}
                      updateTask={handleUpdateTask}
                      deleteTask={handleDeleteTask}
                    />
                  );
                })}

            <div className="footer-mobile ">
              <p className="items-left">{`${tasks.length} items left`}</p>
              <p className="clear" onClick={() => handleClearComplete()}>
                Clear completed
              </p>
            </div>
            <div className="filters-mobile">
              <p
                className={currFilter === "All" ? "filter-active" : ""}
                onClick={() => handleFilter("All")}
              >
                All
              </p>
              <p
                className={currFilter === "Active" ? "filter-active" : ""}
                onClick={() => handleFilter("Active")}
              >
                Active
              </p>
              <p
                className={currFilter === "Completed" ? "filter-active" : ""}
                onClick={() => handleFilter("Completed")}
              >
                Completed
              </p>
            </div>
            <div className="filters-desktop">
              <p className="items-left">{`${tasks.length} items left`}</p>
              <div className="filters">
                <p
                  className={currFilter === "All" ? "filter-active" : ""}
                  onClick={() => handleFilter("All")}
                >
                  All
                </p>
                <p
                  className={currFilter === "Active" ? "filter-active" : ""}
                  onClick={() => handleFilter("Active")}
                >
                  Active
                </p>
                <p
                  className={currFilter === "Completed" ? "filter-active" : ""}
                  onClick={() => handleFilter("Completed")}
                >
                  Completed
                </p>
              </div>
              <p className="clear" onClick={() => handleClearComplete()}>
                Clear completed
              </p>
            </div>
          </div>
        ) : (
          <div className="tasks">
            <div className="item empty-task">
              <p>There is no tasks</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TasksComponent;
