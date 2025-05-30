import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import triggerEventsApi from "../api/trigger_events";

/**
 * Custom hook for trigger events management using TanStack Query
 */
export function useTriggerEvents() {
  const queryClient = useQueryClient();

  // Get all trigger events
  const useGetTriggerEvents = (params) => {
    return useQuery({
      queryKey: ["triggerEvents", params],
      queryFn: () => triggerEventsApi.getTriggerEvents(params),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get trigger event by ID
  const useGetTriggerEventById = (id) => {
    return useQuery({
      queryKey: ["triggerEvents", id],
      queryFn: () => triggerEventsApi.getTriggerEventById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Create trigger event
  const useCreateTriggerEvent = () => {
    return useMutation({
      mutationFn: (triggerEventData) =>
        triggerEventsApi.createTriggerEvent(triggerEventData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["triggerEvents"] });
      },
    });
  };

  // Update trigger event
  const useUpdateTriggerEvent = () => {
    return useMutation({
      mutationFn: ({ id, triggerEventData }) =>
        triggerEventsApi.updateTriggerEvent(id, triggerEventData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["triggerEvents"] });
        queryClient.invalidateQueries({
          queryKey: ["triggerEvents", variables.id],
        });
      },
    });
  };

  // Delete trigger event
  const useDeleteTriggerEvent = () => {
    return useMutation({
      mutationFn: (id) => triggerEventsApi.deleteTriggerEvent(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["triggerEvents"] });
      },
    });
  };

  return {
    useGetTriggerEvents,
    useGetTriggerEventById,
    useCreateTriggerEvent,
    useUpdateTriggerEvent,
    useDeleteTriggerEvent,
  };
}


/*
import { useState } from 'react';
import { useTriggerEvents } from '../hooks/useTriggerEvents';

function TriggerEventsList() {
  const { useGetTriggerEvents } = useTriggerEvents();
  
  // Use the hook to fetch data
  const { data, isLoading, error, refetch } = useGetTriggerEvents();
  
  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
      <p>Error: {error.message}</p>
      <button 
        onClick={() => refetch()} 
        className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded"
      >
        Try Again
      </button>
    </div>
  );
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Trigger Events</h2>
        <button 
          onClick={() => refetch()} 
          className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center gap-1"
        >
          <RefreshIcon className="w-4 h-4" />
          Refresh
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{event.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    event.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {event.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Simple RefreshIcon component
const RefreshIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

export default TriggerEventsList;

*/