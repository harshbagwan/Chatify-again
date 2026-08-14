import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    // data = {fullName,email,password} get the data from the form and send it to the backend
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data); // we are sending the data to the backend using axiosInstance which is configured to send the request to the backend server. The backend server will handle the request and send the response back to the frontend. The response will contain the user data which we will set in the authUser state.
      set({ authUser: res.data }); // here res.data is the user data which we get from the backend after successful signup. We set this data in the authUser state so that we can use it in the frontend to show the user data and also to check if the user is logged in or not.
      //   get().connectSocket();
      toast.success("Account created successfully!"); // show a success toast message to the user after successful signup.
      get().connectSocket();  
    } catch (error) {
      // toast.error(error.response?.data?.message || "Something went wrong!"); // show an error toast message to the user if there is any error in the signup process. We are checking if the error response has a message property and if it does, we show that message to the user. If it doesn't, we show a generic error message.
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },
  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return; // authenticated nahi h ,, ya pehle se connected h to return kardo 

    const socket = io(BASE_URL, {
      withCredentials: true, // this ensures cookies are sent with the connection
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    socket.connect();

    set({ socket: socket });

    // listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    // log reconnections for debugging
    socket.io.on("reconnect", (attempt) => {
      console.log(`Socket reconnected after ${attempt} attempts`);
    });
  },
  disconnectSocket: () => {
    if(get().socket?.connected) get().socket?.disconnect();
  }
}));
