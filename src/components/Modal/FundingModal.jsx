import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Form/CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const FundingModal = ({ closeModal, isOpen, refetch }) => {
  const handelCloseModel = () => {
    closeModal();
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded bg-white p-6">
          <DialogTitle className="text-lg font-bold">
            Make a Donation
          </DialogTitle>

          {/* Your form content here */}
          <div className="">
            <Elements stripe={stripePromise}>
              <CheckoutForm refetch={refetch} closeModal={closeModal} />
            </Elements>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handelCloseModel}
              className="px-4 py-2 text-sm font-medium text-gray-700"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default FundingModal;
