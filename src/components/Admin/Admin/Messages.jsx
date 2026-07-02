// src/pages/AdminTemplates.jsx
import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc,
  deleteDoc 
} from 'firebase/firestore';
import { db } from '../../../firebase'; // ← your firebase config file
import { Check, Copy, Edit2, Menu, Save, Trash2, X } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

export default function AdminTemplates() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

      const { toggleSidebar, sidebarOpen } = useOutletContext();

  // Load all template messages
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));
      const msgs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        text: doc.data().text || doc.data().message || ''
      }));
      setMessages(msgs);
    } catch (err) {
      console.error(err);
      setError("Failed to load messages");
    }
  };

  const handleAddMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    setError(null);

    try {
    const messageData = {
        text: newMessage.trim(),
        createdAt: new Date(),
    };

    await addDoc(collection(db, "messages"), messageData);

    // Add same structure locally
    setMessages((prev) => [...prev, messageData]);

    } catch (err) {
    console.error(err);
    setError("Failed to add message");
    } finally {
    setNewMessage("");
    setLoading(false);
    }
  }


  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;

    setLoading(true);
    try {
      const msgRef = doc(db, "messages", id);
      await updateDoc(msgRef, {
        text: editText.trim(),
        updatedAt: new Date()
      });
      setEditingId(null);
      setEditText('');
    //   fetchMessages();
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, text: editText.trim() } : msg
      )
    );
    } catch (err) {
      console.error(err);
      setError("Failed to update message");
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
      
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      await deleteDoc(doc(db, "messages", id));
  };

  const [copied, setCopied] = useState(false)
  const [smsId, setSmsId] = useState('')

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false)
      setSmsId('')
    }, 1000);
    // alert("Copied to clipboard!");
  };

  return (
    <div className={`bg-white w-full sm:h-[96vh] relative poppins sm:fixed overflow-auto md:w-[72%] ${sidebarOpen ? 'lg:w-full' : 'lg:w-[82%]'} p-4 sm:p-8 rounded-[0px_0_0_0px] md:rounded-[40px_0_0_40px]`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className=" mb-6">
           <div className='flex gap-2 items-center mb-1'>
          <Menu onClick={toggleSidebar} className='w-6 h-6 cursor-pointer' />
          <h1 className="text-3xl font-bold text-gray-900">Message Templates</h1>
          </div>
          <p className="mt-2 text-gray-600">Create, edit and manage reusable messages</p>
        </div>

        {/* Add new message form */}
          <form onSubmit={handleAddMessage} className="space-y-2">
            <div>
              
              <textarea
                id="newMessage"
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-y"
                placeholder="Type your message template here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !newMessage.trim()}
                className="px-6 py-2.5 mb-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Saving...' : 'Add Template'}
              </button>
            </div>
          </form>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* List of messages */}
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
              No templates yet. Add your first message above.
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition-colors group"
              >
                {editingId === msg.id ? (
                  <div className="space-y-3">
                    <textarea
                      rows={3}
                      className="w-full rounded-lg border border-indigo-400 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-y bg-indigo-50/30"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-1.5 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                        <X size={18} /> Cancel
                      </button>
                      <button
                        onClick={() => saveEdit(msg.id)}
                        disabled={loading || !editText.trim()}
                        className="flex items-center gap-1.5 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        <Save size={18} /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 whitespace-pre-wrap text-gray-800">
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {copyToClipboard(msg.text); setSmsId(msg.id)}}
                        title="Copy message"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {copied && smsId === msg.id ? 
                        <Check size={18} className='text-green-500' />
                        :
                        <Copy size={18} />
                        
                        }
                      </button>
                      <button
                        onClick={() => startEditing(msg.id, msg.text)}
                        title="Edit message"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        title="Delete"
                        className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg text-gray-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}