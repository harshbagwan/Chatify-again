import { XIcon, ArrowLeft } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers} = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };                                             

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div
      className="flex justify-between items-center bg-slate-800/50 border-b
   border-slate-700/50 h-16 md:h-20 px-3 md:px-6 flex-shrink-0"
    >
      <div className="flex items-center space-x-3 min-w-0">
        {/* MOBILE BACK BUTTON */}
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden text-slate-400 hover:text-slate-200 p-1 -ml-1"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className={`avatar ${isOnline ? 'online' : 'offline'} flex-shrink-0`}>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-slate-200 font-medium text-sm md:text-base truncate">{selectedUser.fullName}</h3>
          <p className="text-slate-400 text-xs">{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>

      <button onClick={() => setSelectedUser(null)} className="flex-shrink-0 ml-2">
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
}
export default ChatHeader;      