import React, { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import { LayoutLoader } from './components/layout/Loaders'

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

let user = true;

function App() {
  return (
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
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
    </Router>

  )
}

export default App
