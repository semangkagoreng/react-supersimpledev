import './App.css'
import {Routes,Route} from 'react-router'
import { Homepage } from './pages/Homepage'
import {Checkout} from './pages/Checkoutpage' ; 
import {Orders} from './pages/Orderspage';
import {Tracking} from './pages/Trackingpage';
import axios from 'axios';
import {useState, useEffect} from 'react'

function App() {

  const [cart,setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      let response = await axios.get('/api/cart-items?expand=product')
      setCart(response.data);
    }
    fetchCart()
  },[])

  return (
    <Routes>
    <Route path="/" element={<Homepage cart={cart} />}></Route>
    <Route path="/checkout" element={<Checkout cart={cart}/>} />
    <Route path="/orders" element={<Orders cart={cart}/>} />
    <Route path="/tracking" element={<Tracking />} />q
    </Routes>
  
  )
}


export default App
