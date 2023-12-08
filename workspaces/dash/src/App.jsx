import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PostList } from "./pages/PostList"
import { Category } from "./pages/Category"
import { Publish } from "./pages/Publish"
import { Post } from "./pages/Post"
import { EditPost } from "./pages/EditPost"
import { ModalProvider } from "./context/ModalProvider"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { AlertProvider } from "./context/AlertProvider"

const App = () => {

  return (
    <AlertProvider>
      <ModalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/category" element={<Category />} />
            <Route path="/:mark" element={<Post />} />
            <Route path="/:mark/update" element={<EditPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </ModalProvider>
    </AlertProvider>
  )
}

export default App
