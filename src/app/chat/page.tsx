import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Chat() {
  const { data: session } = useSession();
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (session) {
      // Fetch or create a chat session
      fetch('/api/chat/create', { method: 'POST' })
        .then((res) => res.json())
        .then((data) => setChatId(data.chatId));
    }
  }, [session]);

  const sendMessage = async () => {
    if (!message || !chatId) return;

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, message }),
    });

    const data = await res.json();
    setMessages([...messages, data.userMessage, data.aiMessage]);
    setMessage('');
  };

  if (!session) {
    return <div>Please sign in to chat.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="border rounded p-4 mb-4 h-96 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border rounded p-2 flex-grow"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
} 