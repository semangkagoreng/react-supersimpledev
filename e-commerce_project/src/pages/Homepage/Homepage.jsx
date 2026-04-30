import "./Homepage.css";
import axios from 'axios'
import { useEffect,useState } from "react";
import { Header } from "../../components/header";
import { ProductsGrid } from "./ProductsGrid";
import React from "react";

export const Homepage = ({cart,fetchCart}) => {
  const [products,setProducts] = useState([]);
  
useEffect(() => { 
  const fetchCart = async () => {
    try{
      const response = await axios.get('/api/products')
      setProducts(response.data)
    }
    catch(e){
      console.error(e);
    }
  }
  fetchCart()
},[])
   
 

  return (
    <>
      <title>Homepage</title>
      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={products} fetchCart={fetchCart} />
      </div>
    </>
  );
};
