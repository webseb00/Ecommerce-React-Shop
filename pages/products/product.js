import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchSingleProduct } from '../../lib/commerce';
import ProductPage from '../../components/Product/ProductPage/ProductPage';

export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if(!id) {
      return false;
    }
    const item = fetchSingleProduct(id);
    item.then(product => setProduct(product));
  }, [id]);


  return (
    <>
      {product && <ProductPage product={product} />}
    </>
  )
}