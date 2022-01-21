import { commerce } from '../../lib/commerce';
import Wrapper from '../../components/Product/Wrapper';

export async function getStaticProps() {
  const { data: products } = await commerce.products.list();

  return {
    props: {
      products
    }
  }
}

export default function Bikes({ products }) {
  return (
    <>
      <Wrapper items={products} />
    </>
  );
}