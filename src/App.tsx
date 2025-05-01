import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Portfolio from './components/Portfolio'
import ContactSidebar from './components/ContactSidebar'
import PersonalInterests from './components/PersonalInterests'


function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <Navigation />
        </header>
        <main>
          {/* <PersonalInterests /> */}
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </main>
        <ContactSidebar />
      </div>
    </Router>
  )
}

export default App
