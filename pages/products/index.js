import { useState, useEffect } from 'react';
import { fetchAllProducts } from '../../lib/commerce';
import Wrapper from '../../components/Product/Wrapper';

export default function Bikes() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = fetchAllProducts();
    items.then(product => {
      const { data } = product;
      setItems(data);
    });
  }, []);

  return (
    <>
      <Wrapper items={items} />
    </>
  );
}