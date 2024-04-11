import { Routes, Route } from 'react-router-dom'
import './App.css'
// import Header from './Header'
import './index.css'
// import Post from './Pages/Post'
import Layout from './Layout'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { UserContextProvider } from './userContext'
import CreatePost from './Pages/CreatePost'
import IndexPage from './Pages/IndexPage'
import PostPage from './Pages/PostPage'
import EditPost from './Pages/EditPost'

function App() {

  return (
    <>
    <UserContextProvider>

      <Routes>

        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />

          
        </Route>
      </Routes>

    </UserContextProvider>

    </>


  )
}

export default App
