import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CreatePost from "./pages/CreatePost";
import Profiles from "./pages/Profiles";
import EditPost from './components/EditPost'
import DeletePost from './components/DeletePost'
import SinglePost from "./components/SinglePost";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profiles />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/editPost/:postId" element={<EditPost />} />
        <Route path="/deletePost/:postId" element={<DeletePost />} />
      </ Routes>
    </BrowserRouter>
  );
}

export default App;
