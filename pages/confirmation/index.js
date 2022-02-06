import withAuth from '../../HOC/withAuth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Confirmation() {

  const router = useRouter();
  // const [customerReceipt, setCustomerReceipt] = useState(null);

  // useEffect(() => {
  //   if(!localStorage.getItem('receipt')) router.replace('/');

  //   const receipt = JSON.parse(localStorage.getItem('receipt'));
  //   setCustomerReceipt(receipt);
  // }, []);

  const removeReceipt = () => {
    localStorage.removeItem('receipt');
    router.push('/');
  };

  return (
    <>
      <p>Hello confirmation</p>
      <button type="button" onClick={removeReceipt}>
        Back to home page
      </button>
    </>
  );
};

export default withAuth(Confirmation);