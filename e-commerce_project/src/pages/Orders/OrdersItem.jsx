
import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import { Fragment } from "react";
import axios from "axios";

export function OrdersItem({orders,fetchCart}){
    
    return (
        <>
         {orders.map((orderItem) => {
    return (
        <div className="order-container" key={orderItem.id}>
          <div className="order-header">
            <div className="order-header-left-section">
              <div className="order-date">
                <div className="order-header-label">Order Placed:</div>
                <div>{dayjs(orderItem.orderTimeMs).format('MMMM YYYY')}</div>
              </div>
              <div className="order-total">
                <div className="order-header-label">Total:</div>
                <div>{formatMoney(orderItem.totalCostCents)}</div>
              </div>
            </div>

           
            <div className="order-header-right-section">
              <div className="order-header-label">Order ID:</div>
              <div>{orderItem.id}</div>
            </div>
          </div>

          <div className="order-details-grid">

          {orderItem.products.map((product) => {
            const addToCart = async () => {
              await axios.post("/api/cart-items",{
                productId:product.productId,
                quantity:product.quantity
              });
              await fetchCart()
            }

            
            return (
            <Fragment key={product.productId} >
            <div className="product-image-container">
              <img src={product.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {product.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(product.estimatedDeliveryTimeMs).format('DD MMMM YYYY')}
              </div>
              <div className="product-quantity">
                Quantity: {product.quantity}
              </div>
              <button className="buy-again-button button-primary" onClick={addToCart}>
                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                <span className="buy-again-message" >Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <a href="/tracking">
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
            
          </Fragment>
            )
          })}


          </div>
        </div>
      
      )
        })}
        
        </>
    )
}