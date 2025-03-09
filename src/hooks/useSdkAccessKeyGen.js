import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import sdkAccessKeyGenApi from "../api/sdk_access_key_gen";

/**
 * Custom hook for SDK access key generation using TanStack Query
 */
export function useSdkAccessKeyGen() {
  const queryClient = useQueryClient();

  // Get SDK access key
  const useGetSdkAccessKeyGen = () => {
    return useQuery({
      queryKey: ["sdkAccessKeyGen"],
      queryFn: () => sdkAccessKeyGenApi.getSdkAccessKeyGen(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Generate SDK access key
  const useGenerateSdkAccessKey = () => {
    return useMutation({
      mutationFn: (sdkAccessKeyGenData) =>
        sdkAccessKeyGenApi.generateSdkAccessKey(sdkAccessKeyGenData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sdkAccessKeyGen"] });
      },
    });
  };

  // Update SDK access key
  const useUpdateSdkAccessKey = () => {
    return useMutation({
      mutationFn: (sdkAccessKeyGenData) =>
        sdkAccessKeyGenApi.updateSdkAccessKey(sdkAccessKeyGenData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sdkAccessKeyGen"] });
      },
    });
  };

  // Delete SDK access key
  const useDeleteSdkAccessKey = () => {
    return useMutation({
      mutationFn: () => sdkAccessKeyGenApi.deleteSdkAccessKey(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sdkAccessKeyGen"] });
      },
    });
  };

  return {
    useGetSdkAccessKeyGen,
    useGenerateSdkAccessKey,
    useUpdateSdkAccessKey,
    useDeleteSdkAccessKey,
  };
}


/*

import { useState } from 'react';
import { useSdkAccessKeyGen } from '../hooks/useSdkAccessKeyGen';

function SdkAccessKeyManager() {
  const [showKey, setShowKey] = useState(false);
  const [formData, setFormData] = useState({
    appName: '',
    description: '',
    expiresIn: '30', // days
  });
  
  const {
    useGetSdkAccessKeyGen,
    useGenerateSdkAccessKey,
    useDeleteSdkAccessKey
  } = useSdkAccessKeyGen();
  
  // Fetch current SDK access key
  const { data: keyData, isLoading, error } = useGetSdkAccessKeyGen();
  
  // Set up mutations
  const generateMutation = useGenerateSdkAccessKey();
  const deleteMutation = useDeleteSdkAccessKey();
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    generateMutation.mutate({
      appName: formData.appName,
      description: formData.description,
      expiresIn: parseInt(formData.expiresIn, 10),
    });
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle delete key
  const handleDeleteKey = () => {
    if (window.confirm('Are you sure you want to delete this access key? This action cannot be undone.')) {
      deleteMutation.mutate();
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  if (isLoading) return <div>Loading SDK access key information...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className="space-y-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">SDK Access Key</h3>
          
          {keyData ? (
            <div className="mt-5">
              <div className="rounded-md bg-gray-50 p-4">
                <div className="flex">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="text-sm font-medium text-gray-900">{keyData.appName}</h4>
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      <p>{keyData.description}</p>
                      <p className="mt-1">Created: {formatDate(keyData.createdAt)}</p>
                      <p>Expires: {formatDate(keyData.expiresAt)}</p>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500 mr-2">Access Key:</span>
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {showKey ? keyData.key : '••••••••••••••••••••••••••••••'}
                        </code>
                        <button
                          type="button"
                          onClick={() => setShowKey(!showKey)}
                          className="ml-2 text-sm text-indigo-600 hover:text-indigo-500"
                        >
                          {showKey ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleDeleteKey}
                      disabled={deleteMutation.isPending}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"




*/