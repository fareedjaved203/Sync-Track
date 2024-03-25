import apiService from "../apiService";

export const postAnnouncementApi = async (channelData) => {
  try {
    const data = await apiService.post("/announcement", channelData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAnnouncementsApi = async (id) => {
  try {
    const data = await apiService.get(`/announcement/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnnouncementsApi = async (id) => {
  try {
    const data = await apiService.delete(`/announcement/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
