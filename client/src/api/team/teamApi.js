import apiService from "../apiService";

export const getTeamApi = async (id) => {
  try {
    const data = await apiService.get(`/team/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeTeamMemberApi = async (id, userId) => {
  try {
    const data = await apiService.delete(`/team/${id}/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const concludeTeamMemberApi = async (id, userId, formData) => {
  try {
    const data = await apiService.put(`/team/${id}/${userId}`, formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTeamUserApi = async (id, userId) => {
  try {
    const data = await apiService.get(`/team/${id}/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
