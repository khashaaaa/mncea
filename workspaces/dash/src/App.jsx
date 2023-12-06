import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PostList } from "./pages/PostList"
import { Category } from "./pages/Category"
import { Publish } from "./pages/Publish"
import { Post } from "./pages/Post"

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/category" element={<Category />} />
        <Route path="/:mark" element={<Post />} />
      </Routes>
    </Router>
  )
}

export default App
