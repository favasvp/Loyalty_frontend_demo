import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import appTypesApi from "../api/app_types";

/**
 * Custom hook for app types management using TanStack Query
 */
export function useAppTypes() {
  const queryClient = useQueryClient();

  // Get all app types
  const useGetAppTypes = () => {
    return useQuery({
      queryKey: ["appTypes"],
      queryFn: () => appTypesApi.getAppTypes(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get app type by ID
  const useGetAppTypeById = (id) => {
    return useQuery({
      queryKey: ["appTypes", id],
      queryFn: () => appTypesApi.getAppTypeById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Create app type
  const useCreateAppType = () => {
    return useMutation({
      mutationFn: (appTypeData) => appTypesApi.createAppType(appTypeData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["appTypes"] });
      },
    });
  };

  // Update app type
  const useUpdateAppType = () => {
    return useMutation({
      mutationFn: ({ id, appTypeData }) =>
        appTypesApi.updateAppType(id, appTypeData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["appTypes"] });
        queryClient.invalidateQueries({ queryKey: ["appTypes", variables.id] });
      },
    });
  };

  // Delete app type
  const useDeleteAppType = () => {
    return useMutation({
      mutationFn: (id) => appTypesApi.deleteAppType(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["appTypes"] });
      },
    });
  };

  return {
    useGetAppTypes,
    useGetAppTypeById,
    useCreateAppType,
    useUpdateAppType,
    useDeleteAppType,
  };
}


/*

import { useState } from 'react';
import { useAppTypes } from '../hooks/useAppTypes';

function AppTypesManager() {
  const {
    useGetAppTypes,
    useCreateAppType,
    useUpdateAppType,
    useDeleteAppType
  } = useAppTypes();
  
  // State for the form and selected app type
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppType, setSelectedAppType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    isActive: true
  });
  
  // Fetch app types
  const { data: appTypes, isLoading, error, refetch } = useGetAppTypes();
  
  // Set up mutations
  const createMutation = useCreateAppType();
  const updateMutation = useUpdateAppType();
  const deleteMutation = useDeleteAppType();
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedAppType) {
      // Update existing app type
      updateMutation.mutate({
        id: selectedAppType.id,
        appTypeData: formData
      }, {
        onSuccess: () => {
          resetForm();
          setIsModalOpen(false);
        }
      });
    } else {
      // Create new app type
      createMutation.mutate(formData, {
        onSuccess: () => {
          resetForm();
          setIsModalOpen(false);
        }
      });
    }
  };
  
  // Handle edit button click
  const handleEdit = (appType) => {
    setSelectedAppType(appType);
    setFormData({
      name: appType.name,
      description: appType.description,
      icon: appType.icon,
      isActive: appType.isActive
    });
    setIsModalOpen(true);
  };
  
  // Handle delete button click
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this app type?')) {
      deleteMutation.mutate(id);
    }
  };
  
  // Reset form
  const resetForm = () => {
    setSelectedAppType(null);
    setFormData({
      name: '',
      description: '',
      icon: '',
      isActive: true
    });
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  if (isLoading) return <div>Loading app types...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">App Types</h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add New App Type
        </button>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {appTypes?.map((appType) => (
            <li key={appType.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div className="flex text-sm">
                      <p className="font-medium text-indigo-600 truncate">{appType.name}</p>
                      <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                        {appType.isActive ? '(Active)' : '(Inactive)'}
                      </p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{appType.description}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <div className="flex overflow-hidden">
                      <button
                        onClick={() => handleEdit(appType)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(appType.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {selectedAppType ? 'Edit App Type' : 'Add New App Type'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Icon</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Active</label>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? 'Saving...'
                    : selectedAppType
                    ? 'Update'
                    : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppTypesManager;



*/
