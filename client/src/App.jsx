import axios from 'axios'
import React, { lazy, Suspense, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import { LayoutLoader } from './components/layout/Loaders'
import { server } from './constants/config'
import { userExists, userNOtExists } from './redux/reducer/auth'
import { SocektProvider } from './socket'


const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Chat = lazy(() => import("./pages/Chat"))
const Groups = lazy(() => import("./pages/Group"))
const NotFound = lazy(() => import("./pages/NotFound"))

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"))
const DashBoard = lazy(() => import("./pages/admin/DashBoard"))
const UserManagement = lazy(() => import("./pages/admin/UserManagement"))
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"))
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"))


function App() {

  const { user, loader } = useSelector((state) => state.auth)

  const disPatch = useDispatch()

  useEffect(() => {
    axios.get(`${server}/api/v1/users/me`, { withCredentials: true })
      .then(({ data }) => disPatch(userExists(data.user)))
      .catch((err) => disPatch(userNOtExists()))

  }, [disPatch])

  return loader ? <LayoutLoader />
    :
    (
      <BrowserRouter>
        <Suspense fallback={<LayoutLoader />}>
          <Routes>
            <Route element={<SocektProvider><ProtectRoute user={user} /></SocektProvider>}>
              <Route path='/' element={<Home />} />
              <Route path='/chat/:chatId' element={<Chat />} />
              <Route path='/groups' element={<Groups />} />
            </Route>

            <Route path='/login'
              element={
                <ProtectRoute user={!user} redirect='/'>
                  <Login />
                </ProtectRoute>}
            />

            <Route path='/hidden/admin' element={<AdminLogin />} />
            <Route path='/hidden/admin/dashboard' element={<DashBoard />} />

            <Route path='/hidden/admin/users' element={<UserManagement />} />
            <Route path='/hidden/admin/messages' element={<MessageManagement />} />
            <Route path='/hidden/admin/chats' element={<ChatManagement />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster position='bottom-center' />
      </BrowserRouter>

    )
}

export default App
