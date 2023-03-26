import { BrowserRouter, Routes,Route } from "react-router-dom";
import "./App.css";
import CreateNote from "./screens/Note/CreateNote";
import Header from "./components/Header";
import LandingPage from "./screens/Landing/LandingPage";
import LoginScreen from "./screens/Login/LoginScreen";
import MyNotes from "./screens/Notes/MyNotes";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import RegisterScreen from './screens/Register/RegisterScreen';
import SingleNote from "./screens/Note/SingleNote";
import Footer from "./components/Footer";
import { useState } from "react";
function App() {
    const [search ,setSearch] = useState("");

  return (
   <BrowserRouter>
    <Header setSearch={(s)=>setSearch(s)}/>
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen/>} />
        <Route path="/mynotes" element={<MyNotes />} />
        <Route path="/note/:id" element={<SingleNote/>} />
        <Route path="/createnote" element={<CreateNote/>} />;
        <Route path="/profile" element={<ProfileScreen/>} />
    </Routes>
    <Footer/>
   </BrowserRouter>
  );
}

export default App;
