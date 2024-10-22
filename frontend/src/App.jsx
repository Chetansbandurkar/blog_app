import { Routes, Route } from "react-router-dom"
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPosts from "./pages/EditPosts";
import Profile from "./pages/Profile";
import { UserContextProvider } from "./context/UserContext";
import MyBlogs from "./pages/MyBlogs";
const app = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/posts/post/:id' element={<PostDetails />} />
        <Route exact path='/write' element={<CreatePost />} />
        <Route exact path='/edit/:id' element={<EditPosts />} />
        <Route exact path='/profile/:id' element={<Profile />} />
        <Route exact path='/myblogs/:id' element={<MyBlogs/>} />

      </Routes>
    </UserContextProvider>


  )
}

export default app;
