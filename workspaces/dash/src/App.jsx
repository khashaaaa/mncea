import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PostList } from "./pages/PostList"
import { SpecialCategory } from "./pages/SpecialCategory"
import { Publish } from "./pages/Publish"
import { Post } from "./pages/Post"
import { EditPost } from "./pages/EditPost"
import { ModalProvider } from "./context/ModalProvider"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { AlertProvider } from "./context/AlertProvider"
import { MenuProvider } from "./context/MenuProvider"
import { UserControl } from "./pages/UserControl"
import { HeadCategory } from "./pages/HeadCategory"
import { PageList } from "./pages/PageList"
import { CreatePage } from "./pages/CreatePage"
import { EditPage } from "./pages/EditPage"

const App = () => {

  return (
    <AlertProvider>
      <ModalProvider>
        <MenuProvider>
          <Router>
            <Routes>
              <Route path="/" element={<PageList />} />
              <Route path="/createpage" element={<CreatePage />} />
              <Route path="/post" element={<PostList />} />
              <Route path="/publish" element={<Publish />} />
              <Route path="/headcategory" element={<HeadCategory />} />
              <Route path="/specialcategory" element={<SpecialCategory />} />
              <Route path="/post/:mark" element={<Post />} />
              <Route path="/post/:mark/update" element={<EditPost />} />
              <Route path="/page/:mark/update" element={<EditPage />} />
              <Route path="/usercontrol" element={<UserControl />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        </MenuProvider>
      </ModalProvider>
    </AlertProvider>
  )
}

export default App
