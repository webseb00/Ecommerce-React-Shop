import { useEffect } from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../HOC/withAuth';
import OrderConfirm from '../../components/OrderConfirm/OrderConfirm';

function Confirmation() {

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      localStorage.removeItem('receipt');
    }

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    }
  }, []);

  return <OrderConfirm />;
};

export default withAuth(Confirmation);