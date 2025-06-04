import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Admin() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      fetch('/api/admin/users')
        .then((res) => res.json())
        .then(setUsers);
      fetch('/api/admin/logs')
        .then((res) => res.json())
        .then(setLogs);
    }
  }, [session]);

  if (!session || session.user?.role !== 'ADMIN') {
    return <div>Access denied. Admin only.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded p-4">
          <h2 className="text-xl font-bold mb-2">Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="mb-2">
                {user.name} ({user.email}) - {user.role}
              </li>
            ))}
          </ul>
        </div>
        <div className="border rounded p-4">
          <h2 className="text-xl font-bold mb-2">Logs</h2>
          <ul>
            {logs.map((log) => (
              <li key={log.id} className="mb-2">
                {log.message} - {new Date(log.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 