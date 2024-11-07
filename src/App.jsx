import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import { ThemeProvider } from "@/components/themeProvider"
import Login from './pages/Login'
import ProtectedRoute from './ProtectedRoute'
import Contact from './pages/Contact'
import Tickets from './pages/Tickets'
import NotFound from './pages/generics/NotFound'
import Home from './pages/Home'
import Task from './pages/Task'
import ContactDetailsPage from './features/contacts/ContactDetail'
import TicketDetail from './features/tickets/TicketDetail'

function App() {

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute element={Layout} />}>
              <Route path='/' element={<Navigate to="/home" replace={true} />} />
              <Route path='home' element={<ProtectedRoute element={Home} />} />
              <Route path='contact' element={<ProtectedRoute element={Contact} />} />
              <Route path='contact/:id' element={<ProtectedRoute element={ContactDetailsPage} />} />
              <Route path='tickets' element={<ProtectedRoute element={Tickets} />} />
              <Route path='tickets/:id' element={<ProtectedRoute element={TicketDetail} />} />
              <Route path='tasks' element={<ProtectedRoute element={Task} />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
