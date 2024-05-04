import forgotPassword from "../src/Components/ForgotPassword";
import { instance, protectedInstance } from "./instance";

// define the user services
const userServices = {
    register: async (user) => {
        return await instance.post("/register", user);
    },

    login: async (user) => {
        return await instance.post("/login", user);
    },

    getCurrentUser: async () => {
        return await protectedInstance.get("/currentUser");
    },

    logout: async () => {
        return await protectedInstance.get("/logout");
    },

    forgotPassword: async (email) => {
        return await instance.post("/forgotPassword", email);
    },

    resetPassword: async (password) => {
        return await instance.post("/resetPassword", password);
    },

    generateShortUrl: async (url) => {
        return await protectedInstance.post("/shorten", url);
    },

    getAnalytics: async () => {
        return await protectedInstance.get("/getAllUrls");
    }
}

// export userServices
export default userServices;