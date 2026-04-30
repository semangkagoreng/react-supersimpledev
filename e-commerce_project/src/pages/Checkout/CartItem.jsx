import { formatMoney } from "../../utils/money";
import {DeliveryItem} from "./DeliveryItem";
import dayjs from "dayjs";
import axios from 'axios';

export function CartItem({delivery, cart,fetchCart}) {
 
  
  return (
    <>
      {delivery.length > 0 &&
        cart.map((item) => {
          const deliveryOption = delivery.find(
            (option) => option.id === item.deliveryOptionId,
          );

          const deleteCartItem = async () => {
            await axios.delete(`/api/cart-items/${item.productId}`);
            await fetchCart()
          }

          const updateCartItem = async () => {
            await axios.put(`/api/cart-items/${item.productId}`, {
              quantity: 3
            })
            await fetchCart()
          }
          return (
            <div key={item.id} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(deliveryOption?.estimatedDeliveryTimeMs).format(
                  "dddd D MMMM YYYY",
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={item.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{item.product.name}</div>
                  <div className="product-price">
                    {formatMoney(item.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">{item.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary" onClick={updateCartItem}>
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                    onClick={deleteCartItem}
                    >
                      Delete
                    </span>
                  </div>
                </div>

                <div className="delivery-options">
                  <div className="delivery-options-title">
                    Choose a delivery option:
                  </div>
                 <DeliveryItem delivery={delivery} item={item} fetchCart={fetchCart}/>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
