// import calculatePizzaPrice from './calculatePizzaPrice';

// export default function calculateOrderTotal(order, pizzas) {
//   if (order !== null) {
//     const total = parseInt(order).reduce((runningTotal, singleOrder) => {
//       const pizza = pizzas.find(
//         (singlePizza) => singlePizza.id === singleOrder.id
//       );

//       return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
//     }, 0);
//     return total;
//   }
// }

import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  console.log(order);
  console.log(pizzas);
  // return order.reduce((runningTotal, singleOrder) => {
  //   const pizza = pizzas.find(
  //     (singlePizza) => singlePizza.id === singleOrder.id
  //   );
  //   return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  // }, 0);
  let total = 0;
  if (order) {
    for (const singlePizza of pizzas) {
      const { id, size } = order;
      if (singlePizza.id === id) {
        total += calculatePizzaPrice(singlePizza.price, size);
      }
    }
  }

  return total;
}
