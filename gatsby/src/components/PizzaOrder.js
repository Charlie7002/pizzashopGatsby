import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formayMoney';

export default function PizzaOrder({ order = [], pizzas, removeFormOrder }) {
  return (
    <>
      {order.map((singleOrder, i) => {
        const orderPizza = pizzas.find((pizza) => pizza.id === singleOrder.id);

        return (
          <MenuItemStyles key={`${singleOrder.id}+${i}`}>
            <Img fluid={orderPizza.image.asset.fluid} />
            <h2>{orderPizza.name}</h2>
            <p>
              {formatMoney(
                calculatePizzaPrice(orderPizza.price, singleOrder.size)
              )}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${orderPizza.name} from Order`}
                onClick={() => removeFormOrder(i)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
