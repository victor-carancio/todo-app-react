const todoApiUrl = "https://todo-api-express.onrender.com/api/v1/auth/";

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${todoApiUrl}login`, {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (credentials) => {
  try {
    const response = await fetch(`${todoApiUrl}register`, {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
