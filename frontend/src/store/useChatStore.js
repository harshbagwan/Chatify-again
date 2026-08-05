import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
export const useChatStore = create((set,get) => ({ // we are returning a object inside the callback function of create() method, which will be the initial state of our store
    allContacts: [], // initial state of allContacts is an empty array
    chats: [], // initial state of chats is an empty array
    messages: [],
    activeTab: "chats", // initial state of activeTab is "chats"
    selectedUser: null, // initial state of selectedUser is null
    isUsersLoading: false, // initial state of isUserLoading is false
    isMessagesLoading: false, // initial state of isMessageLoading is false
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true ,

    toggleSound: () => {
        // localStorage.setItem("isSoundEnabled",get().isSoundEnabled ? false : true);
        localStorage.setItem("isSoundEnabled",!get().isSoundEnabled ); // first we are getting the current value of isSoundEnabled from the store using get() method, then we are negating it using ! operator and then we are setting the new value of isSoundEnabled in the llLOCAL ssSTORAGE using setItem() method
        set({isSoundEnabled: !get().isSoundEnabled}); // here we are updating the ssSTATE of isSoundEnabled in the store using set() method, we are getting the current value of isSoundEnabled from the store using get() method and then we are negating it using ! operator and then we are setting the new value of isSoundEnabled in the store
                                                     // first we updated the local storage and then we updated the state of the store, so that when the user refreshes the page, the state of isSoundEnabled will be persisted in the local storage and we can get it from there and set it in the store when the app loads
                                                     // first we updated the local storage and then we also updated the state so that we can update the UI immediately
                                                     // we are going to save it to the local storage so that if user refresh the page we should still keep the track of the state
    },

    setActiveTab: (tab) => set({activeTab:tab}),
    // setSelectedUser: (selectedUser) => set({selectedUser:selectedUser}),
    setSelectedUser: (selectedUser) => set({selectedUser}), // same thing so wrote in short

    getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },



}));