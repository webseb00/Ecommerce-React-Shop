import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Product() {
  const router = useRouter();
  console.log(router.query);

  return (
    <>
      <p>Bike ID:</p>
      <a onClick={() => router.back()}>Go back</a>
    </>
  )
}