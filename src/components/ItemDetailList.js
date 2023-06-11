import { useState } from 'react';

const ItemList = ({ items }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          <button onClick={() => addToCart(item)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
};
