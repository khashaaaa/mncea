import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Landing } from './pages/Landing'
import { Page } from "./pages/Page"
import { PostMid } from "./pages/PostMid"
import { PostSub } from "./pages/PostSub"

export const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/page/:page" element={<Page />} />
        <Route path="/post/mid/:mark" element={<PostMid />} />
        <Route path="/post/sub/:mark" element={<PostSub />} />
      </Routes>
    </Router>
  )
}