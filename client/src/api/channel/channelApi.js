import apiService from "../apiService";

export const createChannelApi = async (channelData) => {
  try {
    const data = await apiService.post("/channel", channelData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const myChannelsApi = async () => {
  try {
    const data = await apiService.get(`/channel`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error?.message;
  }
};

export const myChannelApi = async (id) => {
  try {
    const data = await apiService.get(`/channel/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error?.message;
  }
};

export const deleteChannelApi = async (id) => {
  try {
    const data = await apiService.delete(`/channel/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export const updateChannelApi = async (id, data) => {
  try {
    const data = await apiService.put(`/channel/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
