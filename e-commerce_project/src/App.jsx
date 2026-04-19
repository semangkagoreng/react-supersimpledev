import './App.css'
import {Routes,Route} from 'react-router'
import { Homepage } from './pages/Homepage'
import {Checkout} from './pages/Checkoutpage' ; 
import {Orders} from './pages/Orderspage';
import {Tracking} from './pages/Trackingpage';

function App() {

  return (
    <Routes>
    <Route path="/" element={<Homepage />}></Route>
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/tracking" element={<Tracking />} />q
    </Routes>
  
  )
}


export default App
