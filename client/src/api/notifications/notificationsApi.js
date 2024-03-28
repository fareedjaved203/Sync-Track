import apiService from "../apiService";

export const postNotificationApi = async (notificationData) => {
  try {
    const data = await apiService.post("/notification", notificationData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getNotificationApi = async (name, email) => {
  try {
    const data = await apiService.get(`/notifications/${name}/${email}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
