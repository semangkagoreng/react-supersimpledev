import './orders.css'
import { Header } from '../../components/header';
import {useState,useEffect,Fragment} from 'react';
import axios from 'axios';
import {OrdersItem} from './OrdersItem'


export function Orders({cart}){
    const [orders,setOrders] = useState([]);
    
    useEffect(() => {
      const fetchOrders = async () => {
        const response = await axios.get('/api/orders?expand=products');
        setOrders(response.data)
      }
      fetchOrders()
    }, [])
    
    
    
    return <> 
    <title>Orders</title>

    <Header cart={cart}/>

    <div className="orders-page">
      <div className="page-title">Your Orders</div>

      <div className="orders-grid">

    <OrdersItem orders={orders}/>
       
      </div>
    </div>
    </>
}