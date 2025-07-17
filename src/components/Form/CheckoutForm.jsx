import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import useAxiosSecure from '../../hooks/useAxiosSecure';

import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Shared/LoadingSpinner';

const CheckoutForm = ({ closeModal, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isAmountValid, setIsAmountValid] = useState(true);

  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/user/${user?.email}`
      );
      return data;
    },
  });

  const handleAmountChange = e => {
    const value = e.target.value;
    setAmount(value);
    setIsAmountValid(value > 0);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    if (amount <= 0) {
      setIsAmountValid(false);
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      setCardError(null);

      const { data } = await axiosSecure.post('/create-payment-intent', {
        amount,
      });

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
        const paymentInfo = {
          transactionId: result?.paymentIntent?.id,
          profile: userData?.imageUrl,
          status: userData?.status,
          district: userData?.district,
          role: userData?.role,
          name: userData?.name,
          amount: parseFloat(amount),
          date: new Date().toISOString().split('T')[0],
        };

        try {
          const { data } = await axiosSecure.post('/funding', paymentInfo);
          if (data?.insertedId) {
            toast.success('Payment successful!', {
              style: {
                border: '1px solid #10B981',
                padding: '16px',
                color: '#10B981',
                background: '#ECFDF5',
              },
            });
          }
        } catch (err) {
          console.log(err);
        } finally {
          setProcessing(false);
          setCardError(null);
          closeModal();
          refetch();
        }
      }
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Make a Donation</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Donation Amount ($)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              onChange={handleAmountChange}
              type="number"
              name="amount"
              min="1"
              step="0.01"
              className={`block w-full pl-8 pr-3 py-2 border ${
                isAmountValid ? 'border-gray-300' : 'border-red-500'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="0.00"
            />
          </div>
          {!isAmountValid && (
            <p className="mt-1 text-sm text-red-600">
              Please enter a valid amount
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#374151',
                    '::placeholder': {
                      color: '#9CA3AF',
                    },
                  },
                  invalid: {
                    color: '#EF4444',
                  },
                },
              }}
            />
          </div>
          {cardError && (
            <p className="mt-2 text-sm text-red-600">{cardError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!stripe || processing || !isAmountValid}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? (
            <>
              <ClipLoader size={18} color="#ffffff" className="mr-2" />
              Processing...
            </>
          ) : (
            `Donate $${amount || '0.00'}`
          )}
        </button>
      </form>

      <div className="mt-6 text-xs text-gray-500">
        <p>
          Your donation helps us continue our mission. All payments are secure
          and encrypted.
        </p>
      </div>
    </div>
  );
};

export default CheckoutForm;
