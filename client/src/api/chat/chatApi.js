import apiService from "../apiService";

export const fetchChatHistoryApi = async (senderId, receiverId) => {
  try {
    const { data } = await apiService.get(
      `/chat-history/${senderId}/${receiverId}`
    );
    return { data };
  } catch (error) {
    console.log(error);
  }
};

export const saveChatApi = async (message, senderId, receiverId) => {
  try {
    const { data } = await apiService.post(
      `/save-chat/${senderId}/${receiverId}`,
      message
    );
    console.log(data);
    return { data };
  } catch (error) {
    console.log(error);
  }
};
