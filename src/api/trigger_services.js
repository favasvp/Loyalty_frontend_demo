import apiClient from "./client";

const rootUrl = "/trigger-services";

const triggerServicesApi = {

    // Get all trigger services
    getTriggerServices: async (params) => {
        const response = await apiClient.get(rootUrl,{
            params
        });
        return response.data;
    },  

    // Get trigger service by ID
    getTriggerServiceById: async (id) => {
        const response = await apiClient.get(`${rootUrl}/${id}`);
        return response.data;
    },    

    // Create new trigger service
    createTriggerService: async (triggerServiceData) => {
        const response = await apiClient.post(rootUrl, triggerServiceData);
        return response.data;
    },    

    // Update trigger service
    updateTriggerService: async (id, triggerServiceData) => {
        const response = await apiClient.put(`${rootUrl}/${id}`, triggerServiceData);
        return response.data;
    },      

    // Delete trigger service
    deleteTriggerService: async (id) => {
        const response = await apiClient.delete(`${rootUrl}/${id}`);
        return response.data;
    },
    //get triggerr service by trigger event id
    getTriggerServiceByTriggerEventId: async (triggerEventId) => {
        const response = await apiClient.get(`${rootUrl}/trigger-event/${triggerEventId}`);
        return response.data;
    },
    
    
}
    

export default triggerServicesApi;
