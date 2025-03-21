import {
  XMarkIcon,
  UserCircleIcon,
  ArrowPathIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSupport } from "../../hooks/useSupport";
import useUiStore from "../../store/ui";
import { useAuth } from "../../hooks/useAuth";

const TicketView = ({ open, onClose, data }) => {
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
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

  const formatFullDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
  const getStatusClass = (status) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-700";
      case "in_progress":
        return "bg-purple-100 text-purple-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      case "closed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col mt-17">
        <div className="bg-green-50 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <UserCircleIcon className="w-14 h-14 text-gray-400 rounded-lg shadow-sm" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {data.subject}
              </h2>
              <p className="text-gray-600 text-sm">Ticket #{data.ticket_id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                data.status
              )}`}
            >
              {formatStatus(data.status)}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/90 text-gray-500 hover:text-gray-900 transition shadow-sm"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 bg-white space-y-5">
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                  <h3 className="text-gray-800 font-medium text-sm uppercase tracking-wide">
                    Initial Request
                  </h3>
                  <span className="text-xs text-gray-400 ml-auto">
                    {formatDate(data.createdAt)}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCircleIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-700">
                      {data.customer.name}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {data.messages[0]?.message || "No initial message"}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <h3 className="text-gray-800 font-medium mb-3 text-sm uppercase tracking-wide">
                  Conversation
                </h3>
                <div className="space-y-4">
                  {data.messages.slice(1).map((message, index) => {
                    const isCustomer =
                      message.sender.name === data.customer.name;
                    return (
                      <div
                        key={index}
                        className={`flex ${
                          isCustomer ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div className={`max-w-[80%]`}>
                          <div
                            className={`flex items-center gap-1 mb-1 ${
                              isCustomer ? "" : "justify-end"
                            }`}
                          >
                            {isCustomer && (
                              <UserCircleIcon className="w-4 h-4 text-gray-400" />
                            )}
                            <span className="text-xs text-gray-500">
                              {message.sender.name} •{" "}
                              {formatDate(message.created_at)}
                            </span>
                          </div>
                          <div
                            className={`rounded-lg p-3 text-sm ${
                              isCustomer
                                ? "bg-gray-50 text-gray-600 border border-gray-100"
                                : "bg-green-50 border border-green-100 text-gray-700"
                            }`}
                          >
                            <p>{message.message}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex gap-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-200 resize-none shadow-sm"
                  placeholder="Type your reply..."
                  rows={2}
                />
                <div className="flex items-end">
                  <button
                    onClick={handleSendMessage}
                    disabled={sending || !newMessage.trim()}
                    className="p-3 rounded-lg bg-green-600 text-white hover:bg-green-500 disabled:opacity-50 shadow-sm transition"
                  >
                    {sending ? (
                      <ArrowPathIcon className="w-5 h-5 animate-spin" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-64 border-l border-gray-100 p-6 space-y-5 overflow-y-auto">
            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="text-gray-800 font-medium mb-3 text-sm uppercase tracking-wide">
                Customer Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium">{data.customer.name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Email</span>
                  <span>{data.customer.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Phone</span>
                  <span>{data.customer.phone}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="text-gray-800 font-medium mb-3 text-sm uppercase tracking-wide">
                Ticket Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-500">Priority</span>
                  <span className="font-medium capitalize">
                    {data.priority}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Category</span>
                  <span>{data.category}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Assigned To</span>
                  <span>{data.assigned_to || "Unassigned"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                className="w-full py-2 px-4 bg-green-600 rounded-lg text-white text-sm font-medium hover:bg-green-500 transition shadow-sm"
                onClick={handleResolveTicket}
              >
                Mark as Resolved
              </button>
            </div>

            <div className="flex flex-col text-xs text-gray-400 pt-2">
              <div>Created: {formatFullDate(data.createdAt)}</div>
              <div>
                Updated: {formatFullDate(data.updatedAt || data.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketView;
