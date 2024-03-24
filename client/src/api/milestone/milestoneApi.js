import apiService from "../apiService";

export const createAndUpdateMilestoneApi = async (channelData) => {
  try {
    const data = await apiService.post("/milestone", channelData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMilestoneApi = async (project) => {
  try {
    const data = await apiService.get(`/milestone/${project}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteMilestoneApi = async (id) => {
  try {
    const data = await apiService.delete(`/milestone/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateMilestoneApi = async (id, channelData) => {
  try {
    const data = await apiService.put(`/milestone/${id}`, channelData);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
