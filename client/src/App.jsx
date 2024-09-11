import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './routes/Home/Home';
import About from './routes/About/About';
import Header from './components/Header';
import Footer from './components/Footer';
import AddNNote from './routes/Add-Note/Add-Note';
import UpdateNote from './routes/Update-Note/UpdateNote';

function App() {
  

  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-note' element={<AddNNote/>} />
        <Route path='/note/:id' element={<UpdateNote />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
