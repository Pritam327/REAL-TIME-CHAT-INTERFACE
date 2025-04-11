import React, { useState } from 'react';
import { MessageSquare, Send, Users } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface Member {
  id: string;
  name: string;
  status: 'online' | 'offline';
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello 😊',
      sender: 'You',
      timestamp: '10:13:15 PM'
    },
    {
      id: '2',
      text: 'How Are You Doing???',
      sender: 'You',
      timestamp: '10:13:29 PM'
    }
  ]);

  const [members] = useState<Member[]>([
    { id: '1', name: 'Pritam Samantara', status: 'online' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex h-screen bg-purple-600">
      <div className="container mx-auto my-8 max-w-6xl">
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden rounded-lg bg-gray-900 shadow-xl">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-700 bg-gray-900">
            <div className="flex items-center gap-2 p-4 text-blue-400">
              <Users size={20} />
              <h2 className="text-lg font-semibold">Room-123</h2>
            </div>
            
            <div className="p-4">
              <h3 className="mb-4 text-sm text-gray-400">Members ({members.length})</h3>
              <ul className="space-y-2">
                {members.map(member => (
                  <li key={member.id} className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                    <span className="text-gray-300">{member.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex flex-1 flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-700 p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="text-blue-400" size={20} />
                <h1 className="text-lg font-semibold text-white">Real-Time Chat</h1>
              </div>
            
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map(message => (
                  <div key={message.id} className="flex justify-end">
                    <div className="max-w-sm rounded-lg bg-blue-500 p-3">
                      <div className="mb-1 text-sm font-semibold text-white">{message.sender}</div>
                      <p className="text-white">{message.text}</p>
                      <div className="mt-1 text-right text-xs text-blue-200">{message.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-700 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;