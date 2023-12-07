import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PostList } from "./pages/PostList"
import { Category } from "./pages/Category"
import { Publish } from "./pages/Publish"
import { Post } from "./pages/Post"
import { EditPost } from "./pages/EditPost"
import { ModalProvider } from "./context/ModalProvider"

const App = () => {

  return (
    <ModalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/category" element={<Category />} />
          <Route path="/:mark" element={<Post />} />
          <Route path="/:mark/update" element={<EditPost />} />
        </Routes>
      </Router>
    </ModalProvider>
  )
}

export default App
