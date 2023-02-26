import axios from "axios";

// Retrieve the saved templates from the serer
export const getAllTemplatesById = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const res = await axios.get(`/templates/saved`);
    const templates = await res.data;

    return templates;
  } catch (error) {
    throw new Error(error.res.message);
  }
};

//Create new templates
export const templateSave = async (template) => {
  try {
    const res = await axios.post("/templates/save", {
      title: template.title,
      description: template.description,
      html: template.html,
      CSS: template.css,
      image: template.image,
      date: template.date,
      user: template.id,
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Delete template
export const deleteTemplate = async (id) => {
  try {
    const res = await axios.delete(`/templates/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`/api/users/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//User Signup
export const userRegister = async (user) => {
  try {
    const res = await axios.post("/api/users/register", {
      name: user.name,
      email: user.email,
      password: user.password,
      password2: user.password2,
      image: user.image,
    });

    const data = res.data;
    return data;
  } catch (error) {
    if (
      error.response.status === 400 &&
      error.response.data.email === "Email already exists"
    ) {
      throw new Error("Email already exists");
    } else {
      return error.response.data;
    }
  }
};

export const authHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("user", JSON.stringify({ token }));
  } else {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user");
  }
};

export const userLogin = async (user) => {
  try {
    const res = await axios.post("/api/users/login", {
      email: user.email,
      password: user.password,
    });

    const data = await res.data;
    return data;
  } catch (error) {
    if (
      error.response.status === 404 &&
      error.response.data.email === "Incorrect Email or password"
    ) {
      throw new Error("Incorrect Email or password");
    } else {
      return error.response.data;
    }
  }
};
export const getUser = async (id) => {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}: ${error}`);
    return null;
  }
};
export const updateUser = async (user) => {
  try {
    const response = await axios.put(`/api/users/${user._id}`, {
      name: user.name,
      email: user.email,
      image: user.image,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {console.error('Error', error);
    }
    throw error;
  }
};
// export const updateUser = async (user) => {
//   const res = await axios.put(`api/users/${user._id}`, {
//     name: user.name,
//     email: user.email,
//     image: user.image,
//   });
//   const data = res;
//   return data;
// };

export const updateUserPassword = async (user) => {
  const res = await axios.put(`api/users/${user._id}/password`, {
    password: user.password,
  });
  const data = res.data;
  return data;
};

//user logout
export const logoutUser = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("details");
};
