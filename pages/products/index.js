import { useState, useEffect } from 'react';
import Link from 'next/link';
import { commerce } from '../../lib/commerce';
import Wrapper from '../../components/Product/Wrapper';

export default function Bikes() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    commerce.products.list().then((product) => {
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