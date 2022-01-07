import Link from 'next/link';
import Product from './product';

export default function Bikes() {
  return (
    <>
      <h4>Bikes List:</h4>
      <Link href="/products/bikes/product?id=1234">
        <a>Go to pages/products/bikes/</a>
      </Link>
    </>
  );
}