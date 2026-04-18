import './App.css'
import {Routes,Route} from 'react-router'
import { Homepage } from './pages/Homepage'
import {Checkout} from './pages/Checkoutpage' ; 

function App() {

  return (
    <Routes>
    <Route path="/" element={<Homepage />}></Route>
    <Route path="/checkout" element={<Checkout />} />
    </Routes>
  
  )
}


export default App
