import { commerce } from '../../lib/commerce';
import Wrapper from '../../components/Product/Wrapper';

export async function getStaticProps({ params }) {
  const { slug } = params;
  const { data: products } = await commerce.products.list({ category_slug: [slug] });
  return {
    props: {
      products
    }
  }
}

export async function getStaticPaths() {
  const { data: categories } = await commerce.categories.list();

  return {
    paths: categories.map(category => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: false,
  };
}

export default function Categories({ products }) {
  return (
    <Wrapper items={products} />
  )
}