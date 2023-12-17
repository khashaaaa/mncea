import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Landing } from './pages/Landing'
import { Post } from "./pages/Post"

export const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/post/:mark" element={<Post />} />
      </Routes>
    </Router>
  )
}