import apiService from "../apiService";

export const postStandUpApi = async (standupData) => {
  try {
    const data = await apiService.post("/standup", standupData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllStandUpsApi = async (projectId) => {
  try {
    const data = await apiService.get(`/standup/${projectId}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
