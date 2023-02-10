import React from "react";
import { ReactComponent as DeleteIcon } from "../Assets/images/icon-cross.svg";
import { ReactComponent as CheckIcon } from "../Assets/images/icon-check.svg";
import { useGlobalContext } from "../context/context";

const SingleTask = ({ task, deleteTask, _id, status, updateTask }) => {
  const { token, currFilter } = useGlobalContext();

  const handleUpdate = () => {
    status === "pending"
      ? updateTask(_id, "complete", task)
      : updateTask(_id, "pending", task);
  };

  return (
    <div className="single-task item">
      <div
        className={status === "complete" ? "check-complete" : "check"}
        onClick={() => handleUpdate()}
      >
        {status === "complete" && <CheckIcon />}
      </div>

      <p className="task-text">{task}</p>
      <DeleteIcon className="delete-icon" onClick={() => deleteTask(_id)} />
    </div>
  );
};

export default SingleTask;
