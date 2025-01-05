import { Routes,Route } from "react-router";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import Sidebar from "./componets/common/Sidebar";
import RightPanel from "./componets/common/RightPanel";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";




export default function App() {
  return (
    <div className="flex max-w-6xl min-h-screen mx-auto">
      <Sidebar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/notifications" element={<NotificationPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    <RightPanel/>
    </div>
  )
}