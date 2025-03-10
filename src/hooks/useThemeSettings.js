import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import themeSettingsApi from "../api/theme_settings";

/**
 * Custom hook for theme settings management using TanStack Query
 */
export function useThemeSettings() {
  const queryClient = useQueryClient();

  // Get all theme settings
  const useGetThemeSettings = () => {
    return useQuery({
      queryKey: ["themeSettings"],
      queryFn: () => themeSettingsApi.getThemeSettings(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Update theme settings
  const useUpdateThemeSettings = () => {
    return useMutation({
      mutationFn: (themeSettingsData) =>
        themeSettingsApi.updateThemeSettings(themeSettingsData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["themeSettings"] });
      },
    });
  };

  // Reset theme settings
  const useResetThemeSettings = () => {
    return useMutation({
      mutationFn: () => themeSettingsApi.resetThemeSettings(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["themeSettings"] });
      },
    });
  };

  // Apply color preset
  const useApplyColorPreset = () => {
    return useMutation({
      mutationFn: (colorPreset) =>
        themeSettingsApi.applyColorPreset(colorPreset),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["themeSettings"] });
      },
    });
  };

  return {
    useGetThemeSettings,
    useUpdateThemeSettings,
    useResetThemeSettings,
    useApplyColorPreset,
  };
}


/*

import { useState, useEffect } from 'react';
import { useThemeSettings } from '../hooks/useThemeSettings';

function ThemeSettingsForm({ initialData = null, onSuccess }) {
  const { useUpdateThemeSettings, useGetThemeSettings } = useThemeSettings();
  
  // Get current theme settings if not provided
  const { data: currentSettings } = useGetThemeSettings({
    enabled: !initialData, // Only fetch if initialData is not provided
  });
  
  // Set up form state
  const [formData, setFormData] = useState({
    primaryColor: '#2B5C3F',
    secondaryColor: '#4CAF50',
    accentColor: '#FFC107',
    textColor: '#333333',
    backgroundColor: '#FFFFFF',
    logoUrl: '',
    ...initialData,
  });
  
  // Update form when data is loaded
  useEffect(() => {
    if (!initialData && currentSettings) {
      setFormData(currentSettings);
    }
  }, [initialData, currentSettings]);
  
  // Set up mutation
  const updateMutation = useUpdateThemeSettings();
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    });
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Primary Color</label>
          <div className="mt-1 flex items-center">
            <input
              type="color"
              name="primaryColor"
              value={formData.primaryColor}
              onChange={handleChange}
              className="h-10 w-10 rounded-md border border-gray-300"
            />
            <input
              type="text"
              name="primaryColor"
              value={formData.primaryColor}
              onChange={handleChange}
              className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
          <div className="mt-1 flex items-center">
            <input
              type="color"
              name="secondaryColor"
              value={formData.secondaryColor}
              onChange={handleChange}
              className="h-10 w-10 rounded-md border border-gray-300"
            />
            <input
              type="text"
              name="secondaryColor"
              value={formData.secondaryColor}
              onChange={handleChange}
              className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>
        
        
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Logo URL</label>
          <input
            type="text"
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => onSuccess && onSuccess()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      
      {updateMutation.isError && (
        <div className="mt-2 text-sm text-red-600">
          Error: {updateMutation.error.message}
        </div>
      )}
    </form>
  );
}

export default ThemeSettingsForm;

**/