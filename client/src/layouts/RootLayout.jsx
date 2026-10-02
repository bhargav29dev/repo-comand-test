import { Outlet } from 'react-router-dom'
import '../App.css'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
