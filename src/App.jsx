import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import { ThemeProvider } from "@/components/themeProvider"


function App() {

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
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
