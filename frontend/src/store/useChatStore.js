import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  // we are returning a object inside the callback function of create() method, which will be the initial state of our store
  allContacts: [], // initial state of allContacts is an empty array
  chats: [], // initial state of chats is an empty array
  messages: [],
  activeTab: "chats", // initial state of activeTab is "chats"
  selectedUser: null, // initial state of selectedUser is null
  isUsersLoading: false, // initial state of isUserLoading is false
  isMessagesLoading: false, // initial state of isMessageLoading is false
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    // localStorage.setItem("isSoundEnabled",get().isSoundEnabled ? false : true);
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled); // first we are getting the current value of isSoundEnabled from the store using get() method, then we are negating it using ! operator and then we are setting the new value of isSoundEnabled in the llLOCAL ssSTORAGE using setItem() method
    set({ isSoundEnabled: !get().isSoundEnabled }); // here we are updating the ssSTATE of isSoundEnabled in the store using set() method, we are getting the current value of isSoundEnabled from the store using get() method and then we are negating it using ! operator and then we are setting the new value of isSoundEnabled in the store
    // first we updated the local storage and then we updated the state of the store, so that when the user refreshes the page, the state of isSoundEnabled will be persisted in the local storage and we can get it from there and set it in the store when the app loads
    // first we updated the local storage and then we also updated the state so that we can update the UI immediately
    // we are going to save it to the local storage so that if user refresh the page we should still keep the track of the state
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  // setSelectedUser: (selectedUser) => set({selectedUser:selectedUser}), 
  setSelectedUser: (selectedUser) => set({ selectedUser }), // {selectedUser:selectedUser} same h ,,same thing so wrote in short

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

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {                   
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic messages (optional)
    };
    // immidetaly update the ui by adding the message
    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      // replace the optimistic message with the real server response
      set({
        messages: get().messages.map((msg) =>
          msg._id === tempId ? res.data : msg
        ),
      });
    } catch (error) {
      // remove optimistic message on failure
      set({ messages: get().messages.filter((msg) => msg._id !== tempId) });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // helper to attach the newMessage listener
    const attachMessageListener = () => {
      socket.off("newMessage"); // remove existing to prevent duplicates
      socket.on("newMessage", (newMessage) => {
        const currentSelectedUser = get().selectedUser;
        if (!currentSelectedUser || newMessage.senderId !== currentSelectedUser._id) return;
        const currentMessages = get().messages;
        set({ messages: [...currentMessages, newMessage] });

        if (get().isSoundEnabled) {
          const notificationSound = new Audio("/sounds/notification.mp3");
          notificationSound.currentTime = 0;
          notificationSound.play().catch((e) => console.log("Audio play failed:", e));
        }
      });
    };

    // attach listener now
    attachMessageListener();

    // remove old reconnect handler if exists (use specific reference, NOT socket.off("connect"))
    const oldReconnectHandler = get()._reconnectHandler;
    if (oldReconnectHandler) {
      socket.off("connect", oldReconnectHandler);
    }

    // re-attach listener + fetch missed messages on socket reconnect
    const reconnectHandler = () => {
      console.log("Socket reconnected, re-subscribing to messages");
      attachMessageListener();
      const currentSelectedUser = get().selectedUser;
      if (currentSelectedUser) {
        get().getMessagesByUserId(currentSelectedUser._id);
      }
    };
    socket.on("connect", reconnectHandler);
    set({ _reconnectHandler: reconnectHandler });

    // re-fetch messages when tab becomes visible again (mobile tab sleep)
    const oldVisibilityHandler = get()._visibilityHandler;
    if (oldVisibilityHandler) {
      document.removeEventListener("visibilitychange", oldVisibilityHandler);
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const currentSelectedUser = get().selectedUser;
        if (currentSelectedUser) {
          get().getMessagesByUserId(currentSelectedUser._id);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    set({ _visibilityHandler: handleVisibilityChange });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
      // remove ONLY our specific reconnect handler, not all "connect" listeners
      const reconnectHandler = get()._reconnectHandler;
      if (reconnectHandler) {
        socket.off("connect", reconnectHandler);
        set({ _reconnectHandler: null });
      }
    }
    // clean up visibility listener
    const handler = get()._visibilityHandler;
    if (handler) {
      document.removeEventListener("visibilitychange", handler);
      set({ _visibilityHandler: null });
    }
  },

}));
 