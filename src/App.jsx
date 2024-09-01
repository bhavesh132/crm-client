import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import { ThemeProvider } from "@/components/themeProvider"
import Login from './pages/Login'
import ProtectedRoute from './ProtectedRoute'

function App() {
  const isAuthenticated = () => {

  }

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute element={Layout} />}>
              <Route path='/' element={<Navigate to="/dashboard" replace={true} />} />
              <Route path='dashboard' element={<ProtectedRoute element={Dashboard} />} />
              <Route element="" />
              <Route element="" />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
