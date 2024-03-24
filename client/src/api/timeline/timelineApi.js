import apiService from "../apiService";

export const createAndUpdateTimelineApi = async (channelData) => {
  try {
    const data = await apiService.post("/timeline", channelData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTimelineApi = async (project) => {
  try {
    const data = await apiService.get(`/timeline/${project}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteTimelineApi = async (id) => {
  try {
    const data = await apiService.delete(`/timeline/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateTimelineApi = async (channelData) => {
  try {
    const data = await apiService.put("/timeline/:id", channelData);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
