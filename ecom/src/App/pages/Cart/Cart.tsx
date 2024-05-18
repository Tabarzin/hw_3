import React from 'react';
import { observer } from 'mobx-react-lite';
import { cartStore } from '@stores/CartStore';
import styles from './Cart.module.scss';
import Text from '@components/Text';
import Header from '@components/Header';
import { action } from 'mobx';
import Card from '@components/Card';
import Button from '@components/Button/Button';

// const Cart = observer(() => {
//   const { cart, removeFromCart, cartTotal } = cartStore;

//   return (
//     <div>
//       <Header />
//       <Text tag="h2">Cart</Text>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul>
//             {cart.map((item) => (
//               <li key={item.id}>
//                 {item.title} - ${item.price} {item.id} <button onClick={() => removeFromCart(item.id)}>Remove</button>
//               </li>
//             ))}
//           </ul>
//           <p>Total: ${cartTotal}</p>
//         </>
//       )}
//     </div>
//   );
// });

// export default Cart;

const Cart = observer(() => {
  const { cartItems, removeFromCart } = cartStore;

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
                <li key={item.id}>
                  <Card
                    image={item.images[1]}
                    captionSlot={item.category.name}
                    title={item.title}
                    subtitle={item.description}
                    contentSlot={`$${item.price}`}
                    actionSlot={<Button onClick={action(() => removeFromCart(item.id))}>Remove</Button>}
                  />
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
