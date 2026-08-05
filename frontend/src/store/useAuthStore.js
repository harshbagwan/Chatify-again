import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({

  // authUser: { name: "diddy", _id:123,age:25},
  // isLoggedIn:false,

  // login: ()=>{
  //     console.log("We just logged in");
  //     set({isLoggedIn:true});
  // },
  authUser: null,
  isCheckingAuth: true,
  isSigningUp:false,

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

  signup: async (data) => {  // data = {fullName,email,password} get the data from the form and send it to the backend
    set({isSigningUp:true});
    try {
      const res = await axiosInstance.post("/auth/signup", data); // we are sending the data to the backend using axiosInstance which is configured to send the request to the backend server. The backend server will handle the request and send the response back to the frontend. The response will contain the user data which we will set in the authUser state.
      set({ authUser: res.data }); // here res.data is the user data which we get from the backend after successful signup. We set this data in the authUser state so that we can use it in the frontend to show the user data and also to check if the user is logged in or not.
    //   get().connectSocket();
    toast.success("Account created successfully!"); // show a success toast message to the user after successful signup.
    } catch (error) {
        // toast.error(error.response?.data?.message || "Something went wrong!"); // show an error toast message to the user if there is any error in the signup process. We are checking if the error response has a message property and if it does, we show that message to the user. If it doesn't, we show a generic error message.
       toast.error(error.response.data.message);

    } finally {
      set({isSigningUp:false});
    }
}

}));
