// import axios
import axios from "axios";

// set base url
const baseUrl = "https://shortener-ko6i.onrender.com";

// create instance object
const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// create protected instance
const protectedInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("token")}`,
  },
  withCredentials: true,
});

// export instances
export { instance, protectedInstance };
