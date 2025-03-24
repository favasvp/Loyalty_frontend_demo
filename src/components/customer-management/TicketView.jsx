import { useState } from "react";
import { useSupport } from "../../hooks/useSupport";
import useUiStore from "../../store/ui";
import { useAuth } from "../../hooks/useAuth";

const TicketView = ({ open, onClose, data }) => {
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState("conversation"); 
  const { useGetCurrentUser } = useAuth();
  const { data: user } = useGetCurrentUser();
  const { useAddMessage, useUpdateStatus } = useSupport();
  const createMutation = useAddMessage();
  const updateStatus = useUpdateStatus();
  const { addToast } = useUiStore();

  if (!open || !data) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setSending(true);
    createMutation.mutate(
      {
        id: data?._id,
        data: {
          message: newMessage,
          sender_type: "Admin",
          sender: user?.data?._id,
        },
      },
      {
        onSuccess: (res) => {
          addToast({ type: "success", message: res?.message });
          setNewMessage("");
          setSending(false);
        },
        onError: (error) => {
          addToast({
            type: "error",
            message: error?.response?.data?.message,
          });
          setSending(false);
        },
      }
    );
  };

  const handleResolveTicket = () => {
    updateStatus.mutate(
      {
        id: data?._id,
        data: {
          status: "resolved",
        },
      },
      {
        onSuccess: (res) => {
          addToast({ type: "success", message: res?.message });
        },
        onError: (error) => {
          addToast({
            type: "error",
            message: error?.response?.data?.message,
          });
        },
      }
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open": return "bg-green-100 text-green-700";
      case "in_progress": return "bg-purple-100 text-purple-700";
      case "resolved": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const formatStatus = (status) => {
    return status
      .replace("_", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 p-4">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col mt-17">
    
      <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold dark:text-white">{data?.subject}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">#{data?.ticket_id}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(data?.status)}`}>
              {formatStatus(data?.status)}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
  
      <div className="border-b dark:border-gray-700">
        <div className="flex">
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "conversation"
                ? "text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("conversation")}
          >
            Conversation
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "details"
                ? "text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "customer"
                ? "text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("customer")}
          >
            Customer Info
          </button>
        </div>
      </div>
  
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "conversation" && (
          <div className="space-y-4">
            {data?.messages?.map((message, index) => (
              <div
                key={index}
                className={`flex ${message?.sender?.name === data?.customer?.name ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-xl ${
                    message?.sender?.name === data?.customer?.name
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-green-50 dark:bg-green-900"
                  }`}
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {message?.sender?.name} • {formatDate(message?.created_at)}
                  </div>
                  <p className="text-sm dark:text-white">{message?.message}</p>
                </div>
              </div>
            ))}
  
            {data?.status !== "resolved" && (
              <div className="pt-4">
                <div className="flex gap-3">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none dark:bg-gray-800 dark:text-white"
                    placeholder="Type your reply..."
                    rows={2}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={sending || !newMessage.trim()}
                    className="p-3 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
                  >
                    {sending ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
  
        {activeTab === "details" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
              <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 mb-3">
                Status Info
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(data?.status)}`}>
                    {formatStatus(data?.status)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Priority</span>
                  <span className="text-sm font-medium">{data?.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Category</span>
                  <span className="text-sm font-medium">{data?.category}</span>
                </div>
              </div>
            </div>
  
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
              <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 mb-3">
                Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="text-sm dark:text-white">Created: {formatDate(data?.createdAt)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <div className="text-sm dark:text-white">Last Updated: {formatDate(data?.updatedAt)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
  
        {activeTab === "customer" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
              <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 mb-3">
                Customer Info
              </h3>
              <div className="space-y-2">
                <div className="text-sm dark:text-white">Name: {data?.customer?.name}</div>
                <div className="text-sm dark:text-white">Email: {data?.customer?.email}</div>
                <div className="text-sm dark:text-white">Phone: {data?.customer?.phone}</div>
              </div>
            </div>
  
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
              <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 mb-3">
                Customer Activity
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Total Tickets</span>
                  <span className="text-sm font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Open Tickets</span>
                  <span className="text-sm font-medium">1</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {data?.status !== "resolved" && (
        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={handleResolveTicket}
            className="w-full py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
          >
            Resolve Ticket
          </button>
        </div>
      )}
    </div>
  </div>
  );
};

export default TicketView;