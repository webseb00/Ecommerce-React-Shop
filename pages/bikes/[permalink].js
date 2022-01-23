import { commerce } from '../../lib/commerce';
import ProductPage from '../../components/Product/ProductPage/ProductPage';

export async function getStaticProps({ params }) {
  const { permalink } = params;
  const product = await commerce.products.retrieve(permalink, { type: 'permalink' });
  
  return {
    props: {
      product
    }
  }
}

export async function getStaticPaths() {
  const { data: products } = await commerce.products.list();

  return {
    paths: products.map(product => ({
      params: {
        permalink: product.permalink,
      },
    })),
    fallback: false,
  };
}

export default function Product({ product }) {
  return (
    <>
      <ProductPage product={product} />
    </>
  )
}