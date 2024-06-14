import { Link } from 'react-router-dom';
import { ProductInShoppingCart } from '../services/shoppingCart.service';
import CartControl from './CartControl';
import CartItemPrice from './CartItemPrice';

type CartItemProps = { product: ProductInShoppingCart };
function CartItem({ product }: CartItemProps) {
  const {
    name = 'No name',
    imageUrl,
    imageLabel,
    productId,
    productKey,
    price,
    quantity,
  } = product;

  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src={imageUrl}
        alt={imageLabel}
        className="w-full rounded-lg sm:w-20 md:w-20"
      />
      <div className="flex flex-col sm:ml-4 sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-moonBlack">
            <Link to={`/product/${productKey}`}>{name}</Link>
          </h2>
        </div>
        <CartControl productId={productId} />
        <CartItemPrice price={price} quantity={quantity} />
      </div>
    </div>
  );
}

export default CartItem;
