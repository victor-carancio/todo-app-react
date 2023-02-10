const todoApiUrl = "https://todo-api-express.onrender.com/api/v1/task/";

export const getAllTasks = async (token) => {
  try {
    const response = await fetch(todoApiUrl, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createNewTask = async (token, newTask) => {
  try {
    const request = await fetch(todoApiUrl, {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
      body: JSON.stringify(newTask),
    });
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (token, taskID, task) => {
  try {
    await fetch(`${todoApiUrl}${taskID}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
      body: JSON.stringify(task),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (token, taskID) => {
  try {
    await fetch(`${todoApiUrl}${taskID}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
