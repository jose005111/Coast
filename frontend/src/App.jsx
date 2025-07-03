import { BrowserRouter, NavLink, Route, Routes } from 'react-router'
import Home from './components/pages/Home'
import Container from './components/layout/Container'
import NewProject from './components/pages/NewProject'
import Empresa from './components/pages/Empresa'
import Contacto from './components/pages/Contacto'
import Navbar from './components/layout/Navbar'
import Projects from './components/pages/Projects'
import Footer from './components/layout/Footer'
import Project from './components/pages/Project'

function App() {

  return (
      <BrowserRouter>
        <Navbar />
          <Container> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
          </Container>
          <Footer />
      </BrowserRouter>
  )
}

export default App
