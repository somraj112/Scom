import React, { useState, useEffect } from 'react';

const Products = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setItems(data.products);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-6 p-6 justify-center">
  {items.map((product) => (
    <div
      key={product.id}
      className="w-64 flex flex-col justify-between border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md mb-3"
      />

      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <p className="text-green-600 font-bold">Price: ${product.price}</p>
        <p className="text-yellow-600 font-semibold text-sm">
          {product.rating}⭐
        </p>
      </div>
    </div>
  ))}
</div>

  );
};

export default Products;

