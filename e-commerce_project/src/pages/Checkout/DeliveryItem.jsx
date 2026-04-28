import { formatMoney } from "../../utils/money";
import axios from 'axios'
import dayjs from 'dayjs';

export function DeliveryItem({ delivery, item, fetchCart }) {
  const updateDeliveryOption = async (deliveryOptionId) => {
    await axios.put(`/api/cart-items/${item.productId}`, {
      deliveryOptionId
    });
    await fetchCart();
  };

  return (
    <>
      {delivery.map((deliveryItem) => {
        let priceString = "FREE Shipping";

        if (deliveryItem.priceCents > 0) {
          priceString = `${formatMoney(deliveryItem.priceCents)} - Shipping`;
        }

        return (
          <div key={deliveryItem.id} className="delivery-option">
            <input
              type="radio"
              checked={deliveryItem.id === item.deliveryOptionId}
              className="delivery-option-input"
              onChange={() => updateDeliveryOption(deliveryItem.id)}
              name={`delivery-option-${item.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryItem.estimatedDeliveryTimeMs).format(
                  "dddd MMMM YYYY"
                )}
              </div>
              <div className="delivery-option-price">
                {priceString}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}