import { useRouter } from 'next/router';

const withAuth = (Component) => {
  return () => {

    if(typeof window !== 'undefined') {
      const router = useRouter();

      const receipt = localStorage.getItem('receipt');

      if(!receipt) {
        router.replace('/');
        return null;
      }

      return <Component />;

    }

    return null;
  }
}

export default withAuth;