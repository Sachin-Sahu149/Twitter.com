import { Routes,Route, Navigate } from "react-router";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import Sidebar from "./componets/common/Sidebar";
import RightPanel from "./componets/common/RightPanel";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./componets/common/LoadingSpinner";




export default function App() {

  const{isLoading,isError,data:authUser} = useQuery({
    queryKey:['authUser'],
    queryFn:async()=>{
      try {
        const res = await fetch('/api/auth/me',{
          method:'GET'
        });

        const data = await res.json();
        if(data.error) return null;
        if(!res.ok)throw new Error(data.error || 'Something went wrong');
        return data;
        
      } catch (error) {
        console.log("error in app :",error);
        throw error;
      }
    },
    retry:false,
  })

  console.log(authUser);

  if(isLoading){
    return <div className=" min-h-screen flex justify-center items-center">
          <LoadingSpinner size="lg"/>
    </div>
  }

  return (
    <div className="flex max-w-6xl min-h-screen mx-auto">
      {authUser && <Sidebar/>}
      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to={'/login'}/>}/>
        <Route path="/login" element={!authUser ?<LoginPage/> : <Navigate to={'/'}/>}/>
        <Route path="/signup" element={!authUser ? <SignUpPage/>:<Navigate to={'/'}/>}/>
        <Route path="/notifications" element={authUser ?<NotificationPage/>:<Navigate to={'/login'}/>}/>
        <Route path="/profile/:username" element={authUser ?<ProfilePage/>:<Navigate to={'/login'} />}/>
      </Routes>
    {authUser && <RightPanel/>}
    <Toaster/>
    </div>
  )
}