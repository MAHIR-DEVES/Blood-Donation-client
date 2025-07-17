import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './checkoutForm.css';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Shared/LoadingSpinner';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [amount, setAmount] = useState(0);

  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/user/${user?.email}`
      );
      return data;
    },
  });

  // console.log(userData, clientSecret);

  const handleSubmit = async event => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      setCardError(null);
      console.log('[PaymentMethod]', paymentMethod);

      const { data } = await axiosSecure.post('/create-payment-intent', {
        amount,
      });

      // payment here
      const result = await stripe.confirmCardPayment(data?.clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: userData?.name,
            email: userData?.email,
          },
        },
      });

      if (result?.error) {
        setCardError(result?.error?.message);
        return;
      }
      if (result?.paymentIntent?.status === 'succeeded') {
        // save payment info
        const paymentInfo = {
          transactionId: result?.paymentIntent?.id,
          profile: userData?.imageUrl,
          status: userData?.status,
          district: userData?.district,
          role: userData?.role,
        };

        try {
          const { data } = await axiosSecure.post('/funding', paymentInfo);

          if (data?.insertedId) {
            toast.success('payment done');
          }

          console.log(data);
        } catch (err) {
          console.log(err);
        } finally {
          setProcessing(false);
          setCardError(null);
        }
      }
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={event => setAmount(event.target.value)}
        type="number"
        name="amount"
        id=""
      />
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {cardError && <p className="text-accent-500 mb-3">{cardError}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded"
      >
        {processing ? <ClipLoader size={24} /> : `  Pay $ ${amount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
