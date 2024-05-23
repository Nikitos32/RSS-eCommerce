import { ButtonSignUp } from '../UI/ButtonSignUp/ButtonSignUp';
import './productPage.css';

export const ProductPage = () => {
  return (
    <div className="productPage">
      <article className="product">
        <section className="product__component productImg">
          <img src="" alt="Product" />
          <div></div>
        </section>
        <section className="product__component productData">
          <div className="productData__title">
            <div className="font-bold">Marin White Dinner Plate</div>
            <div className="font-medium">
              <span className="mr-4">$35</span>
              <span className="text-moonNeutral-500">$50</span>
            </div>
          </div>
          <div>
            <ButtonSignUp
              btnContent="ADD TO CARD"
              customClass="productData__toCard"
            />
          </div>
          <div></div>
        </section>
      </article>
    </div>
  );
};