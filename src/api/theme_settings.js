import apiClient from "./client";

const rootUrl = "/theme-settings";

const themeSettingsApi = {

    // Get all theme settings
    getThemeSettings: async () => {
        const response = await apiClient.get(rootUrl);
        return response.data;
    },    
    
    //update theme settings
    updateThemeSettings: async (themeSettingsData) => {
        const response = await apiClient.put(rootUrl, themeSettingsData);
        return response.data;
    },

    //reset theme settings
    resetThemeSettings: async () => {
        const response = await apiClient.post(`${rootUrl}/reset`);
        return response.data;
    },

    //apply a color preset
    applyColorPreset: async (colorPreset) => {
        const response = await apiClient.post(`${rootUrl}/apply-color-preset/${colorPreset}`);
        return response.data;
    },
    
    
}
    

export default themeSettingsApi;
