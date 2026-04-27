import './App.css'
import {Routes,Route} from 'react-router'
import { Homepage } from './pages/Homepage/Homepage'
import {Checkout} from './pages/Checkout/Checkoutpage' ; 
import {Orders} from './pages/Orders/Orderspage';
import {Tracking} from './pages/Trackingpage';
import axios from 'axios';
import {useState, useEffect} from 'react'

function App() {

  const [cart,setCart] = useState([]);

  const fetchCart = async () => {
    let response = await axios.get('/api/cart-items?expand=product')
    setCart(response.data);
  }
  useEffect(() => {
    fetchCart()
  },[])

  return (
    <Routes>
    <Route path="/" element={<Homepage cart={cart} fetchCart={fetchCart}/>}></Route>
    <Route path="/checkout" element={<Checkout cart={cart} fetchCart={fetchCart}/>} />
    <Route path="/orders" element={<Orders cart={cart}/>} />
    <Route path="/tracking" element={<Tracking />} />q
    </Routes>
  
  )
}


export default App
