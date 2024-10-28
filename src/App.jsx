import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import { ThemeProvider } from "@/components/themeProvider"
import Login from './pages/Login'
import ProtectedRoute from './ProtectedRoute'
import Contact from './pages/Contact'
import Tickets from './pages/Tickets'

function App() {

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute element={Layout} />}>
              <Route path='/' element={<Navigate to="/dashboard" replace={true} />} />
              <Route path='dashboard' element={<ProtectedRoute element={Dashboard} />} />
              <Route path='contact' element={<ProtectedRoute element={Contact} />} />
              <Route path='tickets' element={<ProtectedRoute element={Tickets} />} />
              <Route element="" />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
