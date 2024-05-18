import React from 'react';
import { observer } from 'mobx-react-lite';
import { cartStore } from '@stores/CartStore';
import styles from './Cart.module.scss';
import Text from '@components/Text';
import Header from '@components/Header';
import { action } from 'mobx';
import Card from '@components/Card';
import Button from '@components/Button/Button';
import defaultImage from '@assets/defaultImage.jpeg';

const Cart = observer(() => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = cartStore;

  return (
    <div>
      <Header />
      <Text tag="h2">Cart</Text>
      <div className={styles.cart_wrapper}>
        {cartItems.length === 0 ? (
          <Text view="p-20" tag="h4">
            Your cart is empty.
          </Text>
        ) : (
          <>
            <ul className={styles.cart_list}>
              {cartItems.map((item) => (
                <li className={styles.li} key={item.product.id}>
                  <Card
                    image={item.product.images.length >= 2 ? item.product.images[1] : defaultImage}
                    captionSlot={item.product.category.name}
                    title={item.product.title}
                    subtitle={item.product.description}
                    contentSlot={<div>${item.product.price * item.quantity}</div>}
                    actionSlot={<Button onClick={action(() => removeFromCart(item.product.id))}>Remove</Button>}
                  />
                  <div className={styles.round_btns}>
                    <button className={styles.round_btn} onClick={action(() => decreaseQuantity(item.product.id))}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button className={styles.round_btn} onClick={action(() => increaseQuantity(item.product.id))}>
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        {cartStore.cartTotal > 0 && (
          <div className={styles.cart_total}>
            <Text view="p-20" tag="h4">
              Total price: ${cartStore.cartTotal}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
});

export default Cart;
