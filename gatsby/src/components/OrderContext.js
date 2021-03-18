import React, { useState } from 'react';

// create a order context
const initialstate = { order: [] };
const OrderContext = React.createContext(initialstate);

// stick state in here
export function OrderProvider({ children }) {
  const [order, setOrder] = useState([]);
  // don t forget pass value props to provider!!!!!

  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
