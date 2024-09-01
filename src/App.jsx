import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import { ThemeProvider } from "@/components/themeProvider"
import Login from './pages/Login'
import Cookies from 'js-cookie'

function App() {
  const isAuthenticated = () => {
    const user = localStorage.getItem("user")
    if (user) {
      return True
    }

  }

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<Layout />}>
              <Route path='/' element={<Navigate to="/dashboard" replace={true} />} />
              <Route path='dashboard' element={<Dashboard />} />
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
