import './checkout-header.css';
import './checkout.css'
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect,useState } from 'react';
import { formatMoney } from '../utils/money';

export function Checkout({cart}){

  const [delivery,setDelivery] = useState([]);
  const [paymentSummary,setPaymentSummary] = useState(null)

  useEffect(() => {
    const fetchDelivery = async () => {
     const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
     setDelivery(response.data)
    }
    const fetchPaymentSummary = async () => {
      const response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data)
    }

    fetchPaymentSummary();
    fetchDelivery();
  },[])

    return <>
    <title>Checkout</title>

      <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <a href="/">
            <img className="logo" src="images/logo.png" />
            <img className="mobile-logo" src="images/mobile-logo.png" />
          </a>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<a className="return-to-home-link"
            href="/">3 items</a>)
        </div>

        <div className="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png" />
        </div>
      </div>
    </div>

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        <div className="order-summary">
            
          {delivery.length > 0 && cart.map((item) => {

            const deliveryOption = delivery.find((option) => option.id === item.deliveryOptionId);
            return (
          <div key={item.id} className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {dayjs(deliveryOption?.estimatedDeliveryTimeMs).format('dddd D MMMM YYYY')}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={item.product.image} />

              <div className="cart-item-details">
                <div className="product-name">
                  {item.product.name}
                </div>
                <div className="product-price">
                  {formatMoney(item.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{item.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
              {delivery.map((deliveryItem) => {
             let priceString = 'FREE SHIPPING'

                if(deliveryItem.priceCents > 0){
                  priceString = `${formatMoney(deliveryItem.priceCents)} - Shipping `
                }
                return (
                <div key={deliveryItem.id} className="delivery-option">
                  <input type="radio" checked={deliveryItem.id === item.deliveryOptionId}
                    className="delivery-option-input"
                    name={`delivery-option-${deliveryItem.id}`}  />
                  <div>
                    <div className="delivery-option-date">
                      {dayjs(deliveryItem.estimatedDeliveryTimeMs).format('dddd MMMM YYYY')}
                    </div>
                    <div className="delivery-option-price">
                      {priceString}
                    </div>
                  </div>
                </div>
                )
              })}
              </div>
            </div>
          </div>
            )
          })}


        </div>

        <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

          {paymentSummary && (
            <>
            <div className="payment-summary-row">
              <div>Items ({paymentSummary.totalItems}):</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
            </>
          )}
            
        </div>
      </div>
    </div>
    </>
}