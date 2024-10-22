import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalCost = 0;
    
    cart.forEach(element => {
      const costNumber = parseFloat(element.cost.replace('$', ''));
      totalCost += element.quantity * costNumber;
    });
    return totalCost;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({name: item.name, quantity: item.quantity + 1}));
  };

  const handleDecrement = (item) => {
    const isQuantityZero = item.quantity - 1;
    if (isQuantityZero !== 0) {
      dispatch(updateQuantity({name: item.name, quantity: isQuantityZero}));
    } else {
      dispatch(removeItem({name: item.name}));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({name: item.name}));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    console.log(item);
    const costNumber = parseFloat(item.cost.replace('$', ''));
    return costNumber * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


