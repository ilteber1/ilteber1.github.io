import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome to AI Support SaaS</h1>
      {session ? (
        <div>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()} className="bg-red-500 text-white p-2 rounded">
            Sign Out
          </button>
        </div>
      ) : (
        <button onClick={() => signIn()} className="bg-blue-500 text-white p-2 rounded">
          Sign In
        </button>
      )}
    </div>
  );
}
