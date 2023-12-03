import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Post } from "./pages/Post"
import { Category } from "./pages/Category"

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </Router>
  )
}

export default App
