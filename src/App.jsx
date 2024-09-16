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
          <Route path='/hidden/admin/dashbord' element={<DashBoard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>

  )
}

export default App
