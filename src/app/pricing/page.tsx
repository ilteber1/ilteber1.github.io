import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const plans = [
  {
    name: 'Basic',
    price: '$10/month',
    features: ['1 AI Support Agent', '100 Chat Messages', 'Basic Analytics'],
    priceId: 'price_basic',
  },
  {
    name: 'Pro',
    price: '$30/month',
    features: ['3 AI Support Agents', '500 Chat Messages', 'Advanced Analytics', 'Priority Support'],
    priceId: 'price_pro',
  },
  {
    name: 'Enterprise',
    price: '$100/month',
    features: ['10 AI Support Agents', 'Unlimited Chat Messages', 'Full Analytics', '24/7 Support'],
    priceId: 'price_enterprise',
  },
];

export default function Pricing() {
  const { data: session } = useSession();

  const handleSubscribe = async (priceId: string) => {
    if (!session) {
      alert('Please sign in to subscribe.');
      return;
    }

    const stripe = await stripePromise;
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });

    const { sessionId } = await response.json();
    await stripe!.redirectToCheckout({ sessionId });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div key={plan.name} className="border rounded p-4">
            <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
            <p className="text-2xl font-bold mb-2">{plan.price}</p>
            <ul className="mb-4">
              {plan.features.map((feature) => (
                <li key={feature} className="mb-1">
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.priceId)}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 