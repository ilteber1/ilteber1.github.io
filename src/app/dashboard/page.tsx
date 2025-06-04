import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (session) {
      fetch('/api/analytics')
        .then((res) => res.json())
        .then(setAnalytics);
      fetch('/api/subscription')
        .then((res) => res.json())
        .then(setSubscription);
    }
  }, [session]);

  if (!session) {
    return <div>Please sign in to view the dashboard.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded p-4">
          <h2 className="text-xl font-bold mb-2">Analytics</h2>
          {analytics ? (
            <div>
              <p>Chats: {analytics.chats}</p>
              <p>Messages: {analytics.messages}</p>
              <p>Satisfaction: {analytics.satisfactionAvg}</p>
              <p>Resolution Time: {analytics.resolutionTimeAvg} minutes</p>
            </div>
          ) : (
            <p>Loading analytics...</p>
          )}
        </div>
        <div className="border rounded p-4">
          <h2 className="text-xl font-bold mb-2">Subscription</h2>
          {subscription ? (
            <div>
              <p>Status: {subscription.status}</p>
              <p>Current Period End: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</p>
            </div>
          ) : (
            <p>Loading subscription...</p>
          )}
        </div>
      </div>
    </div>
  );
} 