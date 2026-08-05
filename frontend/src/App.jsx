import React from "react";
import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  // const [user, setUser] = React.useState(null);
  // const [myName, setMyName] = useState("Diddy Patel");
  //if you want to have a state that is global we always need to create it in the parent component and they share with the child component through props. In this case, App.jsx is the parent component and ChatPage.jsx is the child component. So we create a state in App.jsx and share it with ChatPage.jsx through props.

  const { authUser, isLoggedIn, login } = useAuthStore();
  console.log("authUser", authUser);
  console.log("isloggedIn", isLoggedIn);
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <button onClick={login} className="z-10">login</button>
      <Routes>
        {/* <Route path="/" element={<ChatPage myName={myName} />} />
      <Route path="/login" element={<LoginPage myName={myName}/>} /> */}
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
