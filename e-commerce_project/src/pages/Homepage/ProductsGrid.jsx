
import { Product } from "./Product";
import React from "react";

export function ProductsGrid({ products, fetchCart }) {

  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
         <Product key={product.id} product={product} fetchCart={fetchCart} />
        );
      })}
    </div>
  );
}
